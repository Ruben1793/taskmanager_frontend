import React from "react";
import ReactDOM from "react-dom"
import {CssBaseline} from "@mui/material";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {Box} from "@mui/material";
import Categories from "./pages/Categories"
import CategoryDetails from "./pages/Categories/CategoryDetails";
import {SnackbarProvider} from "notistack";
import LoadingOverlayResource from "./components/LoadingOverlayResource";
import SignUp from "./pages/Auth/SignUp";
import SignIn from "./pages/Auth/SignIn";
import AuthContextProvider from "./context/AuthContextProvider";
import RequireAuth from "./components/RequireAuth";

export default function App() {
    return <div>
        <CssBaseline/>
        <LoadingOverlayResource>
            <AuthContextProvider>
                <SnackbarProvider>
                    <Router>
                        <Box sx={{ bgcolor: (theme) =>
                                theme.palette.background.default,
                            minHeight: "100vh",
                            width: "100%"
                        }}>
                            <Routes>
                                <Route element={<RequireAuth/>}>
                                    <Route path="/categories" element={<Categories/>} />
                                    <Route path="/categories/create"  element={<CategoryDetails/>} />
                                    <Route path="/categories/edit/:id" element={<CategoryDetails/>} />
                                </Route>
                                <Route path="/auth/signup" element={<SignUp/>} />
                                <Route path="/auth/signin" element={<SignIn/>} />
                            </Routes>
                        </Box>
                    </Router>
                </SnackbarProvider>
            </AuthContextProvider>
        </LoadingOverlayResource>
    </div>
}

ReactDOM.render(<App/>, document.getElementById("root"))
