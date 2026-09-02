export interface GalleryCase {
  slug: string;
  category: "Veneers" | "Whitening" | "Orthodontics" | "Implants";
  title: string;
  treatment: string;
  duration: string;
  beforeImage: string;
  afterImage: string;
}

export const GALLERY_CASES: GalleryCase[] = [
{
  slug: "case-01",
  category: "Veneers",
  title: "Chip repair & shade correction",
  treatment: "6 porcelain veneers",
  duration: "3 visits over 2 weeks",
  beforeImage: "/images/gallery/teeth-before-whitening.png",
  afterImage: "/images/gallery/teeth-after-whitening.png",
},
  {
    slug: "case-02",
  category: "Whitening",
  title: "12-year staining reversed",
  treatment: "In-studio + take-home whitening",
  duration: "1 visit + 2-week maintenance",
  beforeImage: "/images/gallery/case-02-before.png",
  afterImage: "/images/gallery/teeth-after-whitening.png",
  },
  {
    slug: "case-03",
    category: "Orthodontics",
    title: "Adult crowding correction",
    treatment: "Clear aligners",
    duration: "13 months",
    beforeImage: "/images/gallery/case-02-before.png",
    afterImage: "/images/gallery/whiteteeth.jpg",
  },
  {
    slug: "case-04",
    category: "Implants",
    title: "Single anterior implant",
    treatment: "Guided implant + crown",
    duration: "3 visits over 4 months",
     beforeImage: "/images/gallery/cavity.webp",
  afterImage: "/images/gallery/case-02-after.png"
  },
  {
    slug: "case-05",
    category: "Veneers",
    title: "Full smile design",
    treatment: "10 porcelain veneers",
    duration: "4 visits over 3 weeks",
     beforeImage: "/images/gallery/skewed.png",
  afterImage: "/images/gallery/braces.png"
  },
  {
    slug: "case-06",
    category: "Orthodontics",
    title: "Bite correction",
    treatment: "Clear aligners",
    duration: "17 months",
     beforeImage: "/images/gallery/case-02-before.png",
  afterImage: "/images/gallery/case-02-after.png"
  },
];

export const GALLERY_CATEGORIES = ["All", "Veneers", "Whitening", "Orthodontics", "Implants"] as const;
