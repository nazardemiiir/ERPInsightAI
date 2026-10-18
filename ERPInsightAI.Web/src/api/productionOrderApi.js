import axios from "axios";

const api = axios.create({

    baseURL: "https://localhost:7040/api"

});

export const getProductionOrders = async () => {

    const response =
        await api.get("/ProductionOrders");

    return response.data;

};
export const createProductionOrder = async (data) => {

    const response =
        await api.post("/ProductionOrders", data);

    return response.data;

};

export const startProductionOrder = async (id) => {

    const response =
        await api.post(`/ProductionOrders/${id}/start`);

    return response.data;

};

export const completeProductionOrder = async (id) => {

    const response =
        await api.post(`/ProductionOrders/${id}/complete`);

    return response.data;

};
export const deleteProductionOrder = async (id) => {

    return await api.delete(
        `/ProductionOrders/${id}`
    );

};
export const getProductionOrderById = async (id) => {

    const response =
        await api.get(`/ProductionOrders/${id}`);

    return response.data;

};
export const updateProductionOrder = async (id, data) => {

    const response =
        await api.put(`/ProductionOrders/${id}`, data);

    return response.data;

};