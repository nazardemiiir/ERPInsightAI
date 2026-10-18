import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import MainLayout from "./layout/MainLayout";

import Dashboard from "./pages/Dashboard";
import ProductionOrders from "./pages/ProductionOrders";
import ProductionOrderDetail from "./pages/ProductionOrderDetail";
import Machines from "./pages/Machines";
import Operations from "./pages/Operations";
import Employees from "./pages/Employees";
import Reports from "./pages/Reports";
import AIAnalysis from "./pages/AIAnalysis";
import Login from "./pages/Login";

import ProtectedRoute from "./routes/ProtectedRoute";

function App() {

    return (

        <BrowserRouter>

            <Routes>

                {/* Login Sayfası */}

                <Route
                    path="/login"
                    element={<Login />}
                />

                {/* Korumalı Sayfalar */}

                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <MainLayout />
                        </ProtectedRoute>
                    }
                >

                    <Route
                        index
                        element={<Dashboard />}
                    />

                    <Route
                        path="production-orders"
                        element={<ProductionOrders />}
                    />

                    <Route
                        path="production-orders/:id"
                        element={<ProductionOrderDetail />}
                    />

                    <Route
                        path="machines"
                        element={<Machines />}
                    />

                    <Route
                        path="operations"
                        element={<Operations />}
                    />

                    <Route
                        path="employees"
                        element={<Employees />}
                    />

                    <Route
                        path="reports"
                        element={<Reports />}
                    />

                    <Route
                        path="ai-analysis"
                        element={<AIAnalysis />}
                    />

                </Route>

            </Routes>

        </BrowserRouter>

    );

}

export default App;