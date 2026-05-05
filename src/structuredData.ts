export const siteUrl = "https://mainline.sh";

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Mainline",
  url: siteUrl,
  logo: new URL("/mainline_logo.svg", siteUrl).toString(),
  email: "hello@mainline.sh",
  sameAs: [
    "https://github.com/mainline-org/mainline",
    "https://github.com/mainline-org/website",
  ],
};

export const webSiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Mainline",
  alternateName: "Mainline.sh",
  url: siteUrl,
  inLanguage: "en",
  description:
    "Mainline gives AI coding agents Git-native repo memory before edits: prior decisions, abandoned approaches, risks, and reviewer constraints.",
  keywords: [
    "coding agent memory",
    "repo memory for AI agents",
    "Git-native memory for coding agents",
    "engineering intent memory",
    "agent context protocol",
  ],
  publisher: {
    "@type": "Organization",
    name: "Mainline",
    url: siteUrl,
  },
  about: [
    { "@type": "Thing", name: "coding agent memory" },
    { "@type": "Thing", name: "repo memory for AI agents" },
    { "@type": "Thing", name: "engineering intent memory" },
  ],
};

export const softwareJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Mainline",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "macOS, Linux",
  url: siteUrl,
  image: new URL("/mainline_logo.svg", siteUrl).toString(),
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
  keywords:
    "coding agent memory, repo memory for AI agents, Git-native memory, engineering intent memory, agent context protocol",
  description:
    "Mainline gives AI coding agents Git-native repo memory before edits: prior decisions, abandoned approaches, risks, and reviewer constraints.",
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
