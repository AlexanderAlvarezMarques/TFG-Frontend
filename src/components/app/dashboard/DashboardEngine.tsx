import {UserDashboardFilterEnumType} from "@/enum/UserDashboardQueryParamEnum";
import React, {useEffect, useState} from "react";
import UserService from "@/services/api/user/UserService";

type DashboardEngineProps = PaginationConfig & {
    searchType: UserDashboardFilterEnumType
}

const DashboardEngine: React.FC<DashboardEngineProps> = ({searchType, page, itemsPerPage, action}: DashboardEngineProps) => {

    const [isComponentLoaded, setIsComponentLoaded] = useState(false);

    const loadDashboard = async () => {
        const response = await UserService.getUserDashboard(searchType, page, itemsPerPage);
        if (response !== null && action) action(response);
    }

    useEffect(() => {
        if (isComponentLoaded) loadDashboard();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchType, page, itemsPerPage]);

    useEffect(() => {
        setIsComponentLoaded(true);
        loadDashboard()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return null;
}

export default DashboardEngine;
