import React from "react";
import {notFound} from "next/navigation";
import SportCenterService from "@/services/api/sportCenter/SportCenterService";

type Params = {
    params: {
        id: number
    }
}

const generateMetadata = async ({ params: {id}}: Params) => {
    const sportCenter: SportCenter = await SportCenterService.getSportCenterDetails(id);
    if (sportCenter === null) return {title: `Sport center not found`}

    return {
        title: sportCenter.name,
        description: `This is ${sportCenter.name} page. Here are all the public information available`
    };
}

const generateStaticParams = async () => {
    const sportCenters: SportCenter[] = await SportCenterService.getAllSportCentersData();

    return sportCenters.map(sportCenter => ({
        sportCenterId: sportCenter.id.toString()
    }))
}

const SportCenterDetailPage = async ({params: {id}}: Params) => {

    const sportCenter: SportCenter = await SportCenterService.getSportCenterDetails(id);
    if (sportCenter === null) return notFound();

    return (
        <section>
            <ul>
                <li>Nombre: {sportCenter.name}</li>
                {/*<li>Ciudad: {sportCenter.city}</li>*/}
                <li>Calle: {sportCenter.street}</li>
            </ul>
        </section>
    )
}

export default SportCenterDetailPage;
export { generateMetadata, generateStaticParams }
