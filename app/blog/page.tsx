import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog Fitness Maison — Conseils & Équipements",
  description: "Découvrez nos guides fitness, conseils entraînement et comparatifs équipements pour votre salle de sport maison.",
  alternates: { canonical: "https://fitnessmaison.fr/blog" },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-2">Blog Fitness Maison</h1>
      <p className="text-zinc-500 mb-10">Guides, comparatifs et conseils pour s&apos;entraîner chez soi.</p>
      {posts.length === 0 ? (
        <p className="text-zinc-400">Aucun article pour le moment.</p>
      ) : (
        <ul className="flex flex-col gap-8">
          {posts.map((post) => (
            <li key={post.slug} className="border-b border-zinc-100 pb-8">
              <Link href={`/blog/${post.slug}`} className="group">
                {post.image && (
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                )}
                <h2 className="text-xl font-semibold group-hover:text-emerald-600 transition-colors mb-1">
                  {post.title}
                </h2>
                <p className="text-sm text-zinc-400 mb-2">{post.date}</p>
                <p className="text-zinc-600">{post.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
