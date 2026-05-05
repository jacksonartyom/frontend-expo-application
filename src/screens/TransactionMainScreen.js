// TransactionMainScreen.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLayoutEffect, useState, useCallback } from 'react';
import { Button, FlatList, Text, View, TouchableOpacity } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import DropDownPicker from 'react-native-dropdown-picker';
import { getWalletList } from '../services/walletService';
import { createTransaction } from '../services/transactionService';
import { Ionicons } from "@expo/vector-icons";
import { transactionDetailStyles as styles } from "../styles/transactionDetailStyles";

export default function TransactionMainScreen({ navigation }) {
  const [selectedWallet, setSelectedWallet] = useState(null);
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [walletList, setWalletList] = useState([]);
  const isWalletLocked = items.length > 0;

  useFocusEffect(
    useCallback(() => {
      fetchWalletData();
    }, [])
  );

  // useLayoutEffect(() => {
  //   fetchWalletData();
  // }, [navigation]);

  const handleAddItem = () => {
    navigation.navigate("AddTransaction", {
      onAdd: (newItem) => {
        setItems((prev) => [...prev, newItem]);
      },
    });
  };

  const fetchWalletData = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await getWalletList(token);
      const data = await response.json();

      if (data.result) {
        const mappedWallet = data.result.map((wallet) => ({
          label: `${wallet.wallet_name} (฿${parseFloat(wallet.balance).toLocaleString()})`,
          value: wallet._id,
        }));

        setWalletList(mappedWallet);
      } else if (data.error === 'Invalid token') {
        await AsyncStorage.multiRemove([
          "userId",
          "token",
          "NAVIGATION_STATE",
        ]);
      }

    } catch (error) {
      alert('Network error');
    }
  };

  const handleSaveAll = async () => {
    try {
      if (!selectedWallet || items.length === 0) return;

      const transactionsWithWallet = items.map((item) => ({
        ...item,
        walletId: selectedWallet,
      }));

      console.log("SEND TO API:", transactionsWithWallet);
      const token = await AsyncStorage.getItem("token");
      const response = await createTransaction(token, transactionsWithWallet);
      // call service here
      if (!response.ok) {
        throw new Error("Save transaction failed");
      }
      alert("Transaction saved successfully!");
      setItems([]);
      setSelectedWallet(null);
      fetchWalletData();
    } catch (error) {
      alert('Network error');
    }
  };

  const handleRemoveItem = (indexToRemove) => {
    setItems((prev) =>
      prev.filter((_, index) => index !== indexToRemove)
    );
  };

  return (
    <View style={styles.container}>

      <View style={styles.dropdownWrapper}>
        <DropDownPicker
          open={open}
          value={selectedWallet}
          items={walletList}
          setOpen={setOpen}
          setValue={setSelectedWallet}
          setItems={setWalletList}
          placeholder="Select Wallet"
          disabled={isWalletLocked}
          zIndex={1000}
        />

        {isWalletLocked && (
          <Text style={{ color: "red", marginTop: 8 }}>
            Wallet ถูกล็อคเนื่องจากมีรายการแล้ว
          </Text>
        )}
      </View>

      <View style={styles.addButtonWrapper}>
        <TouchableOpacity
          style={[
            styles.addButton,
            !selectedWallet && styles.addButtonDisabled,
          ]}
          onPress={handleAddItem}
          disabled={!selectedWallet}
        >
          <Text style={styles.addButtonText}>+ Add Item</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        contentContainerStyle={styles.listContainer}
        data={items}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.listItem}>

            {/* Category */}
            <View style={styles.gridLeft}>
              <Text style={styles.categoryText}>
                [{item.categoryName}]
              </Text>
            </View>

            {/* Name */}
            <View style={styles.gridCenter}>
              <Text style={styles.nameText}>
                {item.name}
              </Text>
            </View>

            {/* Date */}
            <View style={styles.gridCenter}>
              <Text style={styles.nameText}>
                {item.transactionDate}
              </Text>
            </View>

            {/* Amount */}
            <View style={styles.gridRight}>
              <Text
                style={[
                  styles.amountText,
                  { color: item.type === "income" ? "green" : "red" },
                ]}
              >
                {item.type === "income" ? "+" : "-"}฿{" "}
                {Math.abs(item.amount).toLocaleString()}
              </Text>
            </View>

            {/* Delete Icon */}
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleRemoveItem(index)}
            >
              <Ionicons name="trash-outline" size={20} />
            </TouchableOpacity>

          </View>
        )}
      />

      <View style={styles.saveButtonWrapper}>
        <Button title="SAVE ALL" onPress={handleSaveAll} />
      </View>

    </View>
  );
}