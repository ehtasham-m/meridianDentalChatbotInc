import { FunctionDeclaration, Type } from "@google/genai";
import { SITE } from "@/lib/constants/site";
import { SERVICES } from "@/lib/constants/services";
import { DOCTORS } from "@/lib/constants/doctors";
import { FAQS } from "@/lib/constants/faq";
import { PRICING_PLANS, PRICE_TABLE, FINANCING_NOTE, INSURANCE_NOTE } from "@/lib/constants/pricing";
import { createAppointmentRequest } from "@/lib/storage/appointments";
import { appointmentSchema } from "@/lib/schema";

export const aiFunctionDeclarations: FunctionDeclaration[] = [
  {
    name: "get_clinic_information",
    description: "Get general clinic information including name, tagline, address, phone, WhatsApp, emergency line, email, and clinic statistics.",
    parameters: {
      type: Type.OBJECT,
      properties: {},
    },
  },
  {
    name: "get_services",
    description: "Retrieve real dental services and treatments offered at smile360 Dental Studio, including pricing, procedure duration, and clinical benefits.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        query: {
          type: Type.STRING,
          description: "Optional keyword or treatment name to filter (e.g., 'whitening', 'implants', 'aligners', 'root canal', 'cleaning', 'pediatric').",
        },
      },
    },
  },
  {
    name: "get_doctors",
    description: "Retrieve the dentist profiles, qualifications, specialties, years of experience, and spoken languages for the clinicians at smile360 Dental Studio.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        specialty: {
          type: Type.STRING,
          description: "Optional specialty or doctor name to filter (e.g., 'orthodontist', 'implants', 'pediatric', 'prosthodontist', 'Ayesha', 'Bilal', 'Omar', 'Sana').",
        },
      },
    },
  },
  {
    name: "get_faqs",
    description: "Search frequently asked patient questions regarding appointments, insurance, procedures, pain management, and clinic policies.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        category: {
          type: Type.STRING,
          description: "Optional category: 'General', 'Appointments', 'Pricing & Insurance', or 'Treatments'.",
        },
        query: {
          type: Type.STRING,
          description: "Optional search keyword to match questions.",
        },
      },
    },
  },
  {
    name: "get_pricing",
    description: "Retrieve comprehensive pricing packages, individual procedure price ranges in PKR, 0% instalment plans, and insurance/corporate panel details.",
    parameters: {
      type: Type.OBJECT,
      properties: {},
    },
  },
  {
    name: "get_clinic_hours",
    description: "Retrieve the exact opening hours for smile360 Dental Studio by day of the week.",
    parameters: {
      type: Type.OBJECT,
      properties: {},
    },
  },
  {
    name: "get_location",
    description: "Retrieve the physical address, landmark directions, and location instructions for smile360 Dental Studio in Faisalabad.",
    parameters: {
      type: Type.OBJECT,
      properties: {},
    },
  },
  {
    name: "navigate_to_page",
    description: "Suggest navigation to an existing page or section on the smile360 website (e.g., '/appointment', '/#services', '/#doctors', '/#pricing', '/#contact', '/blog', '/#gallery').",
    parameters: {
      type: Type.OBJECT,
      properties: {
        path: {
          type: Type.STRING,
          description: "The exact relative path to navigate to. Allowed values: '/appointment', '/#services', '/#doctors', '/#pricing', '/#contact', '/#gallery', '/blog'.",
        },
        reason: {
          type: Type.STRING,
          description: "Brief reason for directing the user to this page.",
        },
      },
      required: ["path"],
    },
  },
  {
    name: "request_appointment",
    description: "Submit a real appointment request to the smile360 front desk. All required fields must be collected and confirmed with the patient first.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        name: {
          type: Type.STRING,
          description: "Full name of the patient (min 2 characters).",
        },
        phone: {
          type: Type.STRING,
          description: "Contact phone number in Pakistan format (e.g., 0300 1112233).",
        },
        email: {
          type: Type.STRING,
          description: "Patient's email address.",
        },
        service: {
          type: Type.STRING,
          description: "Treatment slug or name (e.g., 'preventive-general', 'smile-design', 'clear-aligners', 'dental-implants', 'root-canal', 'pediatric', 'whitening', 'full-mouth').",
        },
        doctor: {
          type: Type.STRING,
          description: "Doctor slug or preference (e.g., 'ayesha-raza', 'bilal-farooqi', 'omar-sheikh', 'sana-iqbal', or 'any').",
        },
        date: {
          type: Type.STRING,
          description: "Preferred appointment date (YYYY-MM-DD or descriptive date string).",
        },
        time: {
          type: Type.STRING,
          description: "Preferred time slot (e.g., '10:30 AM', '2:45 PM', '5:00 PM').",
        },
        notes: {
          type: Type.STRING,
          description: "Optional notes about symptoms, previous treatments, or special requests.",
        },
      },
      required: ["name", "phone", "email", "service", "doctor", "date", "time"],
    },
  },
];

