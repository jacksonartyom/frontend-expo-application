import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from "../config/api";

export async function signIn(email, password) {
    try {
        const response = await fetch(API_URL + "/sign-in", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
            }),
        });

        const data = await response.json();

        if (data.result) {
            await AsyncStorage.setItem('token', data.result.token);
            return { success: true };
        } else {
            return { success: false, message: data.message };
        }

    } catch (error) {
        console.error('Login error:', error);
        return { success: false, message: 'Network error' };
    }
}

export async function singUp(requestBody) {
    try {
        const response = await fetch(API_URL + "/sign-up", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        });
        const data = await response.json();

        if (response.ok) {
            return { success: true };
        } else {
            return { success: false, message: data.message || "Something went wrong" };
        }

    } catch (error) {
        console.error('Register error:', error);
        return { success: false, message: error.message };
    }
}
