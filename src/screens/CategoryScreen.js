import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLayoutEffect, useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { FlatList, Text, TouchableOpacity, View, Modal } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Feather } from "@expo/vector-icons";

import { getCategoriesList } from '../services/categoryService';
import { categoryStyles as styles } from '../styles/categoryStyles';

export default function CategoryScreen({ navigation, setIsLoggedIn }) {

  const [categoryList, setCategoryList] = useState([]);

  const [filteredList, setFilteredList] = useState([]);

  const [open, setOpen] = useState(false);
  const [valueDDL, setValueDDL] = useState(null);
  const [items, setItems] = useState([
    { label: 'Income', value: 'income' },
    { label: 'Expense', value: 'expense' }
  ]);

  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useLayoutEffect(() => {

    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={styles.headerWalletButton}
          onPress={() => {
            navigation.navigate('AddCategory');
          }}
        >
          <Text style={styles.headerButtonText}>+</Text>
        </TouchableOpacity>
      ),
    });

  }, [navigation]);

  useFocusEffect(
    useCallback(() => {

      const fetchData = async () => {
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

      fetchData();

      setValueDDL(null);
    }, [])
  );

  const handleSelect = (value) => {
    const filtered = categoryList.filter(item => item.type === value);
    setFilteredList(filtered);
  };

  const handleDelete = (item) => {
    setSelectedItem(item);
    setDeleteModalVisible(true);
  };

  const confirmDelete = () => {
    console.log("Deleting:", selectedItem);

    // ใส่ logic ลบจริงตรงนี้ เช่น call API หรือ setState
    // deleteCategory(selectedItem.id)

    setDeleteModalVisible(false);
    setSelectedItem(null);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card}>

      <Text style={styles.categoryText}>
        Category: {item.name}
      </Text>

      {/* ปุ่มล่างขวา */}
      <View style={styles.actionContainer}>

        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => handleDelete(item)}
        >
          <Feather name="trash-2" size={18} />
        </TouchableOpacity>
      </View>

    </TouchableOpacity>
  );
  return (
    <View style={styles.container}>
      <View style={{ zIndex: 1000 }}>
        <DropDownPicker
          open={open}
          value={valueDDL}
          items={items}
          setOpen={setOpen}
          setValue={setValueDDL}
          setItems={setItems}
          placeholder="Select a type"
          onChangeValue={handleSelect}
        />
      </View>
      {valueDDL !== null ? (
        <FlatList
          data={filteredList}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
        />
      ) : null}

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
              {selectedItem?.name} ?
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