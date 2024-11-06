import axios from "axios";
import { toast } from "react-hot-toast";
import { create } from "zustand";

interface ISignUpCredentials {
    email: string;
    username: string;
    password: string;
}

interface IStore {
    user: [] | null;
    isSigningUp: boolean;
    isCheckingAuth: boolean;
    signup: (credentials: ISignUpCredentials) => Promise<void>;
    logout: () => Promise<void>;
    authCheck: () => Promise<void>;
}

export const useAuthStore = create<IStore>((set) => ({
    user: null,
    isSigningUp: false,
    isCheckingAuth: true,
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
    login: async () => {},
    logout: async () => {},
    authCheck: async () => {
        set({ isCheckingAuth: true });

        try {
            const response = await axios.get("/api/v1/auth/authCheck");
            set({ user: response.data.user, isCheckingAuth: false });
        } catch (error) {
            set({ isCheckingAuth: false, user: null });
        }
    },
}));
