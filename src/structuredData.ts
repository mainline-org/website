export const siteUrl = "https://mainline.sh";

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Mainline",
  url: siteUrl,
  email: "hello@mainline.sh",
  sameAs: [
    "https://github.com/mainline-org/mainline",
    "https://github.com/mainline-org/website",
  ],
};

export const softwareJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Mainline",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "macOS, Linux",
  url: siteUrl,
  codeRepository: "https://github.com/mainline-org/mainline",
  author: {
    "@type": "Organization",
    name: "Mainline",
    url: siteUrl,
  },
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  description:
    "Mainline is Git-native memory for coding agents. It gives AI coding agents repo memory before they edit code: abandoned approaches, superseded decisions, reviewer constraints, risks, and in-flight work.",
};

export function webPageJsonLd(input: {
  title: string;
  description: string;
  path: string;
  type?: "WebPage" | "CollectionPage" | "FAQPage";
}) {
  return {
    "@context": "https://schema.org",
    "@type": input.type ?? "WebPage",
    name: input.title,
    description: input.description,
    url: new URL(input.path, siteUrl).toString(),
    isPartOf: {
      "@type": "WebSite",
      name: "Mainline",
      url: siteUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "Mainline",
      url: siteUrl,
    },
  };
}

export function blogPostingJsonLd(input: {
  title: string;
  description: string;
  path: string;
  publishDate?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: input.title,
    description: input.description,
    datePublished: input.publishDate,
    dateModified: input.publishDate,
    url: new URL(input.path, siteUrl).toString(),
    author: {
      "@type": "Organization",
      name: "Mainline",
      url: siteUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "Mainline",
      url: siteUrl,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": new URL(input.path, siteUrl).toString(),
    },
  };
}
