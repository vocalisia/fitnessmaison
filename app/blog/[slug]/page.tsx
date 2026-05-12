import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllSlugs, getPostBySlug } from "@/lib/blog";

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  try {
    const { slug } = await params;
    const { meta } = getPostBySlug(slug);
    return {
      title: meta.title,
      description: meta.description,
      alternates: { canonical: `https://fitnessmaison.fr/blog/${slug}` },
      openGraph: {
        title: meta.title,
        description: meta.description,
        type: "article",
        publishedTime: meta.date,
        images: meta.image ? [meta.image] : [],
      },
    };
  } catch {
    return {};
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let meta, content;
  try {
    ({ meta, content } = getPostBySlug(slug));
  } catch {
    notFound();
  }

  return (
    <main className="max-w-2xl mx-auto px-4 py-16">
      <Link href="/blog" className="text-sm text-emerald-600 hover:underline mb-8 block">
        ← Tous les articles
      </Link>
      {meta!.image && (
        <img
          src={meta!.image}
          alt={meta!.title}
          className="w-full h-64 object-cover rounded-xl mb-8"
        />
      )}
      <h1 className="text-3xl font-bold mb-3">{meta!.title}</h1>
      <p className="text-sm text-zinc-400 mb-8">{meta!.date}</p>
      <article className="prose prose-zinc max-w-none">
        <MDXRemote source={content!} />
      </article>
    </main>
  );
}
