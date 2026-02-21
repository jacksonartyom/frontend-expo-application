// screens/HomeScreen.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLayoutEffect } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const menuItems = [
    { id: '1', title: 'Transactions', screen: 'Transactions' },
    //   { id: '2', title: 'Transactions', screen: 'Transactions' },
    //   { id: '3', title: 'Reports & Dashboard', screen: 'Reports' },
    { id: '4', title: 'Wallets', screen: 'Wallets' },
];

export default function HomeScreen({ navigation, setIsLoggedIn }) {

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity
                    style={styles.headerButton}
                    onPress={handleLogout}
                >
                    <Text style={styles.headerButtonText}>LOGOUT</Text>
                </TouchableOpacity>
            ),
        });
    }, [navigation]);

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem("userId");
            await AsyncStorage.removeItem("token");
            await AsyncStorage.removeItem("NAVIGATION_STATE");

            setIsLoggedIn(false);
        } catch (err) {
            console.log("Logout error:", err);
        }
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate(item.screen)}
        >
            <Text style={styles.cardText}>{item.title}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={menuItems}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
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
        margin: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        elevation: 3,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardText: { fontSize: 16, fontWeight: '600' },
    headerButton: {
        marginRight: 10, // เว้นระยะห่างด้านขวาจากขอบจอ
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: '#cf2222ff', // สีพื้นหลังของปุ่ม
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerButtonText: {
        color: 'white', // สีตัวอักษร
        fontSize: 16,
        fontWeight: 'bold',
    },
});