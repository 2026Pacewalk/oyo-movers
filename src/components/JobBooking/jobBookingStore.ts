import { create } from "zustand";
import { clearPendingQuotationId } from "@/utils/secureQuotation";

export interface JobBookingStore {
  services: any;
  setServices: (services: any) => void;
  timeslots: any;
  setTimeslots: (timeslots: any) => void;
  availableRequirements: any;
  setAvailableRequirements: (availableRequirements: any) => void;
  savePaymetCards: any;
  setSavePaymetCards: (savePaymetCards: any) => void;

  // Job Booking Store

  activeTab: string;
  setActiveTab: (activeTab: string) => void;

  jobBooking: {
    moverService: string;
    pickUpLocation: any;
    dropOffLocation: any;
    stopOvers: any[];
    spaceInProperty: string;
    howFurnished: string;
    pickUpDate: string;
    pickUpSlot: string;
    pickupStartTime: string;
    pickupEndTime: string;
    listOfItems: string;
    dismantlingAndAssembly: boolean;
    packingAndUnpacking: boolean;
    vehicleType: string;
    distance: string;
    duration: string;
    itemImages: string[];
    callOutFee: number;
    saveAddress: boolean;
    user: any
    noteForMover: string;
    isDraft: boolean;
    _id?: string;
  };
  labour: {
    howWeHelp: string;
    howManyHelper: string;
    helperTime: string;
  };
  reBooking: {
    moverService: string;
    pickUpLocation: any;
    dropOffLocation: any;
    stopOvers: any[];
    spaceInProperty: string;
    howFurnished: string;
    pickUpDate: string;
    pickUpSlot: string;
    listOfItems: string;
    dismantlingAndAssembly: boolean;
    packingAndUnpacking: boolean;
    vehicleType: string;
    distance: string;
    duration: string;
    itemImages: string[];
    callOutFee: number;
    saveAddress: boolean;
    howWeHelp: string;
    howManyHelper: string;
    helperTime: string;
  };
  couponId: string;
  couponDetails: any;
  moverServices: string;
  durationKm: string;
  activeStep: number;
  prevoiusStep: number;
  addressOptions: [];
  setAddressOptions: (addressOptions: []) => void;
  setCouponId: (couponId: string) => void;
  setCouponDetails: (couponDetails: any) => void;
  setCallOutFee: (callOutFee: number) => void;
  setItemImages: (itemImages: string[]) => void;
  removeItemImages: (itemImages: string) => void;
  setHowWeHelp: (howWeHelp: string) => void;
  setHowManyHelper: (howManyHelper: string) => void;
  setHelperTime: (helperTime: any) => void;
  setDurationKm: (durationKm: string) => void;
  price: number;
  setPrice: (price: number) => void;
  cardId: string;
  setCardId: (cardId: string) => void;
  resetJobBooking: () => void;
  resetLabour: () => void;
  setJobBooking: (jobBooking: any) => void;
  nextStep: () => void;
  prevStep: () => void;
  resetStep: () => void;
  setActiveStep: (activeStep: number) => void;
  setPreviousStep: (prevoiusStep: number) => void;
  setMoverService: (moverService: string) => void;
  setPickUpLocation: (pickUpLocation: any) => void;
  setDropOffLocation: (dropOffLocation: any) => void;
  setStopOvers: (stopOvers: any) => void;
  setSpaceInProperty: (spaceInProperty: string) => void;
  setHowFurnished: (howFurnished: string) => void;
  setPickUpDate: (pickUpDate: string) => void;
  setPickUpSlot: (pickUpSlot: string) => void;
  setPickupStartTime: (pickupStartTime: string) => void;
  setPickupEndTime: (pickupEndTime: string) => void;
  setListOfItems: (listOfItems: string) => void;
  setDismantlingAndAssembly: (dismantlingAndAssembly: boolean) => void;
  setPackingAndUnpacking: (packingAndUnpacking: boolean) => void;
  setVehicleType: (vehicleType: string) => void;
  setDistance: (distance: string) => void;
  setDuration: (duration: string) => void;
  setMoverData: (moverServices: string) => void;
  setStep: (activeStep: number) => void;
  setSaveAddress: (saveAddress: boolean) => void;
  setBookingData: (bookingData: any) => void;
  setReBooking: (reBooking: any) => void;
  setUserSignUpData: (data: any) => void;
  setNoteForMover: (noteForMover: string) => void;
  quotation: any;
  setQuotation: (quotation: any) => void;

}

