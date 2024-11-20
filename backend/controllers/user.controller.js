import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateToken.js";

export async function signup(req, res) {
    try {
        const { email, password, username } = req.body;

        if (!email || !password || !username) {
            return res
                .status(400)
                .json({ success: false, message: "All fields are required" });
        }

        const emailRegex =
            /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim;

        if (!emailRegex.test(email)) {
            return res
                .status(400)
                .json({ success: false, message: "Invalid email" });
        }

        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 6 characters",
            });
        }

        const existingUserByEmail = await User.findOne({ email: email });

        if (existingUserByEmail) {
            return res.status(400).json({
                success: false,
                message: "User with this email already exists",
            });
        }

        const existingUserByUsername = await User.findOne({
            username: username,
        });

        if (existingUserByUsername) {
            return res.status(400).json({
                success: false,
                message: "User with this username already exists",
            });
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = new User({
            email,
            password: hashedPassword,
            username,
        });

        generateTokenAndSetCookie(newUser._id, res);
        await newUser.save();

        res.status(201).json({
            success: true,
            user: { ...newUser._doc, password: "" },
        });
    } catch (error) {
        console.log("Error in signup controller: ", error.message);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}

export async function login(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res
                .status(400)
                .json({ success: false, message: "All fields are required" });
        }

        const user = await User.findOne({ email: email });
        if (!user) {
            return res
                .status(404)
                .json({ success: false, message: "Invalid credentials" });
        }

        const isPasswordCorrect = await bcryptjs.compare(
            password,
            user.password
        );

        if (!isPasswordCorrect) {
            return res
                .status(404)
                .json({ success: false, message: "Invalid credentials" });
        }

        generateTokenAndSetCookie(user._id, res);

        res.status(201).json({
            success: true,
            user: { ...user._doc, password: "" },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}

export async function logout(req, res) {
    try {
        res.clearCookie("jwt-netflix");
        res.status(200).json({
            success: true,
            message: "Logged out successfully",
        });
    } catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}

export async function authCheck(req, res) {
    try {
        res.status(200).json({ success: true, user: req.user });
    } catch (error) {
        console.log("Error in authCheck controller", error.message);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}

export async function addFavorite(req, res) {
    try {
        const { userId, movieId } = req.body;

        if (!userId || !movieId) {
            return res.status(400).json({
                success: false,
                message: "User ID and Movie ID are required",
            });
        }

        const user = await User.findOne({ _id: userId });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        if (user.favorites.includes(movieId)) {
            return res.status(400).json({
                success: false,
                message: "Content already added",
            });
        }

        user.favorites.push(movieId);

        await user.save();

        return res.status(200).json({
            success: true,
            message: "Content successfully added",
        });
    } catch (error) {
        console.log("Error in addFavorite controller", error.message);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}

export async function removeFavorite(req, res) {
    try {
        const { userId, movieId } = req.body;

        if (!userId || !movieId) {
            return res.status(400).json({
                success: false,
                message: "User ID and Movie ID are required",
            });
        }

        const user = await User.findOne({ _id: userId });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        if (!user.favorites.includes(movieId)) {
            return res.status(400).json({
                success: false,
                message: "Content not found in favorites",
            });
        }

        user.favorites = user.favorites.filter((id) => id !== movieId);

        await user.save();

        return res.status(200).json({
            success: true,
            message: "Content successfully removed",
        });
    } catch (error) {
        console.log("Error in removeFavorite controller", error.message);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}

export async function getMe(req, res) {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);

        res.status(200).json({
            success: true,
            user: { ...user._doc, password: "" },
        });
    } catch (error) {
        res.status(404).json({ success: false, message: "User not found" });
    }
}
