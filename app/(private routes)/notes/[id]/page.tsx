import { fetchNoteById } from "@/lib/api/serverApi";
import NoteDetailsClient from "./NoteDetails.client";
import { Metadata } from "next";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

type NoteDetailsProps = {
  params: Promise<{ id: string }>;
};

export default async function NoteDetails({ params }: NoteDetailsProps) {
  const queryClient = new QueryClient();
  const { id } = await params;
  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
}

export async function generateMetadata({
  params,
}: NoteDetailsProps): Promise<Metadata> {
  const { id } = await params;
  const note = await fetchNoteById(id);

  return {
    title: `Note: ${note.title}`,
    description: note.content,
    openGraph: {
      title: `Note: ${note.title}`,
      description: note.content,
      url: `https://08-zustand-blush-eight.vercel.app/${id}`,
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
