import SportCentersApi from "@/lib/api/sportCenter/sportCentersApi";
import Link from "next/link";

export default async function SportCentersPage() {

    const sportCentersData: Promise<SportCenter[]> = SportCentersApi.getAllSportCenters()
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
