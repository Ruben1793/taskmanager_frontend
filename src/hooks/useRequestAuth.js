import {useCallback, useContext, useState} from "react";
import axios from "axios";
import {useSnackbar} from "notistack";
import formatHttpApiError from "../helpers/formatHttpApiError";
import AuthContextProvider, {AuthContext} from "../context/AuthContextProvider";
import getCommonOptions from "../helpers/axios/getCommonOptions";

export default function useRequestAuth () {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [loading, setLoading] = useState(false);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [logoutPending, setLogoutPending] = useState(false);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const {enqueueSnackbar} = useSnackbar();

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [error, setError] = useState(null);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { setIsAuthenticated, setUser } = useContext(AuthContext);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const handleRequestError = useCallback((err) => {
        const formattedError = formatHttpApiError(err);
        setError(formattedError);
        enqueueSnackbar(formattedError);
        setLoading(false);
    }, [enqueueSnackbar, setLoading, setError]);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const register = useCallback(({username, email, password}, successCallback) => {
        setLoading(true);
        axios.post("/api/auth/users/", {username, email, password})
            .then(() => {
                enqueueSnackbar("Sign up is successful, you can now sign in with your credentials");
                setLoading(false);
                if (successCallback){
                    successCallback();
                }
            }).catch(handleRequestError)
    }, [enqueueSnackbar, setLoading, handleRequestError]);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const login = useCallback(({username, password}) => {
        setLoading(true);
        axios.post("/api/auth/token/login/", {username, password})
            .then((res) => {
                const {auth_token} = res.data;
                localStorage.setItem("authToken", auth_token);
                setLoading(false);
                setIsAuthenticated(true);
            }).catch(handleRequestError)
    }, [handleRequestError, setLoading, setIsAuthenticated]);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const logout = useCallback(() => {
        setLogoutPending(true);
        axios.post("/api/auth/token/logout/", null, getCommonOptions())
            .then(() => {
                localStorage.removeItem("authToken");
                setLogoutPending(false);
                setUser(null);
                setIsAuthenticated(false);
            })
            .catch((err) => {
               setLogoutPending(false);
               handleRequestError(err);
            });
    }, [handleRequestError, setLogoutPending, setIsAuthenticated, setUser]);

    return {
        register, login, logout, loading, logoutPending, error
    }
}
