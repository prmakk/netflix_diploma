import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "15d",
    });

    res.cookie("jwt-netflix", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000, //15 days in ms
        httpOnly: true, //prevent XSS attack, make it not be accessed by JS
        sameSite: "strict",
        secure: process.env.NODE_ENV !== "development",
    });

    return token;
};
