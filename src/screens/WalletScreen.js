import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLayoutEffect, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { getWalletList } from '../services/walletService';
import { walletStyles as styles } from '../styles/walletStyles';

export default function WalletScreen({ navigation, setIsLoggedIn }) {

    const [walletList, setWalletList] = useState([]);

    useLayoutEffect(() => {

        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity
                    style={styles.headerWalletButton}
                    onPress={() => {
                        navigation.navigate('AddWallet');
                    }}
                >
                    <Text style={styles.headerButtonText}>+</Text>
                </TouchableOpacity>
            ),
        });

        const fetchData = async () => {
            try {
                const token = await AsyncStorage.getItem("token");
                const response = await getWalletList(token);
                const data = await response.json();

                if (data.result) {
                    setWalletList(data.result);
                } else if (data.error === 'Invalid token') {
                    await AsyncStorage.removeItem("userId");
                    await AsyncStorage.removeItem("token");
                    await AsyncStorage.removeItem("NAVIGATION_STATE");
                    setIsLoggedIn(false);
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
            onPress={() => navigation.navigate("TransactionDetail", { walletId: item._id })}
        >
            <Text style={styles.cardTitle}>{item.wallet_name}</Text>
            <Text style={styles.cardAmount}> {item.balance?.toLocaleString(undefined, { minimumFractionDigits: 2 })} บาท</Text>
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
        </View>
    );
}