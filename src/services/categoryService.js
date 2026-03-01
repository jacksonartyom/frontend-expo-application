import { API_URL } from "../config/api";

export const getCategoriesList = async (token) => {
    const response = await fetch(API_URL + "/categories", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    return response;
};

export const createCategories = async (token, requestBody) => {
    const response = await fetch(API_URL + "/categories", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(requestBody),
    });
    return response;
};
