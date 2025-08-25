import React from "react";
import type { LandingPage } from "../../../types/landingPageDataTypes";
import { FieldDisplay } from "../../shared/FieldDisplay";

interface ImagesDisplayProps {
  images: LandingPage["images"];
}

export const ImagesDisplay: React.FC<ImagesDisplayProps> = ({ images }) => {
  if (!images?.length) return null;

  return (
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
        Images ({images.length})
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {images.map((image) => (
          <div key={image.id} className="card-metallic p-4">
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
  );
};
