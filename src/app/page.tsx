import { Metadata } from "next";
import SearchReserves from "@/components/Shared/SearchBar/SearchReserves";

export const metadata: Metadata = {
    title: "TFG - Home page",
    description: "TFG by alexander alvarez"
}

export default function HomePage() {
    return (
        <>
            <SearchReserves action={undefined} />
        </>
    );

}
