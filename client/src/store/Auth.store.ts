"use client";
import { create } from "zustand";

type AuthStore = {
  isAuthenticated: boolean;
  setAuthenticated: (isAuth: boolean) => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  isAuthenticated: false,
  setAuthenticated: (isAuth: boolean) =>
    set(() => ({ isAuthenticated: isAuth })),
}));
