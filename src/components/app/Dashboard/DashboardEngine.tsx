import React, { useEffect } from "react";
import UserService from "@/services/api/UserService";
import { HTTP_STATUS } from "@/enums/HttpStatus";
import { MessageBandColorEnum, useMessagePopup } from "@/components/Context/MessagePopupContext";

interface DashboardEngineProps {
    searchType: number;
    page: number;
    itemsPerPage: number;
    action: Function;
}

const DashboardEngine: React.FC<DashboardEngineProps> = ({ searchType, page, itemsPerPage, action }) => {
    const { openPopup } = useMessagePopup();

    useEffect(() => {
        const loadDashboard = async () => {
            const apiResponse = await UserService.getUserDashboard(searchType, page, itemsPerPage);

            const { status, data } = apiResponse;

            if (status === HTTP_STATUS.OK) {
                action(data);
            } else {
                openPopup("Se ha producido un error al cargar los datos. Por favor, vuelva a intentarlo.", MessageBandColorEnum.RED);
            }
        };

        loadDashboard();
    }, [searchType, page, itemsPerPage]);

    return null;
};

export default DashboardEngine;
