import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { BLOG_POSTS } from "@/lib/constants/blog";
import { SITE } from "@/lib/constants/site";

export const metadata: Metadata = {
  title: "Blog",
  description: `Dental care articles from the clinicians at ${SITE.name}.`,
};

export default function BlogPage() {
  return (
    <div className="bg-warm pb-24 pt-36 md:pt-44">
      <div className="container-content max-w-4xl">
        <Link
          href="/"
          className="mb-8 flex w-fit items-center gap-2 text-[13.5px] font-medium text-ink-muted transition hover:text-navy-700"
        >
          <ArrowLeft size={14} />
          Back to home
        </Link>
        <span className="eyebrow mb-4 block">Blog</span>
        <h1 className="font-display text-[clamp(2rem,1.5rem+2vw,3rem)] font-medium leading-[1.1] tracking-tightest text-navy-700">
          Field notes from the studio.
        </h1>
        <p className="mt-4 max-w-lg text-[16px] leading-relaxed text-ink-muted">
          Straight answers to the questions patients ask most in consultation.
        </p>

        <div className="mt-14 flex flex-col divide-y divide-line border-t border-line">
          {BLOG_POSTS.map((post) => (
            <article key={post.slug} className="flex flex-col gap-3 py-8 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
              <div>
                <Badge variant="mint" className="w-fit">
                  {post.category}
                </Badge>
                <h2 className="mt-3 font-display text-[20px] font-medium text-navy-700">
                  {post.title}
                </h2>
                <p className="mt-2 max-w-xl text-[14.5px] leading-relaxed text-ink-muted">
                  {post.excerpt}
                </p>
              </div>
              <span className="flex shrink-0 items-center gap-1.5 text-[12.5px] text-ink-muted">
                <Clock size={12} />
                {post.readMinutes} min read
              </span>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
