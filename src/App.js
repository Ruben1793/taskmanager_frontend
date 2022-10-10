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

export default function App() {
    return <div>
        <CssBaseline/>
        <LoadingOverlayResource>
            <SnackbarProvider>
                <Router>
                    <Box sx={{ bgcolor: (theme) =>
                            theme.palette.background.default,
                            minHeight: "100vh",
                            width: "100%"
                    }}>
                        <Routes>
                            <Route path="/categories" element={<Categories/>} />
                            <Route path="/categories/create"  element={<CategoryDetails/>} />
                            <Route path="/categories/edit/:id" element={<CategoryDetails/>} />
                            <Route path="/auth/signup" element={<SignUp/>} />
                        </Routes>
                    </Box>
                </Router>
            </SnackbarProvider>
        </LoadingOverlayResource>
    </div>
}

ReactDOM.render(<App/>, document.getElementById("root"))
