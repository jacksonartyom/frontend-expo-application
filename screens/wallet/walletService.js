export const createWallet = async (apiUrl, token, payload) => {
    const res = await fetch(`${apiUrl}/wallet`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
    });
    return res;
};

export const getWalletList = async (apiUrl, token) => {
    const res = await fetch(`${apiUrl}/wallet`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    return res;
};


