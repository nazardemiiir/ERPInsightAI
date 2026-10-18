import axios from "axios";

const api = axios.create({

    baseURL: "https://localhost:7040/api"

});

export const getOperations = async () => {

    const response =
        await api.get("/Operations");

    return response.data;

};

export const createOperation = async (data) => {

    const response =
        await api.post("/Operations", data);

    return response.data;

};

export const startOperation = async (id) => {

    const response =
        await api.post(`/Operations/${id}/start`);

    return response.data;

};

export const completeOperation = async (id) => {

    const response =
        await api.post(`/Operations/${id}/complete`);

    return response.data;

};

export const deleteOperation = async (id) => {

    const response =
        await api.delete(`/Operations/${id}`);

    return response.data;

};