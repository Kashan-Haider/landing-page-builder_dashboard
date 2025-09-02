import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SimpleCmsForm } from '../components/forms/SimpleCmsForm';
import { usePageGenerator } from '../hooks/usePageGenerator';

const CreateLandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { generatePage, isLoading } = usePageGenerator();

  const handleSave = async (formData: { businessName: string; templateId: string; githubUrl: string }) => {
    try {
      const createdPage = await generatePage(formData);
      console.log('Landing page created successfully:', createdPage);
      
      // Navigate back to dashboard after successful creation
      navigate('/', { 
        state: { 
          message: `Landing page "${formData.businessName}" created successfully!`,
          pageId: createdPage.id 
        }
      });
    } catch (error) {
      console.error('Error creating landing page:', error);
      throw error; // Let the form handle the error display
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <SimpleCmsForm
      onSave={handleSave}
      onCancel={handleCancel}
      isLoading={isLoading}
    />
  );
};

export default CreateLandingPage;
