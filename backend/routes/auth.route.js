import express from "express";

import {
    signup,
    login,
    logout,
    authCheck,
    addFavorite,
    getMe,
    removeFavorite,
} from "../controllers/user.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/addfavorite", protectRoute, addFavorite);
router.post("/removefavorite", protectRoute, removeFavorite);

router.get("/authCheck", protectRoute, authCheck);
router.get("/me/:id", protectRoute, getMe);

export default router;
