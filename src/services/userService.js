import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from "../config/api";

export const getUserProfile = async (token) => {
    const response = await fetch(API_URL + "/user/user-profile", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    return response;
};

