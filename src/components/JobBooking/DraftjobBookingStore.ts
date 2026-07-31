import { create } from "zustand";

export interface DraftJobBookingStore {
  localData: any;
  draftData: any;
  setLocalData: (localData: any) => void;
  setDraftData: (draftData: any) => void;
}

export const useDraftJobBookingStore = create<DraftJobBookingStore>((set) => ({
  localData: null,
  draftData: null,
  setLocalData: (localData: any) => set({ localData }),
  setDraftData: (draftData: any) => set({ draftData }),
}));
