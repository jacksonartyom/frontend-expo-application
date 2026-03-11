import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLayoutEffect, useState, useCallback } from 'react';
import { FlatList, Text, TouchableOpacity, View, Modal } from 'react-native';
import { useFocusEffect } from "@react-navigation/native";
import { getWalletList, deleteWallet } from '../services/walletService';
import { walletStyles as styles } from '../styles/walletStyles';
import { Ionicons } from "@expo/vector-icons";

export default function WalletScreen({ navigation, setIsLoggedIn }) {

    const [walletList, setWalletList] = useState([]);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    useFocusEffect(
        useCallback(() => {
            fetchData();
        }, [])
    );

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity
                    style={styles.headerWalletButton}
                    onPress={() => {
                        navigation.navigate("AddWallet");
                    }}
                >
                    <Text style={styles.headerButtonText}>+</Text>
                </TouchableOpacity>
            ),
        });
    }, [navigation]);

    const fetchData = async () => {
        try {
            const token = await AsyncStorage.getItem("token");
            const response = await getWalletList(token);
            const data = await response.json();

            if (data.result) {
                setWalletList(data.result);
            } else if (data.error === "Invalid token") {
                await AsyncStorage.removeItem("userId");
                await AsyncStorage.removeItem("token");
                await AsyncStorage.removeItem("NAVIGATION_STATE");
                setIsLoggedIn(false);
            }
        } catch (error) {
            alert("Network error");
        }
    };

    const handleEdit = (item) => {
        navigation.navigate("EditWallet", { wallet: item });
    };

    const handleDelete = (item) => {
        setSelectedItem(item);
        setDeleteModalVisible(true);
    };

    const confirmDelete = async () => {
        const token = await AsyncStorage.getItem("token");
        const response = await deleteWallet(token, selectedItem._id);
        const data = await response.json();

        if (data.result) {
            setDeleteModalVisible(false);
            alert("Wallet delete successfully!");
            await fetchData()
        }
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() =>
                navigation.navigate("TransactionDetail", { walletId: item._id })
            }
        >
            <View style={styles.iconContainer}>
                <TouchableOpacity
                    onPress={() => handleEdit(item)}
                    style={styles.iconButton}
                >
                    <Ionicons name="create-outline" size={20} color="#333" />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => handleDelete(item)}
                    style={styles.iconButton}
                >
                    <Ionicons name="trash-outline" size={20} color="red" />
                </TouchableOpacity>
            </View>

            <Text style={styles.cardTitle}>{item.wallet_name}</Text>
            <Text style={styles.cardAmount}>
                {item.balance?.toLocaleString(undefined, { minimumFractionDigits: 2 })} บาท
            </Text>
            <Text style={styles.cardType}>{item.wallet_detail}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={walletList}
                renderItem={renderItem}
                keyExtractor={(item) => item._id}
                numColumns={2}
                contentContainerStyle={styles.grid}
            />


            <Modal
                transparent={true}
                animationType="fade"
                visible={deleteModalVisible}
                onRequestClose={() => setDeleteModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>

                        <Text style={styles.modalTitle}>Confirm Delete</Text>
                        <Text style={styles.modalMessage}>
                            Are you sure you want to delete{" "}
                            {selectedItem?.wallet_name} ?
                        </Text>

                        <View style={styles.modalActions}>
                            <TouchableOpacity
                                style={[styles.modalButton, styles.cancelButton]}
                                onPress={() => setDeleteModalVisible(false)}
                            >
                                <Text style={styles.buttonText}>Cancel</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.modalButton, styles.deleteButton]}
                                onPress={confirmDelete}
                            >
                                <Text style={styles.buttonText}>Delete</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
            </Modal>
        </View>
    );
}