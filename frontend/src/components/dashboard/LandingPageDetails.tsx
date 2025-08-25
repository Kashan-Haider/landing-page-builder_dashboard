import React from "react";
import type { LandingPage } from "../../types/landingPageDataTypes";
import { BasicInfoDisplay } from "./sections/BasicInfoDisplay";
import { SeoDataDisplay } from "./sections/SeoDataDisplay";
import { ThemeDataDisplay } from "./sections/ThemeDataDisplay";
import { BusinessDataDisplay } from "./sections/BusinessDataDisplay";
import { ContentDisplay } from "./sections/ContentDisplay";
import { ImagesDisplay } from "./sections/ImagesDisplay";

interface LandingPageDetailsProps {
  page: LandingPage;
}

export const LandingPageDetails: React.FC<LandingPageDetailsProps> = ({ page }) => {
  return (
    <div className="card-metallic max-h-full overflow-y-auto">
      <div className="px-6 py-6">
        <div className="space-y-8">
          <BasicInfoDisplay page={page} />
          <SeoDataDisplay seoData={page.seoData} />
          <ThemeDataDisplay themeData={page.themeData} />
          <BusinessDataDisplay businessData={page.businessData} />
          <ContentDisplay content={page.content} />
          <ImagesDisplay images={page.images} />
        </div>
      </div>
    </div>
  );
};
