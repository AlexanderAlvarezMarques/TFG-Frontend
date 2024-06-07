import React from "react";
import Link from "next/link";
import SportCenterService from "@/services/api/sportCenter/SportCenterService";

const SportCentersPage = async () => {

    const sportCenters: SportCenter[] = await SportCenterService.getAllSportCentersData();

    return (
        <section>
            <ul>
                {sportCenters.map((sportCenter) => {
                    return (
                        <li key={sportCenter.id}>
                            <Link href={`/sport_centers/${sportCenter.id}`}>{sportCenter.name}</Link>
                        </li>
                    )
                })}
            </ul>
        </section>
    )
}

export default SportCentersPage;
