import React from "react";
import type { LandingPage, Period } from "../../../types/landingPageDataTypes";
import { FieldDisplay } from "../../shared/FieldDisplay";

interface BusinessDataDisplayProps {
  businessData: LandingPage["businessData"];
}

const ContactInfoSection: React.FC<{ businessData: NonNullable<LandingPage["businessData"]> }> = ({ businessData }) => (
  <div>
    <h5 className="text-sm font-medium mb-3" style={{ color: "var(--text-tertiary)" }}>
      Contact Information
    </h5>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <FieldDisplay label="Phone" value={businessData.phone} />
      <FieldDisplay label="Email" value={businessData.email} />
      <FieldDisplay label="Emergency Phone" value={businessData.emergencyPhone} />
      <FieldDisplay label="Emergency Email" value={businessData.emergencyEmail} />
    </div>
  </div>
);

const AddressSection: React.FC<{ address: NonNullable<LandingPage["businessData"]>["address"] }> = ({ address }) => {
  if (!address) return null;

  return (
    <div>
      <h5 className="text-sm font-medium mb-3" style={{ color: "var(--text-tertiary)" }}>
        Address
      </h5>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FieldDisplay label="Street" value={address.street} />
        <FieldDisplay label="City" value={address.city} />
        <FieldDisplay label="State" value={address.state} />
        <FieldDisplay label="Zip Code" value={address.zipCode} />
        <FieldDisplay label="Country" value={address.country} />
      </div>
    </div>
  );
};

const CoordinatesSection: React.FC<{ coordinates: NonNullable<LandingPage["businessData"]>["coordinates"] }> = ({ coordinates }) => {
  if (!coordinates) return null;

  return (
    <div>
      <h5 className="text-sm font-medium mb-3" style={{ color: "var(--text-tertiary)" }}>
        Coordinates
      </h5>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FieldDisplay label="Latitude" value={coordinates.latitude} type="number" />
        <FieldDisplay label="Longitude" value={coordinates.longitude} type="number" />
      </div>
    </div>
  );
};

const BusinessHoursSection: React.FC<{ hours: NonNullable<LandingPage["businessData"]>["hours"] }> = ({ hours }) => {
  if (!hours?.schedule?.length) return null;

  const formatPeriods = (periods: Period[]) => {
    if (!periods || periods.length === 0) return "Closed";
    return periods.map(period => `${period.open} - ${period.close}`).join(", ");
  };

  return (
    <div>
      <h5 className="text-sm font-medium mb-3" style={{ color: "var(--text-tertiary)" }}>
        Business Hours
      </h5>
      <div className="space-y-2">
        <div className="flex justify-between py-3 px-6 bg-bg-tertiary">
          <h2>Timezone</h2>
          <h2>{hours.timezone}</h2>
        </div>
        {hours.schedule.map((daySchedule, index) => (
          <div key={index} className="flex justify-between items-center p-3 metallic-bg rounded-lg">
            <span style={{ color: "var(--text-primary)" }} className="font-medium">
              {daySchedule.day}
            </span>
            <span
              className={`text-sm ${daySchedule.isClosed ? "text-red-400" : ""}`}
              style={{
                color: daySchedule.isClosed ? "#f87171" : "var(--text-secondary)",
              }}
            >
              {daySchedule.isClosed ? "Closed" : formatPeriods(daySchedule.periods)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const SocialLinksSection: React.FC<{ socialLinks: NonNullable<LandingPage["businessData"]>["socialLinks"] }> = ({ socialLinks }) => {
  if (!socialLinks?.length) return null;

  return (
    <div>
      <h5 className="text-sm font-medium mb-3" style={{ color: "var(--text-tertiary)" }}>
        Social Links
      </h5>
      <div className="space-y-2">
        {socialLinks.map((link, index) => (
          <div key={index} className="flex justify-between items-center p-3 metallic-bg rounded-lg">
            <span style={{ color: "var(--text-primary)" }} className="font-medium capitalize">
              {link.platform}
            </span>
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline text-sm truncate ml-2"
              style={{ color: "var(--accent-primary)" }}
            >
              {link.url}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

const ServiceAreasSection: React.FC<{ serviceAreas: NonNullable<LandingPage["businessData"]>["serviceAreas"] }> = ({ serviceAreas }) => {
  if (!serviceAreas?.length) return null;

  return (
    <div>
      <h5 className="text-sm font-medium mb-3" style={{ color: "var(--text-tertiary)" }}>
        Service Areas
      </h5>
      <div className="space-y-3">
        {serviceAreas.map((area, index) => (
          <div key={index} className="p-4 metallic-bg rounded-lg">
            <div className="flex justify-between items-start mb-2">
              <span style={{ color: "var(--text-primary)" }} className="font-medium">
                {area.city}
              </span>
              <span style={{ color: "var(--text-muted)" }} className="text-sm">
                {area.region}
              </span>
            </div>
            <p style={{ color: "var(--text-secondary)" }} className="text-sm">
              {area.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export const BusinessDataDisplay: React.FC<BusinessDataDisplayProps> = ({ businessData }) => {
  if (!businessData) return null;

  return (
    <div>
      <h4 className="text-lg font-semibold silver-text mb-6 flex items-center gap-2">
        <svg
          className="w-5 h-5 text-emerald-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
          />
        </svg>
        Business Data
      </h4>
      <div className="space-y-6">
        <ContactInfoSection businessData={businessData} />
        <AddressSection address={businessData.address} />
        <CoordinatesSection coordinates={businessData.coordinates} />
        <BusinessHoursSection hours={businessData.hours} />
        <SocialLinksSection socialLinks={businessData.socialLinks} />
        <ServiceAreasSection serviceAreas={businessData.serviceAreas} />
      </div>
    </div>
  );
};
