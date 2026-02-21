//App.js
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";

import HomeScreen from "./screens/main-menu/HomeScreen";
import TransactionScreen from "./screens/transaction/TransactionScreen";
import AddWalletScreen from "./screens/wallet/AddWalletScreen";
import WalletScreen from "./screens/wallet/WalletScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import SignInScreen from "./src/screens/SignInScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs({ setIsLoggedIn }) {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home">
        {(props) => (
          <HomeScreen
            {...props}
            setIsLoggedIn={setIsLoggedIn}
          />
        )}
      </Tab.Screen>

      <Tab.Screen
        name="Transactions"
        component={TransactionScreen}
      />

      <Tab.Screen
        name="Wallets"
        component={WalletScreen}
      />
    </Tab.Navigator>
  );
}


export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    checkLogin();
  }, []);

  const checkLogin = async () => {
    const token = await AsyncStorage.getItem("token");
    setIsLoggedIn(!!token);
  };

  if (isLoggedIn === null) return null;

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <Stack.Navigator>
          <Stack.Screen
            name="MainTabs"
            options={{ headerShown: false }}
          >
            {() => <MainTabs
              setIsLoggedIn={setIsLoggedIn} />}
          </Stack.Screen>

          <Stack.Screen name="Add Wallet" component={AddWalletScreen} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name="SignIn"
            options={{ headerShown: false }}
          >
            {(props) => (
              <SignInScreen
                {...props}
                setIsLoggedIn={setIsLoggedIn}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="Register" component={RegisterScreen} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
