import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BLOG_POSTS, BlogPost } from "@/lib/blog-data";
import { ArrowLeft, Clock, User, Calendar, Tag, AlertTriangle } from "lucide-react";
import SchemaMarkup from "@/components/SchemaMarkup";
import { getArticleSchema, getFAQSchema, getBreadcrumbSchema } from "@/lib/schema-utils";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static routing parameters for Next builds
export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const post = BLOG_POSTS.find((p) => p.slug === resolvedParams.slug);

  if (!post) {
    notFound();
  }

  // Schema generations
  const articleSchema = getArticleSchema({
    title: post.title,
    description: post.description,
    publishDate: post.publishDate,
    slug: post.slug,
    author: post.author,
    featuredImage: post.featuredImage,
  });

  const faqSchema = getFAQSchema(post.faq);

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "https://poweradda.com" },
    { name: "Insights Index", url: "https://poweradda.com/insights" },
    { name: post.title, url: `https://poweradda.com/insights/${post.slug}` }
  ]);

  // Related posts (randomly pick 2 other posts)
  const relatedPosts = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <div className="py-10 md:py-16 space-y-12">
      {/* Dynamic SEO Schemas */}
      <SchemaMarkup schema={articleSchema} />
      <SchemaMarkup schema={faqSchema} />
      <SchemaMarkup schema={breadcrumbSchema} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Back Link */}
        <Link
          href="/insights"
          className="inline-flex items-center space-x-1.5 text-xs font-mono font-bold uppercase tracking-wider text-slate-500 hover:text-emerald-600 transition-colors mb-8"
        >
          <ArrowLeft size={14} />
          <span>Back to Insights</span>
        </Link>

        {/* METADATA BLOCK */}
        <article className="space-y-6">
          <div className="space-y-3">
            <span className="bg-emerald-50 text-emerald-700 font-mono text-[10px] uppercase tracking-widest px-2.5 py-1 rounded font-bold border border-emerald-100">
              {post.category}
            </span>
            <h1 className="text-3xl md:text-4xl font-display font-extrabold text-slate-900 leading-[1.2]">
              {post.title}
            </h1>
            <p className="text-slate-500 text-sm md:text-base font-light italic leading-relaxed">
              {post.description}
            </p>
          </div>

          {/* AUTHOR META BAR */}
          <div className="flex flex-wrap items-center gap-4 py-4 border-y border-slate-100 text-xs text-slate-500 font-medium">
            <div className="flex items-center space-x-1.5">
              <User size={14} className="text-emerald-500" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <Calendar size={14} className="text-emerald-500" />
              <span>
                {new Date(post.publishDate).toLocaleDateString("en-IN", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
            <div className="flex items-center space-x-1.5">
              <Clock size={14} className="text-emerald-500" />
              <span>{post.readingTime}</span>
            </div>
          </div>

          {/* FEATURED PHOTO */}
          <div className="relative w-full h-[250px] md:h-[450px] bg-slate-100 rounded-2xl overflow-hidden shadow-md">
            <Image
              src={post.featuredImage}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-w-960px) 100vw, 80vw"
              priority
              referrerPolicy="no-referrer"
            />
          </div>

          {/* MAIN ARTICLE BODY EXTREMELY STYLED */}
          <div className="pt-4 font-sans text-xs md:text-[13px] text-slate-700 leading-relaxed font-light space-y-6 max-w-3xl">
            {post.content.split("\n\n").map((chunk, index) => {
              const trimmed = chunk.trim();
              if (!trimmed) return null;

              // Parse Headings
              if (trimmed.startsWith("### ")) {
                return (
                  <h3 key={index} className="text-lg font-display font-extrabold text-slate-800 pt-3">
                    {trimmed.replace("### ", "")}
                  </h3>
                );
              }
              if (trimmed.startsWith("#### ")) {
                return (
                  <h4 key={index} className="text-sm font-sans font-extrabold text-slate-800 uppercase tracking-widest pt-2">
                    {trimmed.replace("#### ", "")}
                  </h4>
                );
              }

              // Parse Bullet lists
              if (trimmed.startsWith("* ") || trimmed.startsWith("- ")) {
                const listItems = trimmed.split(/\n[*|-]\s+/);
                return (
                  <ul key={index} className="space-y-2 pl-4 list-disc text-slate-600">
                    {listItems.map((li, lIdx) => (
                      <li key={lIdx}>
                        {li.replace(/^[*|-]\s+/, "")}
                      </li>
                    ))}
                  </ul>
                );
              }

              // Parse Numbered lists (1. , 2.)
              if (/^\d+\.\s+/.test(trimmed)) {
                const items = trimmed.split(/\n\d+\.\s+/);
                return (
                  <ol key={index} className="space-y-2 pl-4 list-decimal text-slate-600">
                    {items.map((li, lIdx) => (
                      <li key={lIdx}>
                        {li.replace(/^\d+\.\s+/, "")}
                      </li>
                    ))}
                  </ol>
                );
              }

              return (
                <p key={index} className="whitespace-pre-line text-slate-600 font-light">
                  {trimmed}
                </p>
              );
            })}
          </div>

          {/* TAGS CLOUD */}
          <div className="flex flex-wrap gap-1.5 pt-8 border-t border-slate-100">
            {post.tags.map((tg) => (
              <span
                key={tg}
                className="inline-flex items-center text-[10px] font-mono tracking-wider font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded"
              >
                <Tag size={10} className="mr-1 text-emerald-600" />
                {tg}
              </span>
            ))}
          </div>
        </article>

        {/* FAQS SECTION SPECIFIC TO ARTICLE */}
        {post.faq && post.faq.length > 0 && (
          <section className="mt-16 space-y-6 pt-12 border-t border-slate-100 bg-slate-50 p-6 rounded-2xl">
            <h3 className="text-lg font-sans font-bold text-slate-800 uppercase tracking-wider">
              Post FAQ Support
            </h3>
            <div className="divide-y divide-slate-200">
              {post.faq.map((fq, idx) => (
                <div key={idx} className="py-4 first:pt-0 last:pb-0 space-y-1">
                  <h4 className="text-xs font-sans font-extrabold text-slate-900">
                    Question: {fq.question}
                  </h4>
                  <p className="text-xs text-slate-500 font-light leading-relaxed">
                    Answer: {fq.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* RELATED ARTICLES FOOTER */}
        <section className="mt-16 pt-12 border-t border-slate-100 space-y-6">
          <h2 className="text-base font-display font-extrabold text-slate-900 uppercase tracking-widest">
            Other Technical Commentary
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {relatedPosts.map((rPost) => (
              <Link
                key={rPost.id}
                href={`/insights/${rPost.slug}`}
                className="group bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <span className="text-[9px] font-mono tracking-wider bg-slate-100 text-slate-500 px-2 py-0.5 rounded font-bold uppercase">
                    {rPost.category}
                  </span>
                  <h3 className="text-sm font-sans font-bold text-slate-800 group-hover:text-emerald-600 transition-colors line-clamp-1">
                    {rPost.title}
                  </h3>
                  <p className="text-xs text-slate-500 font-light line-clamp-2 leading-relaxed">
                    {rPost.description}
                  </p>
                </div>
                <span className="text-[10px] font-mono font-bold text-slate-400 group-hover:text-emerald-600 transition-colors mt-4 block">
                  Read Article &rarr;
                </span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
