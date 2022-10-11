import {useCallback, useState, useContext} from "react";
import axios from "axios";
import {useSnackbar} from "notistack";
import formatHttpApiError from "../helpers/formatHttpApiError";

export default function userRequestAuth () {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [loading, setLoading] = useState(false);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const {enqueueSnackbar} = useSnackbar();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [error, setError] = useState(null);

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

    return {
        register, loading, error
    }
}
