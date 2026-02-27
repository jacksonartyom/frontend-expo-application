import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Switch } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createWallet } from "../services/walletService";
import { walletStyles as styles } from '../styles/walletStyles';

export default function WalletCreateScreen({ navigation }) {

    const [walletName, setWalletName] = useState("");
    const [walletDetail, setWalletDetail] = useState("");
    const [initialBalance, setInitialBalance] = useState("");
    const [errors, setErrors] = useState({});

    const handleSave = async () => {
        let newErrors = {};

        if (!walletName.trim()) newErrors.walletName = "Wallet Name is required";
        if (!initialBalance.trim()) newErrors.initialBalance = "Balance is required";

        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) {
            return;
        }

        const requestBody = {
            walletName,
            walletDetail,
            balance: Number(initialBalance || 0).toFixed(2),
        };

        try {
            const token = await AsyncStorage.getItem("token");
            const response = await createWallet(token, requestBody);
            if (!response.ok) {
                throw new Error("Save wallet failed");
            }
            alert("Wallet saved successfully!");
            navigation.navigate('WalletList');

        } catch (error) {
            alert("An error occurred. Please try again.");
        }
    };


    return (
        <View style={styles.container}>
            <Text style={styles.labelFormText}>Wallet Name<Text style={{ color: 'red' }}> *</Text></Text>
            <TextInput
                style={[styles.input, errors.walletName ? styles.inputError : null]}
                placeholder="Ex. Main wallet"
                placeholderTextColor="#C7C7CD"
                value={walletName}
                onChangeText={(text) => {
                    setWalletName(text);
                    setErrors({ ...errors, walletName: null });
                }}
            />
            {errors.walletName ? <Text style={styles.errorText}>{errors.walletName}</Text> : null}
            <Text style={styles.labelFormText}>Balance<Text style={{ color: 'red' }}> *</Text></Text>
            <TextInput
                style={[styles.input, errors.initialBalance ? styles.inputError : null]}
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
            {errors.initialBalance ? <Text style={styles.errorText}>{errors.initialBalance}</Text> : null}
            <Text style={styles.labelFormText}>Wallet Detail(Optional)</Text>
            <TextInput
                style={styles.input}
                placeholder="Ex. wallet detail"
                placeholderTextColor="#C7C7CD"
                value={walletDetail}
                onChangeText={setWalletDetail}
            />

            {/* <Text style={styles.labelFormText}>Status</Text>
            <View style={{ flexDirection: "row", alignItems: "center", marginTop: 20 }}>
                <Switch
                    value={isActive}
                    onValueChange={toggleSwitch}
                    thumbColor={isActive ? "#33CC33" : "#ccc"}
                />

                <Text style={{ marginLeft: 10, fontSize: 16, color: "#C7C7CD" }}>
                    {isActive ? "Active" : "Inactive"}
                </Text>
            </View> */}

            <TouchableOpacity style={styles.activeBtn} onPress={handleSave}>
                <Text style={styles.btnText}>Save</Text>
            </TouchableOpacity>
        </View>
    );
}
