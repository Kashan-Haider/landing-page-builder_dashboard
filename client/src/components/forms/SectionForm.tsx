import React from 'react';
import { LANDING_PAGE_FIELDS, getNestedValue } from '../../types/field-definitions';
import { StandaloneDynamicField } from './DynamicField';

interface SectionFormProps {
  sectionId: string;
  fields: string[];
  data: any;
  onChange: (path: string, value: any) => void;
}

export const SectionForm: React.FC<SectionFormProps> = ({
  sectionId,
  fields,
  data,
  onChange
}) => {
  const renderFieldGroup = (fieldPath: string) => {
    const fieldDef = LANDING_PAGE_FIELDS[fieldPath];
    if (!fieldDef) return null;

    return (
      <StandaloneDynamicField
        key={fieldPath}
        definition={fieldDef}
        path={fieldPath}
        value={getNestedValue(data, fieldPath)}
        onChange={(value) => onChange(fieldPath, value)}
        parentData={data}
      />
    );
  };

  const getSectionTitle = (sectionId: string) => {
    const titleMap: Record<string, string> = {
      basic: 'Basic Information',
      hero: 'Hero Section',
      about: 'About Section',
      services: 'Services',
      gallery: 'Gallery',
      testimonials: 'Testimonials',
      faq: 'FAQ',
      contact: 'Business Contact',
      theme: 'Theme & Styling',
      seo: 'SEO Settings',
      serviceArea: 'Service Areas',
      businessDetails: 'Business Details',
      companyOverview: 'Company Overview',
      serviceHighlights: 'Service Highlights',
      preFooter: 'Pre-Footer',
      footer: 'Footer'
    };
    
    return titleMap[sectionId] || sectionId.replace(/([A-Z])/g, ' $1').trim();
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-3xl font-bold mb-8 text-slate-100 flex items-center gap-3">
          <div className="w-2 h-8 bg-blue-500 rounded-full"></div>
          {getSectionTitle(sectionId)}
        </h3>
        
        {fields.map((field) => (
          <div key={field} className="mb-8">
            {renderFieldGroup(field)}
          </div>
        ))}
      </div>
    </div>
  );
};

// Specialized section components for complex nested data
interface NestedSectionProps {
  data: any;
  onChange: (path: string, value: any) => void;
}

export const HeroSectionsForm: React.FC<NestedSectionProps> = ({
  data,
  onChange
}) => {
  const fieldDef = LANDING_PAGE_FIELDS['heroSections'];
  if (!fieldDef || fieldDef.type !== 'array-object') return null;

  return (
    <StandaloneDynamicField
      definition={fieldDef}
      path="heroSections"
      value={data}
      onChange={(value) => onChange('heroSections', value)}
    />
  );
};

export const ServicesSectionsForm: React.FC<NestedSectionProps> = ({
  data,
  onChange
}) => {
  const fieldDef = LANDING_PAGE_FIELDS['servicesSections'];
  if (!fieldDef || fieldDef.type !== 'array-object') return null;

  return (
    <StandaloneDynamicField
      definition={fieldDef}
      path="servicesSections"
      value={data}
      onChange={(value) => onChange('servicesSections', value)}
    />
  );
};

export const BusinessContactForm: React.FC<NestedSectionProps> = ({
  data,
  onChange
}) => {
  const contactFields = [
    'businessContact.businessName',
    'businessContact.phone',
    'businessContact.emergencyPhone',
    'businessContact.email',
    'businessContact.emergencyEmail',
    'businessContact.street',
    'businessContact.city',
    'businessContact.state',
    'businessContact.zipCode',
    'businessContact.latitude',
    'businessContact.longitude',
    'businessContact.businessHours'
  ];

  return (
    <div className="space-y-4">
      {contactFields.map((fieldPath) => {
        const fieldDef = LANDING_PAGE_FIELDS[fieldPath];
        if (!fieldDef) return null;

        return (
          <StandaloneDynamicField
            key={fieldPath}
            definition={fieldDef}
            path={fieldPath}
            value={getNestedValue(data, fieldPath)}
            onChange={(value) => onChange(fieldPath, value)}
            parentData={data}
          />
        );
      })}
    </div>
  );
};

