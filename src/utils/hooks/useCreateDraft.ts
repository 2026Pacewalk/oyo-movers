import { useDraftJobBooking } from "@/components/JobBooking/DraftJobBookingHook";
import { useUserData } from "@/components/User/UserDataHook";
import { createBooking } from "@/lib/serverAction";
import { updateDrafQuotation } from "@/lib/serverAction/bookingAction";

const isObjectSame = (obj1: any, obj2: any) => {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
};

const useCreateDraft = () => {
  const { localData, draftData, setLocalData, setDraftData } =
    useDraftJobBooking();

    const { user } = useUserData();
    
  const updateDrafQuotationData = (booking: any, key: string) => {
    if(user?._id && !draftData?._id) return false;
    if (key === "location") {
      if (!isObjectSame(booking, localData)) {
        booking.pickUpLocation._id = draftData?.pickUpLocation?.address?._id || draftData?.pickUpLocation?._id;
        booking.dropOffLocation._id = draftData.dropOffLocation?.address?._id || draftData?.dropOffLocation?._id;

        draftData.dropOffLocation = booking.dropOffLocation;
        draftData.pickUpLocation = booking.pickUpLocation;
        draftData.stopOvers  = booking?.stopOvers;
        draftData.noteForMover= booking?.noteForMover;
        draftData.moverService = booking?.moverService
        draftData.serviceName = booking?.moverServices

        updateDrafQuotation(draftData._id, draftData);
      }
    }else if(key === "moreDetails" || key === 'pickUpDate'){
      draftData?._id && updateDrafQuotation(draftData._id, booking);
    }else if(key === "vehicleRequirement"){
      draftData?._id && updateDrafQuotation(draftData._id,booking );
    }
     else {
      if (!isObjectSame(booking, localData)) {
        user?._id && draftData?._id && updateDrafQuotation(draftData?._id, { [key]: booking });
      }
    }
  };

  const createDraft = (booking: any) => {
    if (!isObjectSame(booking, localData)) {
      setLocalData(booking);
      user?._id && createBooking(booking).then((res) => {
        setDraftData({ ...res?.data?.data });
      });
    }
  };
  return {draftData, createDraft, setDraftData,updateDrafQuotationData };
};

export default useCreateDraft;
