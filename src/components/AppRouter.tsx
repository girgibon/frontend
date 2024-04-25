import React from "react";
import { Routes, Route } from "react-router-dom";
import { RouteNames, privateRoutes, publicRoutes } from "../routes";
import { Navigate } from "react-router";
import { useTypedSelector } from "../hooks/useTypedSelector";

const AppRouter = () => {
    const { isAuth } = useTypedSelector(state => state.isAuth);
    const routes = isAuth ? privateRoutes : publicRoutes;

    return (
        <Routes>
            {routes.map((route) => (
                <Route key={route.path} path={route.path} element={<route.component />} />
            ))}
            {/* Redirect only if no route matches */}
            <Route path="*" element={isAuth ? <Navigate to={RouteNames.EVENT} replace /> : <Navigate to={RouteNames.LOGIN} replace />} />
        </Routes>
    );
};

export default AppRouter;