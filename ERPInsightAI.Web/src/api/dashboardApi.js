import axios from "axios";

const api = axios.create({
    baseURL: "https://localhost:7040/api",
});

export const getDashboardSummary = async () => {
    const response = await api.get("/Dashboard/Summary");
    return response.data;
};