export const ImagePoolForm: React.FC<NestedSectionProps> = ({
  data,
  onChange
}) => {
  const imagePool = data?.imagePool || { name: '', description: '', images: [] };
  
  const addImage = () => {
    const newImage = {
      id: `img-${Date.now()}`,
      imageId: '',
      title: '',
      altText: '',
      image: ''
    };
    const updatedImages = [...(imagePool.images || []), newImage];
    onChange('imagePool.images', updatedImages);
  };
  
  const removeImage = (index: number) => {
    const updatedImages = imagePool.images.filter((_: any, i: number) => i !== index);
    onChange('imagePool.images', updatedImages);
  };
  
  const updateImage = (index: number, field: string, value: string) => {
    const updatedImages = [...imagePool.images];
    updatedImages[index] = { ...updatedImages[index], [field]: value };
    onChange('imagePool.images', updatedImages);
  };
  
  return (
    <div className="space-y-6">
      <h3 className="text-3xl font-bold mb-8 text-slate-100 flex items-center gap-3">
        <div className="w-2 h-8 bg-purple-500 rounded-full"></div>
        Image Pool
      </h3>
      
      {/* Pool Basic Info */}
      <div className="space-y-4 mb-8">
        <div>
          <label className="block text-sm font-medium text-slate-200 mb-2">
            Pool Name
          </label>
          <input
            type="text"
            value={imagePool.name || ''}
            onChange={(e) => onChange('imagePool.name', e.target.value)}
            className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter pool name"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-200 mb-2">
            Description (Optional)
          </label>
          <textarea
            value={imagePool.description || ''}
            onChange={(e) => onChange('imagePool.description', e.target.value)}
            className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows={3}
            placeholder="Describe this image pool"
          />
        </div>
      </div>
      
      {/* Images Section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-xl font-semibold text-slate-100">
            Images ({imagePool.images?.length || 0})
          </h4>
          <button
            type="button"
            onClick={addImage}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add Image
          </button>
        </div>
        
        <div className="space-y-4">
          {imagePool.images?.map((image: any, index: number) => (
            <div key={image.id || index} className="p-6 bg-slate-700 border border-slate-600 rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <h5 className="font-medium text-slate-100">Image {index + 1}</h5>
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="text-red-400 hover:text-red-300 p-1"
                  title="Remove image"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-200 mb-2">
                    Image ID
                  </label>
                  <input
                    type="text"
                    value={image.imageId || ''}
                    onChange={(e) => updateImage(index, 'imageId', e.target.value)}
                    className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter image ID"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-200 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={image.title || ''}
                    onChange={(e) => updateImage(index, 'title', e.target.value)}
                    className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter image title"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-200 mb-2">
                    Alt Text
                  </label>
                  <input
                    type="text"
                    value={image.altText || ''}
                    onChange={(e) => updateImage(index, 'altText', e.target.value)}
                    className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter alt text for accessibility"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-200 mb-2">
                    Image URL
                  </label>
                  <input
                    type="url"
                    value={image.image || ''}
                    onChange={(e) => updateImage(index, 'image', e.target.value)}
                    className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter image URL"
                  />
                </div>
              </div>
              
              {/* Image Preview */}
              {image.image && (
                <div className="mt-4">
                  <label className="block text-sm font-medium text-slate-200 mb-2">
                    Preview
                  </label>
                  <img 
                    src={image.image} 
                    alt={image.altText || image.title} 
                    className="max-w-full h-32 object-cover rounded border border-slate-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                </div>
              )}
            </div>
          ))}
          
          {(!imagePool.images || imagePool.images.length === 0) && (
            <div className="text-center py-12 bg-slate-700/50 border border-slate-600 rounded-lg border-dashed">
              <svg className="mx-auto h-12 w-12 text-slate-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-slate-300 mb-2">No images in this pool yet</p>
              <p className="text-slate-400 text-sm">Click "Add Image" to start building your image pool</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const ServiceAreasForm: React.FC<NestedSectionProps> = ({
  data,
  onChange
}) => {
  const serviceAreas = data?.serviceAreas || [];
  
  const addServiceArea = () => {
    const newServiceArea = {
      id: `area-${Date.now()}`,
      city: '',
      region: '',
      description: ''
    };
    const updatedServiceAreas = [...serviceAreas, newServiceArea];
    onChange('serviceAreas', updatedServiceAreas);
  };
  
  const removeServiceArea = (index: number) => {
    const updatedServiceAreas = serviceAreas.filter((_: any, i: number) => i !== index);
    onChange('serviceAreas', updatedServiceAreas);
  };
  
  const updateServiceArea = (index: number, field: string, value: string) => {
    const updatedServiceAreas = [...serviceAreas];
    updatedServiceAreas[index] = { ...updatedServiceAreas[index], [field]: value };
    onChange('serviceAreas', updatedServiceAreas);
  };
  
  return (
    <div className="space-y-6">
      <h3 className="text-3xl font-bold mb-8 text-slate-100 flex items-center gap-3">
        <div className="w-2 h-8 bg-yellow-500 rounded-full"></div>
        Service Areas
      </h3>
      
      <div>
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-xl font-semibold text-slate-100">
            Areas ({serviceAreas.length})
          </h4>
          <button
            type="button"
            onClick={addServiceArea}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add Service Area
          </button>
        </div>
        
        <div className="space-y-4">
          {serviceAreas.map((serviceArea: any, index: number) => (
            <div key={serviceArea.id || index} className="p-6 bg-slate-700 border border-slate-600 rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <h5 className="font-medium text-slate-100">Service Area {index + 1}</h5>
                <button
                  type="button"
                  onClick={() => removeServiceArea(index)}
                  className="text-red-400 hover:text-red-300 p-1"
                  title="Remove service area"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-200 mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    value={serviceArea.city || ''}
                    onChange={(e) => updateServiceArea(index, 'city', e.target.value)}
                    className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter city name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-200 mb-2">
                    Region
                  </label>
                  <input
                    type="text"
                    value={serviceArea.region || ''}
                    onChange={(e) => updateServiceArea(index, 'region', e.target.value)}
                    className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter region name"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-200 mb-2">
                    Description
                  </label>
                  <textarea
                    value={serviceArea.description || ''}
                    onChange={(e) => updateServiceArea(index, 'description', e.target.value)}
                    className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    rows={3}
                    placeholder="Describe the service area coverage"
                  />
                </div>
              </div>
            </div>
          ))}
          
          {serviceAreas.length === 0 && (
            <div className="text-center py-12 bg-slate-700/50 border border-slate-600 rounded-lg border-dashed">
              <svg className="mx-auto h-12 w-12 text-slate-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <p className="text-slate-300 mb-2">No service areas defined yet</p>
              <p className="text-slate-400 text-sm">Click "Add Service Area" to start defining your coverage areas</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const SocialLinksForm: React.FC<NestedSectionProps> = ({
  data,
  onChange
}) => {
  const socialLink = data?.socialLink || { name: 'Social Links Group', socialPlatforms: [] };
  const socialPlatforms = socialLink.socialPlatforms || [];
  
  const addSocialPlatform = () => {
    const newPlatform = {
      id: `platform-${Date.now()}`,
      platform: '',
      url: ''
    };
    const updatedPlatforms = [...socialPlatforms, newPlatform];
    onChange('socialLink', { 
      ...socialLink, 
      socialPlatforms: updatedPlatforms 
    });
  };
  
  const removeSocialPlatform = (index: number) => {
    const updatedPlatforms = socialPlatforms.filter((_: any, i: number) => i !== index);
    onChange('socialLink', { 
      ...socialLink, 
      socialPlatforms: updatedPlatforms 
    });
  };
  
  const updateSocialPlatform = (index: number, field: string, value: string) => {
    const updatedPlatforms = [...socialPlatforms];
    updatedPlatforms[index] = { ...updatedPlatforms[index], [field]: value };
    onChange('socialLink', { 
      ...socialLink, 
      socialPlatforms: updatedPlatforms 
    });
  };

  const updateSocialLinkName = (name: string) => {
    onChange('socialLink', { 
      ...socialLink, 
      name 
    });
  };
  
  const platformOptions = [
    { value: 'facebook', label: 'Facebook' },
    { value: 'twitter', label: 'Twitter' },
    { value: 'instagram', label: 'Instagram' },
    { value: 'linkedin', label: 'LinkedIn' },
    { value: 'youtube', label: 'YouTube' },
    { value: 'tiktok', label: 'TikTok' },
    { value: 'pinterest', label: 'Pinterest' },
    { value: 'snapchat', label: 'Snapchat' },
    { value: 'discord', label: 'Discord' },
    { value: 'telegram', label: 'Telegram' },
  ];
  
  return (
    <div className="space-y-6">
      <h3 className="text-3xl font-bold mb-8 text-slate-100 flex items-center gap-3">
        <div className="w-2 h-8 bg-blue-500 rounded-full"></div>
        Social Links
      </h3>
      
      {/* Social Links Group Name */}
      <div className="space-y-4 mb-8">
        <div>
          <label className="block text-sm font-medium text-slate-200 mb-2">
            Social Links Group Name
          </label>
          <input
            type="text"
            value={socialLink.name || ''}
            onChange={(e) => updateSocialLinkName(e.target.value)}
            className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g., Main Social Links, Footer Links, etc."
          />
        </div>
      </div>
      
      <div>
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-xl font-semibold text-slate-100">
            Social Platforms ({socialPlatforms.length})
          </h4>
          <button
            type="button"
            onClick={addSocialPlatform}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add Social Platform
          </button>
        </div>
        
        <div className="space-y-4">
          {socialPlatforms.map((platform: any, index: number) => (
            <div key={platform.id || index} className="p-6 bg-slate-700 border border-slate-600 rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <h5 className="font-medium text-slate-100">Social Platform {index + 1}</h5>
                <button
                  type="button"
                  onClick={() => removeSocialPlatform(index)}
                  className="text-red-400 hover:text-red-300 p-1"
                  title="Remove social platform"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-200 mb-2">
                    Platform
                  </label>
                  <select
                    value={platform.platform || ''}
                    onChange={(e) => updateSocialPlatform(index, 'platform', e.target.value)}
                    className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded text-slate-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select Platform</option>
                    {platformOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-200 mb-2">
                    URL
                  </label>
                  <input
                    type="url"
                    value={platform.url || ''}
                    onChange={(e) => updateSocialPlatform(index, 'url', e.target.value)}
                    className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="https://..."
                  />
                </div>
              </div>
              
              {/* Platform Preview */}
              {platform.platform && platform.url && (
                <div className="mt-4 p-3 bg-slate-800 rounded border border-slate-500">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-blue-500 rounded"></div>
                    <span className="text-slate-300 text-sm capitalize">{platform.platform}</span>
                    <span className="text-slate-500 text-sm">→</span>
                    <a 
                      href={platform.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-blue-400 text-sm hover:text-blue-300 truncate"
                    >
                      {platform.url}
                    </a>
                  </div>
                </div>
              )}
            </div>
          ))}
          
          {socialPlatforms.length === 0 && (
            <div className="text-center py-12 bg-slate-700/50 border border-slate-600 rounded-lg border-dashed">
              <svg className="mx-auto h-12 w-12 text-slate-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
              <p className="text-slate-300 mb-2">No social platforms added yet</p>
              <p className="text-slate-400 text-sm">Click "Add Social Platform" to start building your social media presence</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
