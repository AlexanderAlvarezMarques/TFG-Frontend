import {Metadata} from "next";
import SearchReservesEngine from "@/components/Shared/SearchReservesEngine";

export const metadata: Metadata = {
    title: "TFG - Home page",
    description: "TFG by alexander alvarez"
}

export default function HomePage() {

    return (
        <>
            <SearchReservesEngine page={1}/>
        </>
    );

}
