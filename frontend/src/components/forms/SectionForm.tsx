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
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold mb-6 text-gray-900">
          {getSectionTitle(sectionId)}
        </h3>
        
        {fields.map((field) => (
          <div key={field} className="mb-6">
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