export async function executeAiTool(
  name: string,
  args: Record<string, unknown>
): Promise<{ result: unknown; clientAction?: Record<string, unknown> }> {
  switch (name) {
    case "get_clinic_information": {
      return {
        result: {
          name: SITE.name,
          shortName: SITE.shortName,
          tagline: SITE.tagline,
          descriptor: SITE.descriptor,
          city: SITE.city,
          address: `${SITE.addressLine1}, ${SITE.addressLine2}`,
          phone: SITE.phoneDisplay,
          whatsapp: SITE.whatsappDisplay,
          email: SITE.email,
          emergencyLine: SITE.emergencyLine,
          stats: SITE.stats,
          hours: SITE.hours,
        },
      };
    }

    case "get_services": {
      const query = (args.query as string | undefined)?.toLowerCase().trim();
      let servicesList = SERVICES.map((s) => ({
        slug: s.slug,
        name: s.name,
        description: s.description,
        benefits: s.benefits,
        durationMinutes: s.durationMinutes,
        priceRange: `PKR ${s.priceFrom.toLocaleString()} – PKR ${s.priceTo.toLocaleString()}`,
        priceFrom: s.priceFrom,
        priceTo: s.priceTo,
      }));

      if (query) {
        servicesList = servicesList.filter(
          (s) =>
            s.name.toLowerCase().includes(query) ||
            s.description.toLowerCase().includes(query) ||
            s.slug.toLowerCase().includes(query)
        );
      }

      return { result: { count: servicesList.length, services: servicesList } };
    }

    case "get_doctors": {
      const specialty = (args.specialty as string | undefined)?.toLowerCase().trim();
      let doctorsList = DOCTORS.map((d) => ({
        slug: d.slug,
        name: d.name,
        title: d.title,
        credentials: d.credentials,
        experienceYears: d.experienceYears,
        languages: d.languages,
        focusAreas: d.focus,
        bio: d.bio,
      }));

      if (specialty) {
        doctorsList = doctorsList.filter(
          (d) =>
            d.name.toLowerCase().includes(specialty) ||
            d.title.toLowerCase().includes(specialty) ||
            d.focusAreas.some((f) => f.toLowerCase().includes(specialty)) ||
            d.slug.toLowerCase().includes(specialty)
        );
      }

      return { result: { count: doctorsList.length, doctors: doctorsList } };
    }

    case "get_faqs": {
      const category = (args.category as string | undefined)?.toLowerCase().trim();
      const query = (args.query as string | undefined)?.toLowerCase().trim();

      let items = FAQS;
      if (category) {
        items = items.filter((f) => f.category.toLowerCase().includes(category));
      }
      if (query) {
        items = items.filter(
          (f) =>
            f.question.toLowerCase().includes(query) ||
            f.answer.toLowerCase().includes(query)
        );
      }

      return {
        result: {
          count: items.length,
          faqs: items.map((f) => ({
            category: f.category,
            question: f.question,
            answer: f.answer,
          })),
        },
      };
    }

    case "get_pricing": {
      return {
        result: {
          currency: "PKR",
          individualProcedures: PRICE_TABLE,
          packages: PRICING_PLANS.map((p) => ({
            name: p.name,
            tagline: p.tagline,
            priceFrom: `PKR ${p.priceFrom.toLocaleString()}`,
            featured: !!p.featured,
            includes: p.includes,
          })),
          financing: FINANCING_NOTE,
          insurance: INSURANCE_NOTE,
        },
      };
    }

    case "get_clinic_hours": {
      return {
        result: {
          hours: SITE.hours,
          emergencyNote: "For dental emergencies outside regular hours, call our 24/7 emergency line: " + SITE.emergencyLine,
        },
      };
    }

    case "get_location": {
      return {
        result: {
          addressLine1: SITE.addressLine1,
          addressLine2: SITE.addressLine2,
          city: SITE.city,
          fullAddress: `${SITE.addressLine1}, ${SITE.addressLine2}`,
          directions: "Located in Gulberg III on MM Alam Road, Faisalabad.",
          contactPhone: SITE.phoneDisplay,
          whatsapp: SITE.whatsappDisplay,
        },
      };
    }

    case "navigate_to_page": {
      const validPaths = [
        "/appointment",
        "/#services",
        "/#doctors",
        "/#pricing",
        "/#contact",
        "/#gallery",
        "/blog",
      ];
      const rawPath = String(args.path || "/");
      const path = validPaths.includes(rawPath) ? rawPath : "/";
      return {
        result: { navigatedTo: path, reason: args.reason || "Directing patient" },
        clientAction: {
          type: "navigate",
          path,
          label: `Open ${path.replace("/#", "").replace("/", "") || "Home"}`,
        },
      };
    }

    case "request_appointment": {
      const parsed = appointmentSchema.safeParse({
        name: args.name,
        phone: args.phone,
        email: args.email,
        service: args.service,
        doctor: args.doctor,
        date: args.date,
        time: args.time,
        notes: args.notes || "",
      });

      if (!parsed.success) {
        return {
          result: {
            success: false,
            error: "Validation failed",
            issues: parsed.error.errors.map((e) => `${e.path.join(".")}: ${e.message}`),
          },
        };
      }

      const appointment = await createAppointmentRequest(parsed.data);

      return {
        result: {
          success: true,
          appointmentId: appointment.id,
          status: "received",
          patientName: appointment.name,
          service: appointment.service,
          doctor: appointment.doctor,
          date: appointment.date,
          time: appointment.time,
          message:
            "The appointment request has been recorded in our system. The front desk will call within one business day to confirm the slot.",
        },
        clientAction: {
          type: "appointment_received",
          appointmentId: appointment.id,
          details: {
            name: appointment.name,
            service: appointment.service,
            doctor: appointment.doctor,
            date: appointment.date,
            time: appointment.time,
          },
        },
      };
    }

    default:
      return {
        result: { error: `Unknown tool name: ${name}` },
      };
  }
}
