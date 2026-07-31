"use client";
import { useUserDataStore, UserStore } from "./UserDataStore";

export const useUserData = () => useUserDataStore((s: UserStore) => s);
