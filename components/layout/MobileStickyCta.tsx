import { Phone, CalendarCheck } from "lucide-react";
import { SITE } from "@/lib/constants/site";
import { Button } from "@/components/ui/Button";

export function MobileStickyCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 flex gap-3 border-t border-line bg-warm-100/95 p-3 backdrop-blur-lg lg:hidden [padding-bottom:max(0.75rem,env(safe-area-inset-bottom))]">
      <a
        href={SITE.phoneHref}
        className="flex h-12 flex-1 items-center justify-center gap-2 rounded-full border border-navy-700/15 text-[14px] font-medium text-navy-700"
      >
        <Phone size={16} />
        Call
      </a>
      <Button href="/appointment" className="flex-[1.6]">
        <CalendarCheck size={16} />
        Book Appointment
      </Button>
    </div>
  );
}
