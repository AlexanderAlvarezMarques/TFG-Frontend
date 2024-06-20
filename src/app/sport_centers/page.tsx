import React from "react";
import Link from "next/link";
import SportCenterService from "@/services/api/sportCenter/SportCenterService";
import FormatTextTools from "@/utils/FormatTextTools";

const SportCentersPage = async () => {

    const sportCenters: SportCenter[] = await SportCenterService.getAllSportCentersData();

    return (
        <div>
            <table className={`table table-bordered table-hover`}>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Dirección</th>
                        <th>Ciudad</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        sportCenters.map((sportCenter) =>
                                <tr key={sportCenter.id}>
                                    <td><Link href={`/sport_centers/${sportCenter.id}`}>{sportCenter.name}</Link></td>
                                    <td>{sportCenter.street}</td>
                                    <td>{sportCenter.city.name}, {sportCenter.city.province.name}, {sportCenter.city.province.country.name}</td>
                                </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
        // <section>
        //     <ul>
        //         {sportCenters.map((sportCenter) => {
        //             return (
        //                 <li key={sportCenter.id}>
        //                     <Link href={`/sport_centers/${sportCenter.id}`}>{sportCenter.name}</Link>
        //                 </li>
        //             )
        //         })}
        //     </ul>
        // </section>
    )
}

export default SportCentersPage;
