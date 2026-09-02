export const SITE = {
  name: "smile360 Dental Studio",
  shortName: "smile360",
  tagline: "Precision dentistry, unhurried care.",
  descriptor:
    "A dental studio for people who want the best clinical outcome available, delivered without the clinical feeling.",
  founded: 2011,
  city: "Faisalabad",
  addressLine1: "14-C, MM Alam Road, Gulberg III",
  addressLine2: "Faisalabad, Punjab, Pakistan",
  phoneDisplay: "+92 42 3571 8890",
  phoneHref: "tel:+924235718890",
  whatsappDisplay: "+92 300 111 2233",
  whatsappHref: "https://wa.me/923001112233",
  email: "hello@smile360dental.pk",
  hours: [
    { days: "Monday – Friday", time: "9:00 AM – 8:00 PM" },
    { days: "Saturday", time: "10:00 AM – 6:00 PM" },
    { days: "Sunday", time: "By appointment only" },
  ],
  emergencyLine: "+92 300 999 8877",
  mapEmbedQuery: "MM Alam Road, Gulberg III, Faisalabad, Pakistan",
  social: {
    instagram: "https://instagram.com/smile360dental",
    facebook: "https://facebook.com/smile360dental",
    linkedin: "https://linkedin.com/company/smile360dental",
  },
  stats: {
    yearsOpen: 15,
    patientsTreated: 12400,
    satisfactionRate: 98,
    doctorsOnStaff: 4,
  },
} as const;
