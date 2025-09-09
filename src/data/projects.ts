export type Project = {
  title: string;
  slug: string;
  tagline: string;
  year?: string;
  links?: { label: string; href: string }[];
};

export const projects: Project[] = [
  {
    title: "KrishiGPT",
    slug: "krishigpt",
    tagline: "AI advisory for agri stakeholders (B2B & retail)",
    year: "2025",
    links: [{ label: "Live", href: "https://agrikunba.vercel.app" }],
  },
  {
    title: "Dhoorvi™",
    slug: "dhoorvi",
    tagline: "Sustainable D2C brand (teas, herbal & eco care)",
    year: "2024",
    links: [{ label: "Store", href: "#" }],
  },
];
