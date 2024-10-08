"use client";
import { create } from "zustand";
import { UserData } from "../types/user.type";

type AuthStore = {
  userData: UserData | undefined;
  isAuthenticated: boolean;
  setAuthenticated: (isAuth: boolean) => void;
  setUserData: (userData: UserData) => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  userData: undefined,
  isAuthenticated: false,
  setAuthenticated: (isAuth: boolean) =>
    set(() => ({ isAuthenticated: isAuth })),
  setUserData: (userData: UserData) => set(() => ({ userData: userData })),
}));
