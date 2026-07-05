import api from "./api";

export const createOrder = async (data) => {
    const response = await api.post("/payment/create-order", data);
    return response.data;
};

export const verifyPayment = async (data) => {
    const response = await api.post("/payment/verify-payment", data);
    return response.data;
};