export const useJobBookingStore = create<JobBookingStore>((set) => ({
  services: [],
  setServices: (services: any) => set({ services }),
  timeslots: [],
  setTimeslots: (timeslots: any) => set({ timeslots }),
  availableRequirements: [],
  setAvailableRequirements: (availableRequirements: any) => set({ availableRequirements }),
  savePaymetCards: [],
  setSavePaymetCards: (savePaymetCards: any) => set({ savePaymetCards }),

  // Job Booking Store

  activeTab: "0",
  jobBooking: {
    moverService: "",
    pickUpLocation: {},
    dropOffLocation: {},
    stopOvers: [],
    spaceInProperty: "",
    howFurnished: "",
    pickUpDate: "",
    pickUpSlot: "",
    pickupStartTime: "",
    pickupEndTime: "",
    listOfItems: "",
    dismantlingAndAssembly: false,
    packingAndUnpacking: false,
    vehicleType: "",
    distance: "",
    duration: "",
    itemImages: [],
    callOutFee: 0,
    saveAddress: false,
    user: {},
    noteForMover: "",
    isDraft: false,
  },
  labour: {
    howWeHelp: "",
    howManyHelper: "",
    helperTime: "2",
  },
  reBooking: {
    moverService: "",
    pickUpLocation: {},
    dropOffLocation: {},
    stopOvers: [],
    spaceInProperty: "",
    howFurnished: "",
    pickUpDate: "",
    pickUpSlot: "",
    listOfItems: "",
    dismantlingAndAssembly: false,
    packingAndUnpacking: false,
    vehicleType: "",
    distance: "",
    duration: "",
    itemImages: [],
    callOutFee: 0,
    saveAddress: false,
    howWeHelp: "",
    howManyHelper: "",
    helperTime: "",
  },
  moverServices: "",
  durationKm: "",
  price: 0,
  cardId: "",
  setActiveTab: (activeTab: string) => set({ activeTab }),
  couponId: "",
  couponDetails: null,
  setSaveAddress: (saveAddress: any) => set((state) => ({ jobBooking: { ...state.jobBooking, saveAddress } })),
  setCouponId: (couponId: string) => set({ couponId }),
  setCouponDetails: (couponDetails: any) => set({ couponDetails }),
  setCardId: (cardId: string) => set({ cardId }),
  setPrice: (price: number) => set({ price }),
  setDurationKm: (durationKm: string) => set({ durationKm }),

  activeStep: 0,
  prevoiusStep: 0,
  setStep: (activeStep: number) => set({ activeStep }),
  setHowWeHelp: (howWeHelp: any) => set((state) => ({ labour: { ...state.labour, howWeHelp } })),
  setHowManyHelper: (howManyHelper: any) => set((state) => ({ labour: { ...state.labour, howManyHelper } })),
  setHelperTime: (helperTime: any) => set((state) => ({ labour: { ...state.labour, helperTime } })),
  setJobBooking: (jobBooking: any) => set({ jobBooking }),
  setReBooking: (reBooking: any) => set({ reBooking }),
  quotation: null,
  setQuotation: (quotation: any) => set({ quotation }),
  resetJobBooking: () => {
    clearPendingQuotationId();
    return set({
      jobBooking: {
        moverService: "",
        pickUpLocation: {},
        dropOffLocation: {},
        stopOvers: [],
        spaceInProperty: "",
        howFurnished: "",
        pickUpDate: "",
        pickUpSlot: "",
        pickupStartTime: "",
        pickupEndTime: "",
        listOfItems: "",
        dismantlingAndAssembly: false,
        packingAndUnpacking: false,
        vehicleType: "",
        distance: "",
        duration: "",
        itemImages: [],
        callOutFee: 0,
        saveAddress: false,
        user: {},
        noteForMover: "",
        isDraft: false
      },
      quotation: null,
    });
  },
  resetLabour: () =>
    set({
      labour: {
        howWeHelp: "",
        howManyHelper: "",
        helperTime: "2",
      },
    }),
  setPreviousStep: (prevoiusStep: number) => set({ prevoiusStep }),
  resetStep: () => set({ activeStep: 0 }),
  setActiveStep: (activeStep: number) => set({ activeStep }),
  nextStep: () => set((state) => ({ activeStep: state.activeStep + 1 })),
  prevStep: () => set((state) => ({ activeStep: state.activeStep - 1 })),
  setMoverService: (moverService: string) => set((state) => ({ jobBooking: { ...state.jobBooking, moverService } })),
  setPickUpLocation: (pickUpLocation: any) => set((state) => ({ jobBooking: { ...state.jobBooking, pickUpLocation } })),
  setDropOffLocation: (dropOffLocation: any) =>
    set((state) => ({ jobBooking: { ...state.jobBooking, dropOffLocation } })),
  setStopOvers: (stopOvers: any) => set((state) => ({ jobBooking: { ...state.jobBooking, stopOvers } })),
  setSpaceInProperty: (spaceInProperty: string) =>
    set((state) => ({ jobBooking: { ...state.jobBooking, spaceInProperty } })),
  setHowFurnished: (howFurnished: string) => set((state) => ({ jobBooking: { ...state.jobBooking, howFurnished } })),
  setPickUpDate: (pickUpDate: string) => set((state) => ({ jobBooking: { ...state.jobBooking, pickUpDate } })),
  setPickUpSlot: (pickUpSlot: string) => set((state) => ({ jobBooking: { ...state.jobBooking, pickUpSlot } })),
  setPickupStartTime: (pickupStartTime: string) => set((state) => ({ jobBooking: { ...state.jobBooking, pickupStartTime } })),
  setPickupEndTime: (pickupEndTime: string) => set((state) => ({ jobBooking: { ...state.jobBooking, pickupEndTime } })),
  setListOfItems: (listOfItems: string) => set((state) => ({ jobBooking: { ...state.jobBooking, listOfItems } })),
  setDismantlingAndAssembly: (dismantlingAndAssembly: boolean) =>
    set((state) => ({
      jobBooking: { ...state.jobBooking, dismantlingAndAssembly },
    })),
  setPackingAndUnpacking: (packingAndUnpacking: boolean) =>
    set((state) => ({
      jobBooking: { ...state.jobBooking, packingAndUnpacking },
    })),
  setVehicleType: (vehicleType: string) => set((state) => ({ jobBooking: { ...state.jobBooking, vehicleType } })),
  setDistance: (distance: string) =>
    set((state) => ({
      jobBooking: { ...state.jobBooking, distance },
    })),
  setItemImages: (itemImages: string[]) =>
    set((state) => ({
      jobBooking: {
        ...state.jobBooking,
        itemImages: [...state.jobBooking.itemImages, ...itemImages],
      },
    })),
  removeItemImages: (item: string) =>
    set((state) => ({
      jobBooking: {
        ...state.jobBooking,
        itemImages: state.jobBooking.itemImages.filter((img) => item !== img),
      },
    })),
  setDuration: (duration: string) =>
    set((state) => ({
      jobBooking: { ...state.jobBooking, duration },
    })),
  setCallOutFee: (callOutFee: number) =>
    set((state) => ({
      jobBooking: { ...state.jobBooking, callOutFee },
    })),

  setMoverData: (moverServices: string) => set({ moverServices }),
  addressOptions: [],
  setAddressOptions: (addressOptions: []) => set({ addressOptions }),
  setBookingData: (jobBooking: any) => set({ jobBooking }),
  setUserSignUpData: (user: string) => set((state) => ({ jobBooking: { ...state.jobBooking, user } })),
  setNoteForMover: (noteForMover: string) => set((state) => ({ jobBooking: { ...state.jobBooking, noteForMover } })),
}));
