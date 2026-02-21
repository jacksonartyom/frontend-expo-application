import React, { useLayoutEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getWalletList } from './walletService';

export default function WalletScreen({ navigation }) {

    const API_URL = 'http://localhost:3000/dev';

    const [walletList, setWalletList] = useState([]);

    useLayoutEffect(() => {

        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity
                    style={styles.headerButton}
                    onPress={() => {
                        navigation.navigate('Add Wallet');
                    }}
                >
                    <Text style={styles.headerButtonText}>+</Text>
                </TouchableOpacity>
            ),
        });

        const fetchData = async () => {
            try {
                const token = await AsyncStorage.getItem("token");
                const response = await getWalletList(API_URL, token);
                const data = await response.json();

                if (data.result) {
                    setWalletList(data.result);
                } else if (data.error === 'Invalid token') {
                    alert(data.error || 'Fetch failed');

                    await AsyncStorage.removeItem('userId');
                    localStorage.removeItem("NAVIGATION_STATE");
                    navigation.reset({
                        index: 0,
                        routes: [{ name: "Login" }],
                    });
                }

            } catch (error) {
                alert('Network error');
            }
        };

        fetchData();

    }, [navigation]);


    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("Transactions", { walletId: item._id })}
        >
            <Text style={styles.cardTitle}>{item.walletName}</Text>
            <Text style={styles.cardAmount}> {item.balance?.toLocaleString(undefined, { minimumFractionDigits: 2 })} บาท</Text>
            <Text style={styles.cardType}>{item.bankName}</Text>
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
        </View>
    );
}


const styles = StyleSheet.create({
    container: { flex: 1, paddingTop: 50, paddingHorizontal: 20, backgroundColor: '#f2f2f2' },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
    grid: { justifyContent: 'center' },
    card: {
        flex: 1,
        margin: 8,
        padding: 16,
        borderRadius: 12,
        backgroundColor: "#FFF",
        borderWidth: 1,
        borderColor: "#eee",
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: "600",
        color: "#333",
    },
    cardAmount: {
        fontSize: 16,
        fontWeight: "500",
        marginTop: 4,
        color: "#008000",
    },
    cardType: {
        fontSize: 14,
        marginTop: 4,
        color: "#666",
    },
    cardText: { fontSize: 16, fontWeight: '600' },
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