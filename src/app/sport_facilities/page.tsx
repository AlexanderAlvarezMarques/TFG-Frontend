'use client'

import {useEffect, useState} from "react";
import UserService from "@/services/api/user/UserService";

import "@/assets/sass/pages/sport_facilities.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faEdit, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import CreateSportCenterModal from "@/components/modal/CreateSportCenterModal/CreateSportCenterModal";
import Link from "next/link";

const SportFacilitiesPage = () => {

    const [sportFacilities, setSportFacilities] = useState<SearchResult<SportCenter>>({
        data: [],
        pagination: {
            currentPage: -1,
            itemsPerPage: Number(process.env.NEXT_PUBLIC_DEFAULT_ITEMS_PER_PAGE),
            maxPage: -1,
            minPage: -1,
            nextPage: -1,
            previousPage: -1
        }
    });

    const updateSportFacilitiesOnCreate = (sportFacility: SportCenter) => {
        setSportFacilities(prevState => ({
            ...prevState,
            data: [...prevState.data, sportFacility]
        }));
    }

    useEffect(() => {
        const requestSportFacilities = async () => {
            const response = await UserService.getUserSportFacilities(1, 25);
            if (response) setSportFacilities(response);
        }

        requestSportFacilities().then()
    }, []);

    return (
        <>
            <table className={`table table-bordered table-hover sportFacilities`}>
                <thead className={`thead-dark`}>
                <tr>
                    <th>#</th>
                    <th>Nombre</th>
                    <th>Ciudad</th>
                    <th>Dirección</th>
                    <th>Total canchas/pistas</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {
                    sportFacilities.data.map((sportFacility) =>
                        <tr key={sportFacility.id}>
                            <th>{sportFacility.id}</th>
                            <td>{sportFacility.name}</td>
                            <td>{sportFacility.city.name}, {sportFacility.city.province.name}, {sportFacility.city.province.country.name}</td>
                            <td>{sportFacility.street}</td>
                            <td>{sportFacility.nCourts}</td>
                            <td className={`text-center`}>
                                <Link href={`/sport_facilities/${sportFacility.id}`}>
                                    <button className={`btn btn-success`}>
                                        <FontAwesomeIcon icon={faEdit}/>
                                    </button>
                                </Link>
                            </td>
                        </tr>
                    )
                }
                </tbody>
            </table>

            <CreateSportCenterModal action={updateSportFacilitiesOnCreate} />
        </>
    )

}

export default SportFacilitiesPage;
