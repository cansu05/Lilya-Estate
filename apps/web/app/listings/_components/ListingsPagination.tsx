"use client";

import { Pagination, PaginationItem } from "@mui/material";
import Link from "next/link";

type ListingsPaginationProps = {
  page: number;
  totalPages: number;
  searchParams: Record<string, string | string[] | undefined>;
};

function buildPageHref(
  searchParams: Record<string, string | string[] | undefined>,
  nextPage: number,
) {
  const params = new URLSearchParams();

  for (const [key, raw] of Object.entries(searchParams)) {
    if (key === "page") continue;
    if (typeof raw === "string" && raw.length > 0) {
      params.set(key, raw);
    }
  }

  if (nextPage > 1) {
    params.set("page", String(nextPage));
  }

  const query = params.toString();
  return query ? `/listings?${query}` : "/listings";
}

export default function ListingsPagination({
  page,
  totalPages,
  searchParams,
}: ListingsPaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <Pagination
      page={page}
      count={totalPages}
      color="primary"
      shape="rounded"
      siblingCount={1}
      boundaryCount={1}
      renderItem={(item) => (
        <PaginationItem
          component={Link}
          href={buildPageHref(searchParams, item.page ?? 1)}
          {...item}
        />
      )}
    />
  );
}
