import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";
import { Metadata } from "next";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

interface Props {
  params: Promise<{ slug: string[] }>;
}

export default async function NotesPage({ params }: Props) {
  const queryClient = new QueryClient();

  const { slug } = await params;
  const rawTag = slug?.[0];
  const tag = rawTag === "all" ? undefined : rawTag;
  await queryClient.prefetchQuery({
    queryKey: ["note", slug],
    queryFn: () => fetchNotes(tag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const rawTag = slug?.[0];
  const tag = rawTag === "all" ? undefined : rawTag;

  return {
    title: `Notes filtered by:  ${tag}`,
    description: `Browse notes filtered by "${tag}" tag. Find relevant notes quickly.`,
    openGraph: {
      title: `Notes filtered by:  ${tag}`,
      description: `Browse notes filtered by "${tag}" tag. Find relevant notes quickly.`,
      url: "http://localhost:3000",
      images: [
        {
          url: "/notehub-og-meta.jpg",
          width: 1200,
          height: 600,
          alt: "image with app preview",
        },
      ],
      type: "article",
    },
  };
}
