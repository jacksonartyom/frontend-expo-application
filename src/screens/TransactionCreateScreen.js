// AddTransactionScreen.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { useEffect, useMemo, useState } from "react";
import {
  Button,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView
} from "react-native";

// 👇 import service ของคุณ
import { getCategoriesList } from '../services/categoryService';

export default function TransactionCreateScreen({ route, navigation }) {
  const { onAdd } = route.params;

  const [name, setName] = useState("");
  const [note, setNote] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("income");
  const [categoryId, setCategoryId] = useState("");
  const [categoryList, setCategoryList] = useState([]);

  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [errors, setErrors] = useState({});

  // 🔥 โหลด category จาก API
  useEffect(() => {
    fetchCategory();
  }, []);

  const fetchCategory = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await getCategoriesList(token);
      const data = await response.json();

      if (data.result) {
        setCategoryList(data.result);
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

  // 🔥 filter category ตาม type
  const filteredCategory = useMemo(() => {
    return categoryList.filter((item) => item.type === type);
  }, [categoryList, type]);

  const formatDate = (dateObj) => {
    const yyyy = dateObj.getFullYear();
    const mm = String(dateObj.getMonth() + 1).padStart(2, "0");
    const dd = String(dateObj.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  const handleSubmit = () => {
    let newErrors = {};

    if (!name.trim()) newErrors.name = "Name is required";
    if (!amount.trim()) newErrors.amount = "Amount is required";
    if (!categoryId) newErrors.categoryId = "Category is required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    if (!name || !amount || !categoryId) return;

    const selectedCategory = categoryList.find(
      (item) => item._id === categoryId
    );

    const newItem = {
      name,
      note,
      amount: parseFloat(amount),
      type,
      categoryId,
      categoryName: selectedCategory?.name,
      transactionDate: formatDate(date),
    };

    onAdd(newItem);
    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Name<Text style={{ color: 'red' }}> *</Text></Text>
      <TextInput
        style={[styles.input, errors.name && styles.inputError]}
        value={name}
        onChangeText={(text) => {
          setName(text);
          setErrors((prev) => ({ ...prev, name: null }));
        }}
      />
      {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

      <Text style={styles.label}>Note</Text>
      <TextInput
        style={[styles.input, styles.multiline]}
        value={note}
        onChangeText={setNote}
        multiline
      />

      <Text style={styles.label}>Amount<Text style={{ color: 'red' }}> *</Text></Text>
      <TextInput
        style={[styles.input, errors.amount && styles.inputError]}
        value={amount}
        onChangeText={(text) => {
          setAmount(text.replace(/[^0-9.]/g, ""));
          setErrors((prev) => ({ ...prev, amount: null }));
        }}
        keyboardType="numeric"
      />
      {errors.amount && <Text style={styles.errorText}>{errors.amount}</Text>}

      <Text style={styles.label}>Type</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={type}
          onValueChange={(value) => {
            setType(value);
            setCategoryId(""); // reset category เมื่อเปลี่ยน type
          }}
        >
          <Picker.Item label="Income" value="income" />
          <Picker.Item label="Expense" value="expense" />
        </Picker>
      </View>

      <Text style={styles.label}>Category<Text style={{ color: 'red' }}> *</Text></Text>
      <View style={[styles.pickerWrapper, errors.categoryId && styles.inputError]}>
        <Picker
          selectedValue={categoryId}
          onValueChange={(value) => {
            setCategoryId(value);
            setErrors((prev) => ({ ...prev, categoryId: null }));
          }}
        >
          <Picker.Item label="Select category" value="" />
          {filteredCategory.map((item) => (
            <Picker.Item
              key={item._id}
              label={item.name}
              value={item._id}
            />
          ))}
        </Picker>
      </View>
      {errors.categoryId && (
        <Text style={styles.errorText}>{errors.categoryId}</Text>
      )}

      <Text style={styles.label}>Transaction Date</Text>
      {Platform.OS === "web" ? (
        <input
          type="date"
          value={date.toISOString().split("T")[0]}
          onChange={(e) => setDate(new Date(e.target.value))}
          style={{ padding: 10, fontSize: 16 }}
        />
      ) : (
        <>
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => setShowDatePicker(true)}
          >
            <Text>{formatDate(date)}</Text>
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={(event, selectedDate) => {
                setShowDatePicker(false);
                if (selectedDate) {
                  setDate(selectedDate);
                }
              }}
            />
          )}
        </>
      )}

      <View style={{ marginTop: 20 }}>
        <Button title="Add Transaction" onPress={handleSubmit} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  label: {
    marginBottom: 6,
    fontWeight: "600",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  multiline: {
    height: 80,
    textAlignVertical: "top",
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    marginBottom: 16,
  },
  dateButton: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
  },
  inputError: {
    borderColor: "red",
  },

  errorText: {
    color: "red",
    marginBottom: 10,
    fontSize: 12,
  },
});