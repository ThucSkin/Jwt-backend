import express from 'express';

// Create an Express Router instance
const router = express.Router();

// Define your route handler
router.get('/home', (req, res) => {
    return res.send("hello home");
});

// Export the router so it can be used in your main application
export default router;
