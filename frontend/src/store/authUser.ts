import axios from "axios";
import { toast } from "react-hot-toast";
import { create } from "zustand";
import IUser from "../types/types.ts";

interface ISignUpCredentials {
    email: string;
    username: string;
    password: string;
}

interface ILoginCredentials {
    email: string;
    password: string;
}

interface IStore {
    user: IUser | null;
    isSigningUp: boolean;
    isCheckingAuth: boolean;
    isLoggingOut: boolean;
    isLoggingIn: boolean;
    signup: (credentials: ISignUpCredentials) => Promise<void>;
    login: (credentials: ILoginCredentials) => Promise<void>;
    logout: () => Promise<void>;
    authCheck: () => Promise<void>;
    getMe: (id: string) => Promise<void>;
}

export const useAuthStore = create<IStore>((set) => ({
    user: null,
    isSigningUp: false,
    isCheckingAuth: true,
    isLoggingOut: false,
    isLoggingIn: false,
    signup: async (credentials) => {
        set({ isSigningUp: true });
        try {
            const response = await axios.post(
                "/api/v1/auth/signup",
                credentials
            );
            set({ user: response.data.user, isSigningUp: false });
            toast.success("Account created successfully");
        } catch (error: any) {
            toast.error(error.response.data.message || "An error occurred");
            set({ isSigningUp: false, user: null });
        }
    },
    login: async (credentials) => {
        set({ isLoggingIn: true });
        try {
            const response = await axios.post(
                "/api/v1/auth/login",
                credentials
            );
            set({ user: response.data.user, isLoggingIn: false });
            toast.success("Logged in successfully");
        } catch (error: any) {
            toast.error(error.response.data.message || "An error occurred");
            set({ isLoggingIn: false, user: null });
        }
    },
    logout: async () => {
        set({ isLoggingOut: true });
        try {
            await axios.post("/api/v1/auth/logout");
            set({ user: null, isLoggingOut: false });
            toast.success("Logged out successfully");
        } catch (error: any) {
            toast.error(error.response.data.message || "Logout failed");
            set({ isLoggingOut: false });
        }
    },
    authCheck: async () => {
        set({ isCheckingAuth: true });

        try {
            const response = await axios.get("/api/v1/auth/authCheck");
            set({ user: response.data.user, isCheckingAuth: false });
        } catch (error) {
            set({ isCheckingAuth: false, user: null });
        }
    },
    getMe: async (id) => {
        try {
            const response = await axios.get(`/api/v1/auth/me/${id}`);
            set({ user: response.data.user });
        } catch (error: any) {
            console.log(error.response.message);
        }
    },
}));
