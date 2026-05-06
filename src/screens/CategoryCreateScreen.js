import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { Text, TextInput, TouchableOpacity, View, Keyboard } from "react-native";
import { createCategories } from "../services/categoryService";
import { categoryStyles as styles } from '../styles/categoryStyles';

export default function CategoryCreateScreen({ navigation }) {

  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [errors, setErrors] = useState({});

  useFocusEffect(
    useCallback(() => {
      Keyboard.dismiss();

      if (typeof document !== "undefined" && document.activeElement) {
        document.activeElement.blur();
      }
    }, [])
  );

  const handleSave = async () => {
    let newErrors = {};

    if (!name.trim()) newErrors.name = "Name is required";
    if (!type.trim()) newErrors.type = "type is required";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    const requestBody = {
      name,
      type
    };

    try {
      const token = await AsyncStorage.getItem("token");
      const response = await createCategories(token, requestBody);
      if (!response.ok) {
        throw new Error("Save category failed");
      }
      alert("Category saved successfully!");
      navigation.goBack();

    } catch (error) {
      alert("An error occurred. Please try again.");
    }
  };


  return (
    <View style={styles.containerModel}>
      <Text style={styles.labelFormText}>Name<Text style={{ color: 'red' }}> *</Text></Text>
      <TextInput
        style={[styles.input, errors.name ? styles.inputError : null]}
        placeholder="Ex. category name"
        placeholderTextColor="#C7C7CD"
        value={name}
        onChangeText={(text) => {
          setName(text);
          setErrors({ ...errors, name: null });
        }}
      />
      {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}
      <View style={styles.radioContainer}>

        {/* Income */}
        <TouchableOpacity
          style={styles.radioItem}
          onPress={() => {
            setType("income");
            setErrors({ ...errors, type: null });
          }}
        >
          <View
            style={[
              styles.radioOuter,
              { borderColor: "green" }
            ]}
          >
            {type === "income" && (
              <View
                style={[
                  styles.radioInner,
                  { backgroundColor: "green" }
                ]}
              />
            )}
          </View>
          <Text style={[styles.radioLabel, { color: "green" }]}>
            Income
          </Text>
        </TouchableOpacity>

        {/* Expense */}
        <TouchableOpacity
          style={styles.radioItem}
          onPress={() => {
            setType("expense");
            setErrors({ ...errors, type: null });
          }}
        >
          <View
            style={[
              styles.radioOuter,
              { borderColor: "red" }
            ]}
          >
            {type === "expense" && (
              <View
                style={[
                  styles.radioInner,
                  { backgroundColor: "red" }
                ]}
              />
            )}
          </View>
          <Text style={[styles.radioLabel, { color: "red" }]}>
            Expense
          </Text>
        </TouchableOpacity>

      </View>

      {errors.type && (
        <Text style={styles.errorText}>
          {errors.type}
        </Text>
      )}
      <TouchableOpacity style={styles.activeBtn} onPress={handleSave}>
        <Text style={styles.btnText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}
