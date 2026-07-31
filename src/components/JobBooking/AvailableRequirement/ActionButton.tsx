'use client'
import IconButton from '@/components/IconButton'
import { tokenKey } from '@/config'
import { getCookie } from '@/lib/cookies'
import React, { useState } from 'react'
import { FaArrowRight } from 'react-icons/fa6'
import { BsInfoCircle } from 'react-icons/bs'
import { useJobBooking } from '../JobBookingHook'
import { useJobBookingStore } from '../jobBookingStore'
import { useMediaQuery } from '@/utils/hooks/useMediaQuery'
import EstimateCostTimeModal from '@/components/EstimateCostTimeModal'
import { resolveVehiclePopupTypeKey } from '@/utils/vehiclePopupDetails'

const ActionButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width: 480px)');

  const {
    nextStep,
    jobBooking,
  } = useJobBooking()
  const availableRequirements = useJobBookingStore((s) => s.availableRequirements);
  const vehicleType = jobBooking?.vehicleType;
  const selectedRequirement = Array.isArray(availableRequirements)
    ? availableRequirements.find((r: any) => r._id === vehicleType)
    : null;
  const vehicleTypeKey = selectedRequirement
    ? resolveVehiclePopupTypeKey(selectedRequirement)
    : null;
  const vehicleName =
    selectedRequirement?.vehicleName ||
    selectedRequirement?.vehicleDisplayName ||
    '';
  const chooseButtonLabel = (() => {
    if (!vehicleTypeKey) return 'Choose Vehicle';
    if (vehicleTypeKey === 'van') return 'Choose Van';
    return vehicleName ? `Choose ${vehicleName}` : 'Choose Truck';
  })();

  const getToken = async () => {
    return getCookie(tokenKey);
  };

  const handleSubmit = async () => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      const token = await getToken();
      if (token) {
        nextStep();
        nextStep();
      } else {
        nextStep();
      }
    } catch (error) {
      console.error('Error in action button:', error);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  }

  const LoadingSpinner = () => (
    <div className="spinner-border spinner-border-sm" role="status" style={{ width: '18px', height: '18px' }}>
      <span className="visually-hidden">Loading...</span>
    </div>
  );

  // Desktop: original continue button (jobBooking.scss)
  if (!isMobile) {
    return (
      <div className="selectVehicle footerLocation justify-content-end">
        <IconButton
          className="buttonClass continueStepButton"
          title={isLoading ? 'Processing...' : 'Continue'}
          icon={isLoading ? <LoadingSpinner /> : <FaArrowRight />}
          onClick={handleSubmit}
          disabled={!vehicleType || isLoading}
        />
      </div>
    )
  }

  // Mobile: new footer with "Estimated Cost & Time" + yellow "Choose X" (SelectVehicle.scss)
  return (
    <>
      <div className="selectVehicleFooter">
        <div 
          className="estimatedCostRow"
          onClick={() => setModalOpen(true)}
          style={{ cursor: 'pointer' }}
        >
          👉<BsInfoCircle className="estimatedCostIcon" aria-hidden />
          <span style={{ color: "rgb(2 94 184)", textDecoration: 'underline', lineHeight: '10px'}}>Estimated Cost & Time!</span>
        </div>
        <button
          type="button"
          className="chooseVehicleBtn"
          onClick={handleSubmit}
          disabled={!vehicleType || isLoading}
        >
          {isLoading ? 'Processing...' : chooseButtonLabel}
        </button>
      </div>

      <EstimateCostTimeModal
        show={modalOpen}
        onClose={() => setModalOpen(false)}
        vehicalData={availableRequirements}
        jobBooking={jobBooking}
      />
    </>
  )
}

export default ActionButton