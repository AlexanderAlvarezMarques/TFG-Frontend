import React from 'react';
import {Suspense} from "react";
import SearchReserves from "@/components/shared/SearchBar/SearchReserves";

export default function Home() {
  return (
    <>
        <Suspense>
            <SearchReserves page={1} itemsPerPage={10} action={undefined} />
        </Suspense>
    </>
  );
}
