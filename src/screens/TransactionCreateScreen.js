// AddTransactionScreen.js
import React, { useState } from "react";
import { View, TextInput, Button } from "react-native";

export default function TransactionCreateScreen({ route, navigation }) {
  const { onAdd } = route.params;

  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = () => {
    const newItem = {
      name,
      amount: parseFloat(amount),
      category,
    };

    onAdd(newItem);      // 👈 ส่งกลับไปหน้าแรก
    navigation.goBack(); // 👈 กลับหน้า Transaction
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <TextInput placeholder="Name" value={name} onChangeText={setName} />
      <TextInput placeholder="Amount" value={amount} onChangeText={setAmount} />
      <TextInput placeholder="Category" value={category} onChangeText={setCategory} />

      <Button title="Add" onPress={handleSubmit} />
    </View>
  );
}