import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
    try {
        const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });
        res.cookie("jwt", token, {
            maxAge: 7 * 24 * 60 * 60 * 1000, // MS
            httpOnly: true, // Prevent XSS attacks
            sameSite: "strict", // Prevent CSRF attacks
            secure: process.env.NODE_ENV !== "development", // Only set secure cookies in production
        });
        return token;
    } catch (error) {
        console.error("Error generating token or setting cookie:", error);
        throw new Error("Error generating token or setting cookie.");
    }
}