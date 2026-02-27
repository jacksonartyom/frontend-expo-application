import { API_URL } from "../config/api";

export async function getDashboard(token) {
    try {
        const response = await fetch(API_URL + "/dashboard", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();

        if (data.result) {
            return { success: true, data: data.result };
        } else {
            return { success: false, message: data.message };
        }

    } catch (error) {
        console.error('Login error:', error);
        return { success: false, message: 'Network error' };
    }
}