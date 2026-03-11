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

export const updateWallet = async (token, id, payload) => {
    const response = await fetch(API_URL + "/wallet/" + id, {
        method: 'PUT',
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

export const deleteWallet = async (token, id) => {
    const response = await fetch(API_URL + "/wallet/" + id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    return response;
};


