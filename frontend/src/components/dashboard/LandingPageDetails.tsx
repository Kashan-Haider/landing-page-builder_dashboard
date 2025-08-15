import React from 'react';
import type { LandingPage } from '../../types/landingPageDataTypes';
import { FieldDisplay } from '../shared/FieldDisplay';
import { ContentSectionRenderer } from '../content/ContentSectionRenderer';

interface LandingPageDetailsProps {
  page: LandingPage;
}

const formatDate = (date: string | undefined) => {
  if (!date) return 'Not set';
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'text-green-300 border-green-500';
      case 'draft': return 'text-yellow-300 border-yellow-500';
      case 'archived': return 'text-gray-300 border-gray-500';
      default: return 'text-gray-300 border-gray-500';
    }
  };

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border metallic-bg ${getStatusColor(status)}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

export const LandingPageDetails: React.FC<LandingPageDetailsProps> = ({ page }) => {
  return (
    <div className="card-metallic max-h-full overflow-y-auto">
      <div className="px-6 py-6">
        <div className="space-y-8">
          {/* Basic Info */}
          <div>
            <h4 className="text-lg font-semibold silver-text mb-6 flex items-center gap-2">
              <svg
                className="w-5 h-5"
                style={{ color: 'var(--accent-primary)' }}
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
            <div className="space-y-4">
              <FieldDisplay label="Business Name" value={page.businessName} />
              <FieldDisplay label="Template ID" value={page.templateId} />
              <FieldDisplay label="GitHub URL" value={page.githubUrl} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div>
                <span style={{ color: 'var(--text-tertiary)' }} className="text-sm font-medium">Status:</span>
                <div className="mt-2">
                  <StatusBadge status={page.status} />
                </div>
              </div>
              <div>
                <span style={{ color: 'var(--text-tertiary)' }} className="text-sm font-medium">Images:</span>
                <div style={{ color: 'var(--text-secondary)' }} className="text-sm mt-1">{page.images?.length || 0} uploaded</div>
              </div>
              <div>
                <span style={{ color: 'var(--text-tertiary)' }} className="text-sm font-medium">Created:</span>
                <div style={{ color: 'var(--text-secondary)' }} className="text-sm mt-1">{formatDate(page.createdAt)}</div>
              </div>
              <div>
                <span style={{ color: 'var(--text-tertiary)' }} className="text-sm font-medium">Updated:</span>
                <div style={{ color: 'var(--text-secondary)' }} className="text-sm mt-1">{formatDate(page.updatedAt)}</div>
              </div>
              {page.publishedAt && (
                <div className="md:col-span-2">
                  <span style={{ color: 'var(--text-tertiary)' }} className="text-sm font-medium">Published:</span>
                  <div style={{ color: 'var(--text-secondary)' }} className="text-sm mt-1">{formatDate(page.publishedAt)}</div>
                </div>
              )}
            </div>
          </div>

          {/* SEO Data */}
          {page.seoData && (
            <div>
              <h4 className="text-lg font-semibold silver-text mb-6 flex items-center gap-2">
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
                SEO Data
              </h4>
              <div className="space-y-4">
                <FieldDisplay label="Title" value={page.seoData.title} />
                <FieldDisplay label="Description" value={page.seoData.description} />
                <FieldDisplay label="Keywords" value={page.seoData.keywords} type="array" />
                <FieldDisplay label="Favicon" value={page.seoData.favicon} />
                <FieldDisplay label="OG Image" value={page.seoData.ogImage} />
              </div>
            </div>
          )}

          {/* Theme Data */}
          {page.themeData && (
            <div>
              <h4 className="text-lg font-semibold silver-text mb-6 flex items-center gap-2">
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
                Theme Data
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <FieldDisplay label="Primary Color" value={page.themeData.primaryColor} />
                  {page.themeData.primaryColor && (
                    <div className="mt-2 flex items-center gap-2">
                      <div 
                        className="w-8 h-8 rounded border"
                        style={{ 
                          backgroundColor: page.themeData.primaryColor,
                          borderColor: 'var(--border-secondary)'
                        }}
                      ></div>
                      <span style={{ color: 'var(--text-muted)' }} className="text-sm">Color Preview</span>
                    </div>
                  )}
                </div>
                <div>
                  <FieldDisplay label="Secondary Color" value={page.themeData.secondaryColor} />
                  {page.themeData.secondaryColor && (
                    <div className="mt-2 flex items-center gap-2">
                      <div 
                        className="w-8 h-8 rounded border"
                        style={{ 
                          backgroundColor: page.themeData.secondaryColor,
                          borderColor: 'var(--border-secondary)'
                        }}
                      ></div>
                      <span style={{ color: 'var(--text-muted)' }} className="text-sm">Color Preview</span>
                    </div>
                  )}
                </div>
                <div className="md:col-span-2">
                  <FieldDisplay label="Font Family" value={page.themeData.fontFamily} />
                </div>
                <div className="md:col-span-2">
                  <FieldDisplay label="Logo URL" value={page.themeData.logoUrl} />
                </div>
              </div>
            </div>
          )}

          {/* Business Data */}
          {page.businessData && (
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
                {/* Contact Information */}
                <div>
                  <h5 className="text-sm font-medium mb-3" style={{ color: 'var(--text-tertiary)' }}>Contact Information</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FieldDisplay label="Phone" value={page.businessData.phone} />
                    <FieldDisplay label="Email" value={page.businessData.email} />
                    <FieldDisplay label="Emergency Phone" value={page.businessData.emergencyPhone} />
                    <FieldDisplay label="Emergency Email" value={page.businessData.emergencyEmail} />
                  </div>
                </div>
                
                {/* Address */}
                {page.businessData.address && (
                  <div>
                    <h5 className="text-sm font-medium mb-3" style={{ color: 'var(--text-tertiary)' }}>Address</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FieldDisplay label="Street" value={page.businessData.address.street} />
                      <FieldDisplay label="City" value={page.businessData.address.city} />
                      <FieldDisplay label="State" value={page.businessData.address.state} />
                      <FieldDisplay label="Zip Code" value={page.businessData.address.zipCode} />
                      <FieldDisplay label="Country" value={page.businessData.address.country} />
                    </div>
                  </div>
                )}
                
                {/* Coordinates */}
                {page.businessData.coordinates && (
                  <div>
                    <h5 className="text-sm font-medium mb-3" style={{ color: 'var(--text-tertiary)' }}>Coordinates</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FieldDisplay label="Latitude" value={page.businessData.coordinates.latitude} type="number" />
                      <FieldDisplay label="Longitude" value={page.businessData.coordinates.longitude} type="number" />
                    </div>
                  </div>
                )}
                
                {/* Business Hours */}
                {page.businessData.hours && page.businessData.hours.length > 0 && (
                  <div>
                    <h5 className="text-sm font-medium mb-3" style={{ color: 'var(--text-tertiary)' }}>Business Hours</h5>
                    <div className="space-y-2">
                      {page.businessData.hours.map((hour, index) => (
                        <div key={index} className="flex justify-between items-center p-3 metallic-bg rounded-lg">
                          <span style={{ color: 'var(--text-primary)' }} className="font-medium">{hour.day}</span>
                          <span className={`text-sm ${hour.isClosed ? 'text-red-400' : ''}`} style={{ color: hour.isClosed ? '#f87171' : 'var(--text-secondary)' }}>
                            {hour.isClosed ? 'Closed' : hour.hours}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Social Links */}
                {page.businessData.socialLinks && page.businessData.socialLinks.length > 0 && (
                  <div>
                    <h5 className="text-sm font-medium mb-3" style={{ color: 'var(--text-tertiary)' }}>Social Links</h5>
                    <div className="space-y-2">
                      {page.businessData.socialLinks.map((link, index) => (
                        <div key={index} className="flex justify-between items-center p-3 metallic-bg rounded-lg">
                          <span style={{ color: 'var(--text-primary)' }} className="font-medium capitalize">{link.platform}</span>
                          <a href={link.url} target="_blank" rel="noopener noreferrer" 
                             className="hover:underline text-sm truncate ml-2"
                             style={{ color: 'var(--accent-primary)' }}>
                            {link.url}
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Service Areas */}
                {page.businessData.serviceAreas && page.businessData.serviceAreas.length > 0 && (
                  <div>
                    <h5 className="text-sm font-medium mb-3" style={{ color: 'var(--text-tertiary)' }}>Service Areas</h5>
                    <div className="space-y-3">
                      {page.businessData.serviceAreas.map((area, index) => (
                        <div key={index} className="p-4 metallic-bg rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <span style={{ color: 'var(--text-primary)' }} className="font-medium">{area.city}</span>
                            <span style={{ color: 'var(--text-muted)' }} className="text-sm">{area.region}</span>
                          </div>
                          <p style={{ color: 'var(--text-secondary)' }} className="text-sm">{area.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Page Content */}
          {page.content && (
            <div>
              <h4 className="text-lg font-semibold silver-text mb-6 flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-purple-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Page Content
              </h4>
              <div className="space-y-6">
                {/* Hero Section */}
                {page.content.hero && (
                  <div>
                    <h5 className="text-sm font-medium mb-3 silver-text uppercase tracking-wider">Hero Section</h5>
                    <div className="card-metallic p-4">
                      <div className="space-y-4">
                        <FieldDisplay label="Title" value={page.content.hero.title} />
                        <FieldDisplay label="Subtitle" value={page.content.hero.subtitle} />
                        <FieldDisplay label="Description" value={page.content.hero.description} />
                        {page.content.hero.ctaButtons && page.content.hero.ctaButtons.length > 0 && (
                          <div className="mt-4">
                            <span style={{ color: 'var(--text-tertiary)' }} className="text-sm font-medium">CTA Buttons:</span>
                            <div className="mt-2 space-y-2">
                              {page.content.hero.ctaButtons.map((cta, index) => (
                                <div key={index} className="flex items-center gap-3 p-3 rounded-lg" style={{ backgroundColor: 'var(--bg-quaternary)' }}>
                                  <span style={{ color: 'var(--text-primary)' }} className="font-medium">{cta.label}</span>
                                  <span style={{ color: 'var(--text-muted)' }}>→</span>
                                  <span style={{ color: 'var(--accent-primary)' }}>{cta.href}</span>
                                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                                    cta.style === 'primary' ? 'btn-metallic' : ''
                                  }`} style={{ 
                                    backgroundColor: cta.style === 'primary' ? 'var(--accent-primary)' : 'var(--bg-tertiary)',
                                    color: 'var(--text-primary)'
                                  }}>
                                    {cta.style}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Other Content Sections - Now properly rendered */}
                {Object.entries(page.content).filter(([key]) => key !== 'hero').map(([sectionKey, sectionValue]) => {
                  if (!sectionValue || typeof sectionValue !== 'object') return null;
                  
                  return (
                    <div key={sectionKey}>
                      <ContentSectionRenderer 
                        sectionKey={sectionKey} 
                        sectionValue={sectionValue} 
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Images */}
          {page.images && page.images.length > 0 && (
            <div>
              <h4 className="text-lg font-semibold silver-text mb-6 flex items-center gap-2">
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
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                Images ({page.images.length})
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {page.images.map((image) => (
                  <div key={image.id} className="card-metallic p-4">
                    <div className="aspect-video rounded mb-3 overflow-hidden" style={{ backgroundColor: 'var(--bg-quaternary)' }}>
                      <img 
                        src={image.imageUrl} 
                        alt={image.altText}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>
                    <div className="space-y-2">
                      <FieldDisplay label="Title" value={image.title} />
                      <FieldDisplay label="Alt Text" value={image.altText} />
                      <FieldDisplay label="Category" value={image.category} />
                      <FieldDisplay label="URL" value={image.imageUrl} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
