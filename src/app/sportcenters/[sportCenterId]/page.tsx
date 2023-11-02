import getAllSportCenters, {getSportCenterDetailsById} from "@/lib/api/sportCenters";
import {notFound} from "next/navigation";

type Params = {
    params: {
        sportCenterId: number
    }
}

export async function generateStaticParams() {
    const sportCentersData: Promise<SportCenter[]> = getAllSportCenters()
    const sportCenters = await sportCentersData;

    return sportCenters.map(sportCenter => ({
        sportCenterId: sportCenter.id.toString()
    }))
}

export async function generateMetadata({ params: { sportCenterId}}: Params) {
    const sportCenterData:Promise<SportCenter> = getSportCenterDetailsById(sportCenterId);
    const sportCenter = await sportCenterData;

    if (sportCenter === undefined) {
        return {
            title: `Sport center not found`
        }
    }

    return {
        title: sportCenter.name,
        description: `This is ${sportCenter.name} page. Here are all the public information available`
    };
}

export default async function SportCenterDetailPage({ params: {sportCenterId} }: Params) {

    const sportCenterData:Promise<SportCenter> = getSportCenterDetailsById(sportCenterId);
    const sportCenter = await sportCenterData;

    if (sportCenter === undefined) return notFound();

    return (
        <section>
            <ul>
                <li>Nombre: {sportCenter.name}</li>
                <li>Ciudad: {sportCenter.city}</li>
                <li>Calle: {sportCenter.street}</li>
            </ul>
        </section>
    )
}
