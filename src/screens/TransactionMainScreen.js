// TransactionMainScreen.js
import React, { useState } from "react";
import { View, Text, Button, FlatList } from "react-native";

export default function TransactionMainScreen({ navigation }) {
  const [selectedWallet, setSelectedWallet] = useState(null);
  const [items, setItems] = useState([]);

  const handleAddItem = () => {
    navigation.navigate("AddTransaction", {
      onAdd: (newItem) => {
        setItems((prev) => [...prev, newItem]);
      },
    });
  };

  const handleSaveAll = () => {
    const payload = {
      walletId: selectedWallet,
      transactions: items,
    };

    console.log("SEND TO API:", payload);
    // call service here
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>

      <Text>Wallet Dropdown here</Text>

      <Button title="+ Add Item" onPress={handleAddItem} />

      <FlatList
        data={items}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Text>
            [{item.category}] {item.name} {item.amount}
          </Text>
        )}
      />

      <Button title="SAVE ALL" onPress={handleSaveAll} />

    </View>
  );
}