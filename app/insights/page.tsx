"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Flame, ArrowUpRight, Tag, BookOpen } from "lucide-react";
import { BLOG_POSTS, BlogPost } from "@/lib/blog-data";
import SchemaMarkup from "@/components/SchemaMarkup";
import { getBreadcrumbSchema } from "@/lib/schema-utils";

export default function InsightsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = useMemo(() => {
    const list = new Set(BLOG_POSTS.map((post) => post.category));
    return ["All", ...Array.from(list)];
  }, []);

  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter((post) => {
      const matchSearch =
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchCategory =
        selectedCategory === "All" || post.category === selectedCategory;

      return matchSearch && matchCategory;
    });
  }, [searchTerm, selectedCategory]);

  const featuredPost = useMemo(() => {
    // Just grab first post as featured
    return BLOG_POSTS[0];
  }, []);

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "https://poweradda.com" },
    { name: "Insights Panel", url: "https://poweradda.com/insights" }
  ]);

  return (
    <div className="space-y-16 md:space-y-24 py-10 md:py-16">
      <SchemaMarkup schema={breadcrumbSchema} />

      {/* HEADER INDEX */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 max-w-2xl">
        <span className="bg-emerald-50 text-emerald-700 font-mono text-xs uppercase tracking-widest px-3 py-1 rounded-full font-bold border border-emerald-100">
          Energy Intelligence
        </span>
        <h1 className="text-4xl md:text-5xl font-display font-extrabold text-slate-900 tracking-tight">
          Renewables & Storage Insights
        </h1>
        <p className="text-slate-600 text-sm md:text-base font-light leading-relaxed">
          Comprehensive analysis, regulatory guidance, and technological forecasts covering the future of clean energy, smart grids, and transport.
        </p>
      </section>

      {/* FILTER SEARCH AND CATEGORY BAR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
          {/* Search Field */}
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
            <input
              type="text"
              placeholder="Search solar, storage, battery trends..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-xs py-2.5 pl-10 pr-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all font-medium"
            />
          </div>

          {/* Category tabs */}
          <div className="flex flex-wrap gap-1.5 w-full md:w-auto items-center justify-start md:justify-end">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`py-1.5 px-3 rounded-lg text-[11px] font-bold uppercase tracking-wider transition-all border ${
                  selectedCategory === cat
                    ? "bg-emerald-600 border-emerald-600 text-white shadow-sm"
                    : "border-slate-100 bg-slate-50 text-slate-600 hover:bg-slate-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* BLOG GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-16 space-y-4 border border-dashed border-slate-200 rounded-3xl">
            <BookOpen size={48} className="text-slate-300 mx-auto" />
            <h3 className="text-lg font-sans font-bold text-slate-700">No Insights Found</h3>
            <p className="text-slate-500 text-xs font-light max-w-sm mx-auto">
              We couldn&apos;t find any articles matching your filters. Try adjusting your search query or select another category tab above.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <Link
                key={post.id}
                href={`/insights/${post.slug}`}
                className="group bg-white rounded-2xl border border-slate-100 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                <div>
                  <div className="relative w-full h-[200px] overflow-hidden">
                    <Image
                      src={post.featuredImage}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-w-710px) 100vw, 30vw"
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute top-3 left-3 bg-slate-900 text-white text-[10px] font-mono tracking-widest px-2.5 py-0.5 rounded uppercase">
                      {post.category}
                    </span>
                  </div>
                  
                  <div className="p-6 space-y-3">
                    <span className="block text-[10px] font-mono text-slate-400 font-medium">
                      📅 {new Date(post.publishDate).toLocaleDateString("en-IN", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                    <h2 className="text-base font-sans font-bold text-slate-800 group-hover:text-emerald-600 transition-colors line-clamp-2 leading-tight">
                      {post.title}
                    </h2>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed font-light">
                      {post.description}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-3 flex items-center justify-between text-[11px] font-mono font-bold text-slate-400 group-hover:text-emerald-600 border-t border-slate-100 mt-2">
                  <span>Author: {post.author.split(" ")[0]}</span>
                  <span className="flex items-center text-emerald-600">
                    Read Post &rarr;
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
