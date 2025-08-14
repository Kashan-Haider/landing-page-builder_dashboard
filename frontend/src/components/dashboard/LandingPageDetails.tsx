import React from 'react';
import type { LandingPage } from '../../types/landingPageDataTypes';
import { FieldDisplay } from '../shared/FieldDisplay';

interface LandingPageDetailsProps {
  page: LandingPage;
}

export const LandingPageDetails: React.FC<LandingPageDetailsProps> = ({ page }) => {
  return (
    <div className="bg-slate-800 rounded-xl shadow-xl border border-slate-700 max-h-full overflow-y-auto">
      <div className="px-6 py-6">
        <div className="space-y-8">
          {/* Basic Info */}
          <div>
            <h4 className="text-lg font-semibold text-slate-100 mb-6 flex items-center gap-2">
              <svg
                className="w-5 h-5 text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Basic Information
            </h4>
            <FieldDisplay label="Business Name" value={page.businessName} />
            <FieldDisplay label="Template ID" value={page.templateId} />
            <FieldDisplay label="GitHub URL" value={page.githubUrl} />
          </div>

          {/* SEO Settings */}
          {page.seoSettings && (
            <div>
              <h4 className="text-lg font-semibold text-slate-100 mb-6 flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                SEO Settings
              </h4>
              {(() => {
                const seo = page.seoSettings;
                return (
                  <>
                    <FieldDisplay label="Title" value={seo?.title} />
                    <FieldDisplay label="Description" value={seo?.description} />
                    <FieldDisplay label="Keywords" value={seo?.keywords} type="array" />
                  </>
                );
              })()}
            </div>
          )}

          {/* Theme */}
          {(page.theme || page.Theme) && (
            <div>
              <h4 className="text-lg font-semibold text-slate-100 mb-6 flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-pink-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                  />
                </svg>
                Theme
              </h4>
              <FieldDisplay
                label="Primary Color"
                value={(page.theme || page.Theme)?.primaryColor}
              />
              <FieldDisplay
                label="Secondary Color"
                value={(page.theme || page.Theme)?.secondaryColor}
              />
            </div>
          )}

          {/* Business Contact */}
          {(page.businessContact || page.BusinessContact) && (
            <div>
              <h4 className="text-lg font-semibold text-slate-100 mb-6 flex items-center gap-2">
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
                Business Contact
              </h4>
              {(() => {
                const contact = page.businessContact || page.BusinessContact;
                return (
                  <>
                    <FieldDisplay label="Phone" value={contact?.phone} />
                    <FieldDisplay label="Emergency Phone" value={contact?.emergencyPhone} />
                    <FieldDisplay label="Email" value={contact?.email} />
                    <FieldDisplay label="Emergency Email" value={contact?.emergencyEmail} />
                    <FieldDisplay label="Street" value={contact?.street} />
                    <FieldDisplay label="City" value={contact?.city} />
                    <FieldDisplay label="State" value={contact?.state} />
                    <FieldDisplay label="Zip Code" value={contact?.zipCode} />
                    <FieldDisplay label="Latitude" value={contact?.latitude} type="number" />
                    <FieldDisplay label="Longitude" value={contact?.longitude} type="number" />
                  </>
                );
              })()}
            </div>
          )}

          {/* Service Areas */}
          {page.serviceAreas && page.serviceAreas.length > 0 && (
            <div>
              <h4 className="text-lg font-semibold text-slate-100 mb-6 flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-yellow-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                Service Areas ({page.serviceAreas.length})
              </h4>
              <div className="space-y-4">
                {page.serviceAreas.map((serviceArea, index) => (
                  <div
                    key={serviceArea.id}
                    className="p-4 bg-slate-600 border border-slate-500 rounded-lg"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h5 className="font-medium text-slate-100">
                        Service Area {index + 1}
                      </h5>
                      <span className="text-xs text-slate-400">
                        ID: {serviceArea.id}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="text-slate-300">City:</span>
                        <div className="text-slate-100">{serviceArea.city}</div>
                      </div>
                      <div>
                        <span className="text-slate-300">Region:</span>
                        <div className="text-slate-100">{serviceArea.region}</div>
                      </div>
                      <div className="md:col-span-2">
                        <span className="text-slate-300">Description:</span>
                        <div className="text-slate-100 mt-1">{serviceArea.description}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Hero Section */}
          {(page.heroSection || page.HeroSection) && (
            <div>
              <h4 className="text-lg font-semibold text-slate-100 mb-6 flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-orange-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                  />
                </svg>
                Hero Section
              </h4>
              {(() => {
                const section = page.heroSection || page.HeroSection;
                return (
                  <>
                    <FieldDisplay label="Title" value={section?.title} />
                    <FieldDisplay label="Subtitle" value={section?.subtitle} />
                    <FieldDisplay label="Description" value={section?.description} />
                  </>
                );
              })()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
