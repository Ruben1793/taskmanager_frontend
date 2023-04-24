import React from "react";
import ReactDOM from "react-dom"
import {CssBaseline} from "@mui/material";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {Box} from "@mui/material";
import Categories from "./pages/Categories"
import CategoryDetails from "./pages/Categories/CategoryDetails";
import {SnackbarProvider} from "notistack";
import SignUp from "./pages/Auth/SignUp";
import SignIn from "./pages/Auth/SignIn";
import AuthContextProvider from "./context/AuthContextProvider";
import RequireAuth from "./components/RequireAuth";
import RequireNotAuth from "./components/RequireNotAuth";
import BaseLayout from "./components/BaseLayout";
import Tasks from "./pages/Tasks";
import TaskDetails from "./pages/Tasks/TaskDetails";
import Dashboard from "./pages/Dashboard";

export default function App() {
    return <div>
        <CssBaseline/>
        <AuthContextProvider>
            <SnackbarProvider>
                <Router>
                    <Box sx={{
                        bgcolor: (theme) => theme.palette.background.default,
                        minHeight: "100vh",
                        width: "100%"
                    }}>
                        <Routes>
                            <Route element={<RequireAuth/>}>
                                <Route element={<BaseLayout />}>
                                    <Route path="/categories" element={<Categories/>} />
                                    <Route path="/categories/create"  element={<CategoryDetails/>} />
                                    <Route path="/categories/edit/:id" element={<CategoryDetails/>} />
                                    <Route path="/tasks" element={<Tasks/>} />
                                    <Route path="/tasks/create" element={<TaskDetails/>} />
                                    <Route path="/tasks/edit/:id" element={<TaskDetails/>} />
                                    <Route path="/" element={<Dashboard/>} />
                                </Route>
                            </Route>
                            <Route element={<RequireNotAuth/>}>
                                <Route path="/auth/signup" element={<SignUp/>} />
                                <Route path="/auth/signin" element={<SignIn/>} />
                            </Route>
                        </Routes>
                    </Box>
                </Router>
            </SnackbarProvider>
        </AuthContextProvider>
    </div>
}

ReactDOM.render(<App/>, document.getElementById("root"))
