import { API_URL } from "../config/api";

export const createWallet = async (token, payload) => {
    const response = await fetch(API_URL + "/wallet", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload),
    });
    return response;
};

export const getWalletList = async (token) => {
    const response = await fetch(API_URL + "/wallet", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    return response;
};


