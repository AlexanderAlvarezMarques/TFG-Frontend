'use client'

import {useDispatch, useSelector} from "react-redux";
import MasterService from "@/services/api/master/MasterService";
import {setMasterData} from "@/redux/reducers/masterDataReducers";
import {setToken} from "@/redux/reducers/authorizationReducers";
import {useEffect} from "react";
import UserService from "@/services/api/user/UserService";
import {setUser} from "@/redux/reducers/userReducers";

const MasterDataReader = () => {

    const dispatch = useDispatch();

    const masterData = useSelector((state: StorageState) => state.masterData);
    const authData = useSelector((state: StorageState) => state.authorization);
    const userData = useSelector((state: StorageState) => state.user);

    useEffect(() => {
        const checkAndUpdateMasterData = async () => {
            if (!masterData.lastUpdate || masterData.lastUpdate > (Date.now() - (60 * 60 * 1000))) {
                const provinces = await MasterService.getProvinces();
                const cities = await MasterService.getCities();
                const sports = await MasterService.getSports();

                dispatch(setMasterData({provinces: provinces, cities: cities, sports: sports}));
            }
        }

        const checkAndUpdateAuthData = () => {
            const token = localStorage.getItem('token');
            const refresh_token = localStorage.getItem('refresh_token');

            if (
                !authData.token || !authData.refresh_token || !authData.isLogged &&
                (token !== '' && refresh_token !== '')
            ) {
                dispatch(setToken({token: token, refresh_token: refresh_token}));
            }
        }

        const checkAndUpdateUserData = async () => {
            if (localStorage.getItem('token') !== null && userData.id === -1) {
                const user = await UserService.getUserByToken();
                dispatch(setUser(user));
            }
        }

        checkAndUpdateMasterData().then();
        checkAndUpdateAuthData();
        checkAndUpdateUserData().then();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return null;
}

export default MasterDataReader;
