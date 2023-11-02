import getAllSportCenters from "@/lib/api/sportCenters";
import Link from "next/link";

export default async function SportCentersPage() {

    const sportCentersData: Promise<SportCenter[]> = getAllSportCenters()
    const sportCenters = await sportCentersData;

    return (
        <section>
            <ul>
                {sportCenters.map(sportCenter => {
                    return (
                        <li key={sportCenter.id}>
                            <Link href={`/sportcenters/${sportCenter.id}`}>{sportCenter.name}</Link>
                        </li>
                    )
                })}
            </ul>
        </section>
    )
}
