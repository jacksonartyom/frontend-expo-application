import { API_URL } from "../config/api";

export const getTransactionListByCondition = async (token, condition) => {
    const response = await fetch(
        `${API_URL}/transaction?wallet_id=${condition.walletId}&month=${condition.month}&year=${condition.year}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response;
};

export const createTransaction = async (token, requestBody) => {
    const response = await fetch(API_URL + "/transaction", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(requestBody),
    });
    return response;
};

export const deleteTransaction = async (token, id) => {
    const response = await fetch(API_URL + "/transaction/" + id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    return response;
};
