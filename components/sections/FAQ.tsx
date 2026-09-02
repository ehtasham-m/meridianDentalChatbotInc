"use client";

import { useMemo, useState } from "react";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown, Search } from "lucide-react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FAQS } from "@/lib/constants/faq";
import type { FaqItem } from "@/types";

function groupByCategory(items: FaqItem[]) {
  return items.reduce<Record<string, FaqItem[]>>((acc, item) => {
    acc[item.category] = [...(acc[item.category] ?? []), item];
    return acc;
  }, {});
}

export function FAQ() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return FAQS;
    return FAQS.filter(
      (f) => f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q)
    );
  }, [query]);

  const grouped = groupByCategory(filtered);
  const categories = Object.keys(grouped);

  return (
    <SectionWrapper id="faq" tone="warm">
      <SectionHeading
        eyebrow="FAQ"
        title="Questions, answered directly."
        description="Can't find what you're after? Message us on WhatsApp and we'll answer personally."
        action={
          <div className="relative w-full max-w-xs">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-faint" />
            <label htmlFor="faq-search" className="sr-only">
              Search questions
            </label>
            <input
              id="faq-search"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search questions..."
              className="w-full rounded-full border border-line bg-warm-100 py-3 pl-11 pr-4 text-[14px] text-ink placeholder:text-ink-faint focus-visible:outline-none"
            />
          </div>
        }
      />

      {categories.length === 0 && (
        <p className="text-[15px] text-ink-muted">
          No questions match &quot;{query}&quot;. Try a different word.
        </p>
      )}

      <div className="flex flex-col gap-10">
        {categories.map((category) => (
          <div key={category}>
            <p className="eyebrow mb-4">{category}</p>
            <Accordion.Root type="multiple" className="flex flex-col divide-y divide-line rounded-xl2 border border-line bg-warm-100">
              {(grouped[category] ?? []).map((item) => (
                <Accordion.Item key={item.question} value={item.question} className="px-6">
                  <Accordion.Header>
                    <Accordion.Trigger className="group flex w-full items-center justify-between gap-4 py-5 text-left">
                      <span className="text-[15px] font-medium text-navy-700">{item.question}</span>
                      <ChevronDown
                        size={16}
                        className="shrink-0 text-ink-muted transition-transform duration-300 group-data-[state=open]:rotate-180"
                      />
                    </Accordion.Trigger>
                  </Accordion.Header>
                  <Accordion.Content className="overflow-hidden text-[14.5px] leading-relaxed text-ink-muted data-[state=open]:animate-in data-[state=open]:fade-in data-[state=closed]:animate-out data-[state=closed]:fade-out">
                    <p className="pb-5 pr-8">{item.answer}</p>
                  </Accordion.Content>
                </Accordion.Item>
              ))}
            </Accordion.Root>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
