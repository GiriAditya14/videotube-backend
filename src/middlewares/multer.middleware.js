import multer from 'multer';

// Use memory storage for Vercel serverless compatibility
// Files will be stored in memory as buffers instead of disk
const storage = multer.memoryStorage();

export const upload = multer({
    storage: storage,
    limits: {
        fileSize: 100 * 1024 * 1024, // 100MB limit
    },
})