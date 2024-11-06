import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies["jwt-netflix"];

        if (!token) {
            return res.status(400).json({
                success: false,
                message: "Unauthtorized - No Token Provided",
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) {
            return res.status(401).json({
                success: false,
                message: "Unauthtorized - Invalid token",
            });
        }

        const user = await User.findById(decoded.userId).select("-password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        req.user = user;

        next(); //if we pass all checks, we allow to call next function
    } catch (error) {
        console.log("Error in protect route middleware");
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};
