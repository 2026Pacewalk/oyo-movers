import { create } from "zustand";

interface User {
  bookingAddress: [];
  addresses: [];
  createdAt: string;
  email: string;
  name: string;
  phone: string;
  stripeId: string;
  imgSrc: string;
  imgKey: string;
  deviceToken: string;
  _id: string;
}

export interface UserStore {
  user: User;
  setUser: any;
  address: any;
  setAddress: any;
  resetUser: any;
}

export const useUserDataStore = create<UserStore>((set) => ({
  user: {
    bookingAddress: [],
    addresses: [],
    createdAt: "",
    email: "",
    name: "",
    phone: "",
    stripeId: "",
    imgSrc: "",
    imgKey: "",
    deviceToken: "",
    _id: "",
  },
  setUser: (user: any) => set({ user }),
  address: {},
  resetUser: () =>
    set({
      user: {
        bookingAddress: [],
        addresses: [],
        createdAt: "",
        email: "",
        // firstname: "",
        // lastname: "",
        name: "",
        phone: "",
        stripeId: "",
        imgSrc: "",
        imgKey: "",
        deviceToken: "",
        _id: "",
      },
    }),
  setAddress: (address: any) => set({ address }),
}));
