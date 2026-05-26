// screens/DashboardScreen.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLayoutEffect, useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { getDashboard } from "../services/dashboardService";
import {
    FlatList,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
    Modal
} from 'react-native';
import { MaterialIcons } from "@expo/vector-icons";
import { dashboardStyles as styles } from '../styles/dashboardStyles';

export default function DashboardScreen({ navigation, setIsLoggedIn }) {


    const [totalBalance, setTotalBalance] = useState('');
    const [walletList, setWalletList] = useState([]);
    const [recentDataList, setRecentDataList] = useState([]);
    const [menuVisible, setMenuVisible] = useState(false);

    // 1️⃣ ใช้ตั้งค่า Header อย่างเดียว
    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity
                    style={{ marginRight: 15 }}
                    onPress={() => setMenuVisible(true)}
                >
                    <MaterialIcons name="more-vert" size={24} color="black" />
                </TouchableOpacity>
            ),
        });
    }, [navigation]);

    // 2️⃣ ใช้โหลดข้อมูลทุกครั้งที่ tab ถูก focus
    useFocusEffect(
        useCallback(() => {
            const fetchData = async () => {
                const token = await AsyncStorage.getItem("token");
                const result = await getDashboard(token);

                if (result.success) {
                    setWalletList(result.data.wallets);
                    setRecentDataList(result.data.recent_transactions);
                    setTotalBalance(result.data.total_balance);
                } else {
                    alert(result.message);
                    await AsyncStorage.removeItem("userId");
                    await AsyncStorage.removeItem("token");
                    await AsyncStorage.removeItem("NAVIGATION_STATE");
                    setIsLoggedIn(false);
                }
            };

            fetchData();
        }, [])
    );

    const handleSignOut = async () => {
        try {
            await AsyncStorage.removeItem("userId");
            await AsyncStorage.removeItem("token");
            await AsyncStorage.removeItem("NAVIGATION_STATE");
            setIsLoggedIn(false);
        } catch (err) {
            console.log("Logout error:", err);
        }
    };



    const renderItem = ({ item }) => {
        const isIncome = item.type == 'income';
        return (
            <View style={styles.activityRow}>
                <Text style={styles.activityText}>- {item.transactionDate} | {item.name} </Text>
                <Text
                    style={[
                        styles.amountText,
                        { color: isIncome ? "green" : "red" },
                    ]}
                >
                    {isIncome ? "+" : "-"}฿ {Math.abs(item.amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </Text>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={recentDataList}
                keyExtractor={(item) => item._id}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={
                    <>
                        {/* Total Balance */}
                        <View style={styles.balanceSection}>
                            <Text style={styles.balanceTitle}>Total Balance</Text>
                            <Text style={styles.balanceAmount}>฿ {parseFloat(totalBalance).toLocaleString()}</Text>
                        </View>

                        {/* Wallet Section */}
                        <View style={styles.walletSection}>
                            <View style={styles.walletHeader}>
                                <Text style={styles.walletTitle}>My wallets</Text>
                                <TouchableOpacity style={styles.addButton}
                                    onPress={() => navigation.navigate("AddWallet")}>
                                    <Text style={styles.addText}>+</Text>
                                </TouchableOpacity>
                            </View>

                            <FlatList
                                data={walletList}
                                keyExtractor={(item) => item._id}
                                numColumns={2}
                                columnWrapperStyle={{ justifyContent: "space-between" }}
                                scrollEnabled={false}   // 👈 สำคัญมาก
                                contentContainerStyle={{ marginTop: 15 }}
                                renderItem={({ item }) => (
                                    <View style={styles.walletCard}>
                                        <Text style={styles.walletName}>{item.wallet_name}</Text>
                                        <Text style={styles.walletAmount}>
                                            ฿ {parseFloat(item.balance).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                        </Text>
                                    </View>
                                )}
                            />
                        </View>

                        {/* Recent Activity Title */}
                        <View style={styles.activitySection}>
                            <Text style={styles.activityTitle}>Recent Activity</Text>
                        </View>
                    </>
                }
            />

            <Modal
                transparent={true}
                visible={menuVisible}
                animationType="fade"
            >
                <TouchableOpacity
                    style={{ flex: 1 }}
                    activeOpacity={1}
                    onPress={() => setMenuVisible(false)} // กดนอกเพื่อปิด
                >
                    <View style={styles.menu}>
                        <TouchableOpacity
                            onPress={() => {
                                setMenuVisible(false);
                                handleSignOut();
                            }}
                        >
                            <Text style={styles.menuItem}>Sign out</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    );
}