"use client";

import { fetchNotes } from "@/lib/api";
import NoteList from "@/components/NoteList/NoteList";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useDebouncedCallback } from "use-debounce";
import css from "./Notes.client.module.css";
import Loader from "@/app/loading";
import { useRouter } from "next/navigation";

type Props = {
  tag: string | undefined;
};

export default function NotesClient({ tag }: Props) {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const perPage = 12;

  const debouncedSearch = useDebouncedCallback((value: string) => {
    setQuery(value);
    setPage(1);
  }, 500);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", tag, page, query],
    queryFn: () => fetchNotes(query, page, perPage, tag),
    placeholderData: keepPreviousData,
  });

  const totalPages = data?.totalPages || 0;
  const notes = data?.notes || [];
  function handleChangePage(newPage: number) {
    setPage(newPage);
  }

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox searchText={query} updateSearch={debouncedSearch} />

        {totalPages > 1 && (
          <Pagination
            pageCount={totalPages}
            currentPage={page}
            onPageChange={handleChangePage}
          />
        )}

        <button
          className={css.button}
          onClick={() => router.push("/notes/action/create")}
        >
          Create note +
        </button>
      </header>

      {isLoading && <Loader />}

      {!isLoading && !isError && <NoteList notes={notes} />}
    </div>
  );
}
