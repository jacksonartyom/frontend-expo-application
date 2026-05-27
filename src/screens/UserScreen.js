import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLayoutEffect, useState, useCallback, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { FlatList, Text, TouchableOpacity, View, Modal, Image } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Feather } from "@expo/vector-icons";
import { Ionicons } from '@expo/vector-icons';

import { getUserProfile } from '../services/userService';
import { userStyles as styles } from '../styles/userStyles';
import * as ImagePicker from 'expo-image-picker';
import ImagePickerSection from "../componants/ImagePickerSection";

export default function UserScreen({ navigation, setIsLoggedIn }) {

  const [userProfile, setUserProfile] = useState({});
  const [userImg, setUserImg] = useState(false);

  const [image, setImage] = useState(null);

  const removeImage = () => {
    setImage(null);
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity style={styles.signOutBtn} onPress={handleSignOut}>
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

  const fetchData = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await getUserProfile(token);
      const data = await response.json();

      if (data.result) {
        setUserProfile(data.result);
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

  return (
    <View style={styles.container}>

      {/* 🔼 ส่วนบน */}
      <View style={styles.content}>
        {userProfile.imageProfile ? (
          <Image
            source={{ uri: userProfile.imageProfile }}
            style={styles.avatar}
          />
        ) : (
          <Ionicons name={"person-circle-outline"} size={100} />
        )}



        <Text style={styles.name}>
          {userProfile.firstName} {userProfile.midName || ""} {userProfile.lastName}
        </Text>

        <Text style={styles.phone}>
          {userProfile.phoneNo || "-"}
        </Text>




      </View>
      {/* <ImagePickerSection
        image={image}
        pickImage={pickImage}
        removeImage={removeImage}
        name={"Change Image"}
      /> */}


    </View>);
}