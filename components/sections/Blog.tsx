"use client";

import { motion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";
import Link from "next/link";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { BLOG_POSTS } from "@/lib/constants/blog";

export function Blog() {
  return (
    <SectionWrapper id="blog" tone="surface">
      <SectionHeading
        eyebrow="Blog"
        title="Field notes from the studio."
        description="Straight answers to the questions patients ask most in consultation."
        action={
          <Link
            href="/blog"
            className="flex items-center gap-1.5 text-[14px] font-medium text-navy-700"
          >
            View all articles
            <ArrowRight size={14} />
          </Link>
        }
      />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {BLOG_POSTS.map((post, i) => (
          <motion.div
            key={post.slug}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link
              href="/blog"
              className="group flex h-full flex-col rounded-xl2 border border-line bg-warm-100 p-7 transition-all duration-400 ease-premium hover:-translate-y-1.5 hover:shadow-card-hover"
            >
              <Badge variant="mint" className="w-fit">
                {post.category}
              </Badge>
              <h3 className="mt-4 font-display text-[18px] font-medium leading-snug text-navy-700">
                {post.title}
              </h3>
              <p className="mt-3 flex-1 text-[14px] leading-relaxed text-ink-muted">
                {post.excerpt}
              </p>
              <div className="mt-6 flex items-center justify-between border-t border-line pt-5">
                <span className="flex items-center gap-1.5 text-[12.5px] text-ink-muted">
                  <Clock size={12} />
                  {post.readMinutes} min read
                </span>
                <ArrowRight
                  size={15}
                  className="text-navy-700 transition-transform duration-300 group-hover:translate-x-1"
                />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
