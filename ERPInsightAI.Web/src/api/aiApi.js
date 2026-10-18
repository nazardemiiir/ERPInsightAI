import axios from "axios";

const api = axios.create({
    baseURL: "https://localhost:7040/api",
    timeout: 180000
});

export const getAIAnalysis = async () => {
    const response = await api.get("/AI");
    console.log("AI API GELEN VERİ:", response.data);
    return response.data;
};