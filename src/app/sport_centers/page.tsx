import React from "react";
import SportCenterService from "@/services/api/sportCenter/SportCenterService";

import "@/assets/sass/pages/sportCenters.scss";

const SportCentersPage = async () => {

    const sportCenters: SportCenter[] = await SportCenterService.getAllSportCentersData();

    return (
        <div className={`sportCenters`}>
            <table className={`table table-bordered table-hover table-striped`}>
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
                                <td>{sportCenter.name}</td>
                                <td>{sportCenter.street}</td>
                                <td>{sportCenter.city.name}, {sportCenter.city.province.name}, {sportCenter.city.province.country.name}</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}

export default SportCentersPage;
