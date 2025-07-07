import NotesClient from "./Notes.client";
import { fetchNotes } from "@/lib/api";
import { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = slug[0] === "All" ? undefined : slug[0];
  const categotyKind = category || "All";
  const pageUrl = `https://08-zustand-lyart.vercel.app/notes/filter/{slug}/${categotyKind}`;

  return {
    title: `${category ? `${category}` : "All notes"}`,
    description: `Filtered by ${category || "All notes"}`,
    openGraph: {
      title: `${category ? `${category}` : "All notes"}`,
      description: `Filtered by ${category || "All notes"}`,
      url: pageUrl,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: `${category ? `${category}` : "All notes"}`,
        },
      ],
    },
  };
}

export default async function AppPage({ params }: Props) {
  const { slug } = await params;
  const category = slug[0] === "All" ? undefined : slug[0];
  const data = await fetchNotes("", 1, 9, category);

  return <NotesClient initialData={data} tag={category} />;
}