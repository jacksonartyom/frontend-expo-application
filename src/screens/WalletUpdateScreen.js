import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { updateWallet } from "../services/walletService";
import { walletStyles as styles } from "../styles/walletStyles";

export default function WalletUpdateScreen({ navigation, route }) {

    const { wallet } = route.params;

    const [walletName, setWalletName] = useState(wallet.wallet_name);
    const [walletDetail, setWalletDetail] = useState(wallet.wallet_detail);
    const [balance] = useState(wallet.balance);
    const [errors, setErrors] = useState({});

    const handleSave = async () => {

        let newErrors = {};

        if (!walletName.trim()) newErrors.walletName = "Wallet Name is required";

        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) {
            return;
        }

        const requestBody = {
            walletName,
            walletDetail,
        };

        try {

            const token = await AsyncStorage.getItem("token");

            const response = await updateWallet(token, wallet._id, requestBody);

            if (!response.ok) {
                throw new Error("Update wallet failed");
            }

            alert("Wallet updated successfully!");
            navigation.goBack();

        } catch (error) {
            alert("An error occurred. Please try again.");
        }
    };

    return (
        <View style={styles.containerModel}>

            <Text style={styles.labelFormText}>
                Wallet Name<Text style={{ color: "red" }}> *</Text>
            </Text>

            <TextInput
                style={[styles.input, errors.walletName ? styles.inputError : null]}
                value={walletName}
                onChangeText={(text) => {
                    setWalletName(text);
                    setErrors({ ...errors, walletName: null });
                }}
            />

            {errors.walletName && (
                <Text style={styles.errorText}>{errors.walletName}</Text>
            )}

            <Text style={styles.labelFormText}>Balance</Text>

            <Text style={styles.balanceText}>
                {Number(balance).toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                })} บาท
            </Text>

            <Text style={styles.labelFormText}>Wallet Detail (Optional)</Text>

            <TextInput
                style={styles.input}
                value={walletDetail}
                onChangeText={setWalletDetail}
            />

            <TouchableOpacity style={styles.activeBtn} onPress={handleSave}>
                <Text style={styles.btnText}>Update</Text>
            </TouchableOpacity>

        </View>
    );
}