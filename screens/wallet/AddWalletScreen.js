import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Switch } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createWallet } from "./walletService";

export default function AddWalletScreen({ navigation }) {
    const API_URL = 'http://localhost:3000/dev';

    const [walletName, setWalletName] = useState("");
    const [accountNo, setAccountNo] = useState("");
    const [bankName, setBankName] = useState("");
    const [initialBalance, setInitialBalance] = useState("");

    const [isActive, setIsActive] = useState(false);
    const [errors, setErrors] = useState({});

    const toggleSwitch = () => setIsActive(previous => !previous);
    // const fetchData = async () => {
    //     try {
    //         const token = await AsyncStorage.getItem("token");

    //         const response = await fetch(API_URL + "/wallet", {
    //             method: 'GET',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Authorization': `Bearer ${token}`
    //             }
    //         });

    //         const data = await response.json();

    //         if (data.result) {
    //             setWalletList(data.result);
    //         } else if (data.error === 'Invalid token') {
    //             alert(data.error || 'Fetch failed');

    //             await AsyncStorage.removeItem('userId');
    //             localStorage.removeItem("NAVIGATION_STATE");
    //             navigation.reset({
    //                 index: 0,
    //                 routes: [{ name: "Login" }],
    //             });
    //         }

    //     } catch (error) {
    //         alert('Network error');
    //     }
    // };

    const handleSave = async () => {
        let newErrors = {};

        if (!walletName.trim()) newErrors.walletName = "Name is required";
        if (!bankName.trim()) newErrors.bankName = "Bank Name is required";
        if (!initialBalance.trim()) newErrors.initialBalance = "Balance is required";

        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) {
            alert("Please fill in all required fields.");
            return;
        }

        const requestBody = {
            walletName,
            bankName,
            balance: Number(initialBalance || 0).toFixed(2),
            status: isActive,
            accountNo,
        };

        try {
            const token = await AsyncStorage.getItem("token");
            const response = await createWallet(API_URL, token, requestBody);
            if (!response.ok) {
                throw new Error("Save wallet failed");
            }
            alert("Wallet saved successfully!");
            navigation.goBack();

        } catch (error) {
            alert("An error occurred. Please try again.");
        }
    };


    return (
        <View style={styles.container}>
            <Text style={styles.label}>Name *</Text>
            <TextInput
                style={[
                    styles.input,
                    errors.walletName && { borderColor: "red" }
                ]}
                placeholder="Ex. Main wallet"
                placeholderTextColor="#C7C7CD"
                value={walletName}
                onChangeText={(text) => {
                    setWalletName(text);
                    setErrors({ ...errors, walletName: null });
                }}
            />

            <Text style={styles.label}>Bank Name *</Text>
            <TextInput
                style={[
                    styles.input,
                    errors.bankName && { borderColor: "red" }
                ]}
                placeholder="Ex. KBank"
                placeholderTextColor="#C7C7CD"
                value={bankName}
                onChangeText={(text) => {
                    setBankName(text);
                    setErrors({ ...errors, bankName: null });
                }}
            />

            <Text style={styles.label}>Balance *</Text>
            <TextInput
                style={[
                    styles.input,
                    errors.initialBalance && { borderColor: "red" }
                ]}
                keyboardType="numeric"
                placeholder="0.00"
                placeholderTextColor="#C7C7CD"
                value={initialBalance}
                onChangeText={(text) => {
                    const formatted = text.replace(/[^0-9.]/g, "");
                    setInitialBalance(formatted);
                    setErrors({ ...errors, initialBalance: null });
                }}
            />

            <Text style={styles.label}>Full account no. (Optional)</Text>
            <TextInput
                style={styles.input}
                placeholder="Ex. 544-xxx-2345"
                placeholderTextColor="#C7C7CD"
                value={accountNo}
                onChangeText={setAccountNo}
            />

            <Text style={styles.label}>Status</Text>
            <View style={{ flexDirection: "row", alignItems: "center", marginTop: 20 }}>
                <Switch
                    value={isActive}
                    onValueChange={toggleSwitch}
                    thumbColor={isActive ? "#33CC33" : "#ccc"}
                />

                <Text style={{ marginLeft: 10, fontSize: 16, color: "#C7C7CD" }}>
                    {isActive ? "Active" : "Inactive"}
                </Text>
            </View>

            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
        </View>
    );
}


const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: "#fff" },
    label: { fontSize: 16, fontWeight: "600", marginTop: 15 },
    input: {
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        marginTop: 5,
    },
    saveButton: {
        backgroundColor: "#33CC33",
        padding: 15,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 30,
    },
    saveButtonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
    headerButton: {
        marginRight: 10, // เว้นระยะห่างด้านขวาจากขอบจอ
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: '#33CC33', // สีพื้นหลังของปุ่ม
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerButtonText: {
        color: 'white', // สีตัวอักษร
        fontSize: 18,
        fontWeight: 'bold',
    },
});
