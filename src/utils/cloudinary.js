import {v2 as cloudinary} from 'cloudinary'
import fs from 'fs'
import { Readable } from 'stream';


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const uploadOnCloudinary = async (fileData) => {
    try {
        if (!fileData) return null;

        // Check if fileData is a buffer (from multer memory storage)
        if (Buffer.isBuffer(fileData)) {
            return new Promise((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    { resource_type: "auto" },
                    (error, result) => {
                        if (error) {
                            console.error("Cloudinary upload error:", error);
                            reject(error);
                        } else {
                            console.log("File uploaded on cloudinary ", result.url);
                            resolve(result);
                        }
                    }
                );

                const readable = Readable.from(fileData);
                readable.pipe(uploadStream);
            });
        }

        // Legacy: Handle file path (for local development)
        if (typeof fileData === 'string') {
            const response = await cloudinary.uploader.upload(fileData, {
                resource_type: "auto",
            });
            console.log("File uploaded on cloudinary ", response.url);
            
            // Only try to delete if file exists
            if (fs.existsSync(fileData)) {
                fs.unlinkSync(fileData);
            }
            return response;
        }

        return null;
    } catch (error) {
        console.error("Upload to Cloudinary failed:", error);
        // Only try to delete file if it's a path and exists
        if (typeof fileData === 'string' && fs.existsSync(fileData)) {
            fs.unlinkSync(fileData);
        }
        return null;
    }
}

const deleteImageFromCloudinary = async (publicLink) => {
    try {
        if (!publicLink) return null;
        const publicId = publicLink.split('/').splice(-1)[0].split('.')[0];
        console.log(publicId)

        if (!publicId) return null;
        const response = await cloudinary.uploader.destroy(publicId, {
            resource_type: "image",
        });
        console.log("File deleted from cloudinary ", response.result);
        return response;
    } catch (error) {
        return null
    }
}
const deleteVideoFromCloudinary = async (publicLink) => {
    try {
        if (!publicLink) return null;
        const publicId = publicLink.split('/').splice(-1)[0].split('.')[0];
        console.log(publicId)

        if (!publicId) return null;
        const response = await cloudinary.uploader.destroy(publicId, {
            resource_type: "video",
        });
        console.log("File deleted from cloudinary ", response.result);
        return response;
    } catch (error) {
        return null
    }
}

export {uploadOnCloudinary, deleteImageFromCloudinary, deleteVideoFromCloudinary}