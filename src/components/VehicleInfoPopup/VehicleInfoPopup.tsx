import React from 'react';
import { FaTimes } from 'react-icons/fa';
import { formatOpfVehicleLabel } from '@/components/JobBooking/OnePageMobile/formatOpfVehicleLabel';
import './VehicleInfoPopup.scss';
import '../../app/prices/prices.scss';

interface VehicleInfoPopupProps {
  isOpen: boolean;
  onClose: () => void;
  vehicle: {
    _id: string;
    vehicleName: string;
    vehicleDisplayName?: string;
    moverRequired: string;
    description: string;
    wasPrice: number;
    moverPrice: number;
    imgSrc: string;
    features: string[];
    capacity: string;
    space: string;
  };
}

const VehicleInfoPopup: React.FC<VehicleInfoPopupProps> = ({ isOpen, onClose, vehicle }) => {
  if (!isOpen || !vehicle) return null;

  const vehicleLabel = formatOpfVehicleLabel(vehicle);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="vehicle-info-popup-overlay" onClick={handleBackdropClick}>
      <div className="vehicle-info-popup-container">
        <button className="vehicle-info-popup-close" onClick={onClose} type="button">
          <FaTimes />
        </button>

        <div className="vehicle-info-popup-header">
          <div className="imageCard">
            <a className="active">
              <div className="vehicle-info-popup-image-wrap">
                <img
                  src={vehicle.imgSrc}
                  className="vehicle-info-popup__img"
                  alt={vehicleLabel.title}
                />
              </div>
              <div className="content-wrapper text-center">
                <h6 className="my-0 mx-1">
                  {vehicleLabel.title}{' '}
                  {vehicleLabel.men ? (
                    <span className="required rounded-lg text-capitalize">
                      {vehicleLabel.men}
                    </span>
                  ) : null}
                </h6>
                <p className="mb-0">{vehicle.capacity}</p>

                <div className="price-display-wrapper">
                  <div className="price-info">
                    <div className="was-price-wrapper">
                      <span className="was-label">Was</span>
                      <span className="was-price">${vehicle.wasPrice}</span>
                    </div>

                    <div className="now-price-wrapper">
                      <span className="now-label">NOW</span>
                      <span className="now-price">${vehicle.moverPrice}</span>
                      <span className="price-duration">/30 mins</span>
                    </div>
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>

        <div className="vehicle-info-popup-features">
          <h3 className="vehicle-info-popup-features-title">What&apos;s included</h3>
          <ul className="vehicle-info-popup-features-list">
            {vehicle.features.map((feature: string, index: number) => (
              <li key={index} className="vehicle-info-popup-feature-item">
                <span className="vehicle-info-popup-checkmark">✓</span>
                <span className="vehicle-info-popup-feature-text">
                  {feature.includes('No Minimum Hours!') ? (
                    <>
                      <strong>No Minimum Hours!</strong>
                      <a href="#" className="vehicle-info-popup-booking-link">
                        {' '}
                        Book for as little as 30 mins.
                      </a>
                    </>
                  ) : (
                    feature
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default VehicleInfoPopup;
