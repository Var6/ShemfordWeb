export interface SchemaMarkupProps {
  type: "Organization" | "LocalBusiness" | "EducationalOrganization";
  data: Record<string, any>;
}

export function generateSchemaMarkup(props: SchemaMarkupProps): string {
  const { type, data } = props;

  const baseSchema = {
    "@context": "https://schema.org",
    "@type": type,
    name: "Shemford Futuristic School",
    url: "https://shemford.edu",
    logo: "https://shemford.edu/assets/logo.png",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      telephone: "+91-XXXX-XXXX-7X",
      email: "admin@shemford.edu",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "Jaganpur",
      addressLocality: "Patna",
      addressRegion: "Bihar",
      postalCode: "800025",
      addressCountry: "IN",
    },
    sameAs: [
      "https://facebook.com/shemford",
      "https://twitter.com/shemford",
      "https://instagram.com/shemford",
    ],
    ...data,
  };

  return JSON.stringify(baseSchema);
}

export const ORG_SCHEMA = {
  type: "Organization" as const,
  data: {
    description:
      "Shemford Futuristic School - Premier CBSE school in Patna, Bihar providing quality education with modern facilities",
    foundingDate: "2010",
    knowsAbout: [
      "Education",
      "CBSE Curriculum",
      "Student Development",
      "Technology",
    ],
  },
};

export const LOCAL_BUSINESS_SCHEMA = {
  type: "LocalBusiness" as const,
  data: {
    priceRange: "Rs. 100000 - Rs. 300000",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "07:30",
        closes: "15:30",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "08:00",
        closes: "13:00",
      },
    ],
  },
};

export const EDUCATIONAL_ORG_SCHEMA = {
  type: "EducationalOrganization" as const,
  data: {
    educationalLevel: ["Pre-Primary", "Primary", "Secondary", "Higher Secondary"],
    areaServed: "Patna, Bihar, India",
    curriculumCategory: "CBSE",
    potentialAction: {
      "@type": "EnrollAction",
      target: "https://shemford.edu/contact",
    },
  },
};
