import {useDispatch, useSelector} from "react-redux";
import UserService from "@/services/api/UserService";
import {HTTP_STATUS} from "@/enums/HttpStatus";
import {setUser} from "@/redux/reducers/userReducers";
import {jwtDecode} from "jwt-decode";
import {setToken} from "@/redux/reducers/authorizationReducers";

export default function LoadUserData() {

    const dispatch = useDispatch();
    const auth = useSelector((state: StorageState) => state.authorization);
    const userData = useSelector((state: StorageState) => state.user);

    if (localStorage.getItem('token')) {

        if (userData.id === -1) {
            const userData = UserService.getUserDetailsByToken();

            userData.then(({status, data}) => {
                if (status === HTTP_STATUS.OK) {
                    dispatch(setUser(data));
                }
            }).catch((error) => {
                console.log(error);
            })
        }

        if (!auth.isLogged) {
            const token = localStorage.getItem('token');
            const refresh_token = localStorage.getItem('refresh_token');
            dispatch(setToken({token: token, refresh_token: refresh_token}));
        }
    }

    return <></>;
}
