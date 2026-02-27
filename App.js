//App.js
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";

import SignInScreen from "./src/screens/SignInScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import DashboardScreen from "./src/screens/DashboardScreen";
import TransactionScreen from "./screens/transaction/TransactionScreen";
import TransactionDetailScreen from "./src/screens/TransactionDetailScreen";
import WalletScreen from "./src/screens/WalletScreen";
import WalletCreateScreen from "./src/screens/WalletCreateScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function DashboardStack({ setIsLoggedIn }) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Dashboard">
        {(props) => (
          <DashboardScreen
            {...props}
            setIsLoggedIn={setIsLoggedIn}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

function TransactionStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TransactionList"
        component={TransactionScreen}
        options={{ title: "Transactions" }}
      />

      {/* เพิ่มหน้า detail / add ได้ตรงนี้ */}
      {/* <Stack.Screen name="TransactionDetail" component={TransactionDetailScreen} /> */}
    </Stack.Navigator>
  );
}

function WalletStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="WalletList"
        component={WalletScreen}
        options={{ title: "Wallets" }}
      />

      <Stack.Screen
        name="AddWallet"
        component={WalletCreateScreen}
        options={{ title: "Add Wallets" }}
      />
      <Stack.Screen
        name="TransactionDetail"
        component={TransactionDetailScreen}
        options={{ title: "Transactions Detail" }}
      />
      {/* เพิ่มหน้า detail / add ได้ตรงนี้ */}
    </Stack.Navigator>
  );
}

function MainTabs({ setIsLoggedIn }) {
  return (
    <Tab.Navigator>

      <Tab.Screen
        name="DashboardTab"
        options={{ headerShown: false, title: "Dashboard" }}
      >
        {(props) => (
          <DashboardStack
            {...props}
            setIsLoggedIn={setIsLoggedIn}
          />
        )}
      </Tab.Screen>

      <Tab.Screen
        name="TransactionsTab"
        component={TransactionStack}
        options={{ headerShown: false, title: "Transactions" }}
      />

      <Tab.Screen
        name="WalletsTab"
        component={WalletStack}
        options={{ headerShown: false, title: "Wallets" }}
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
