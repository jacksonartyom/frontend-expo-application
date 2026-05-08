//App.js
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { Ionicons } from '@expo/vector-icons';

import SignInScreen from "./src/screens/SignInScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import DashboardScreen from "./src/screens/DashboardScreen";
import TransactionMainScreen from "./src/screens/TransactionMainScreen";
import TransactionCreateScreen from "./src/screens/TransactionCreateScreen";
import TransactionDetailScreen from "./src/screens/TransactionDetailScreen";
import WalletScreen from "./src/screens/WalletScreen";
import WalletCreateScreen from "./src/screens/WalletCreateScreen";
import WalletUpdateScreen from "./src/screens/WalletUpdateScreen";
import CategoryScreen from "./src/screens/CategoryScreen";
import CategoryCreateScreen from "./src/screens/CategoryCreateScreen";

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
      <Stack.Screen
        name="AddWallet"
        component={WalletCreateScreen}
        options={{ title: "Add Wallets" }}
      />
    </Stack.Navigator>
  );
}

function TransactionStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TransactionMain"
        component={TransactionMainScreen}
        options={{ title: "Transaction" }}
      />
      <Stack.Screen
        name="AddTransaction"
        component={TransactionCreateScreen}
        options={{ title: "Add Transaction" }}
      />
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
        name="EditWallet"
        component={WalletUpdateScreen}
        options={{ title: "Edit Wallets" }}
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

function CategoryStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CategoryList"
        component={CategoryScreen}
        options={{ title: "Category" }}
      />

      <Stack.Screen
        name="AddCategory"
        component={CategoryCreateScreen}
        options={{ title: "Add Category" }}
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
        options={{
          headerShown: false,
          title: "Dashboard",
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "podium" : "podium-outline"}
              size={size}
              color={color}
            />
          ),
        }}

        listeners={({ navigation }) => ({
          tabPress: (e) => {
            const state = navigation.getState();
            const tab = state.routes.find(r => r.name === 'DashboardTab');

            if (tab?.state?.index > 0) {
              navigation.navigate('DashboardTab', {
                screen: 'Dashboard',
              });
            }
          },
        })}
      >
        {(props) => (
          <DashboardStack
            {...props}
            setIsLoggedIn={setIsLoggedIn}
          />
        )}
      </Tab.Screen>

      <Tab.Screen
        name="WalletsTab"
        component={WalletStack}
        options={{
          headerShown: false,
          title: "Wallets",
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "cash" : "cash-outline"}
              size={size}
              color={color}
            />
          ),
        }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            const state = navigation.getState();
            const tab = state.routes.find(r => r.name === 'WalletsTab');

            if (tab?.state?.index > 0) {
              navigation.navigate('WalletsTab', {
                screen: 'WalletList',
              });
            }
          },
        })}
      />

      <Tab.Screen
        name="TransactionsTab"
        component={TransactionStack}
        options={{
          headerShown: false,
          title: "Transaction",
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "add-circle" : "add-circle-outline"}
              size={size}
              color={color}
            />
          ),
        }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            const state = navigation.getState();
            const tab = state.routes.find(r => r.name === 'TransactionsTab');

            if (tab?.state?.index > 0) {
              navigation.navigate('TransactionsTab', {
                screen: 'TransactionMain',
              });
            }
          },
        })}
      />

      <Tab.Screen
        name="CategoryTab"
        component={CategoryStack}
        options={{
          headerShown: false,
          title: "Category",
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "file-tray-full" : "file-tray-full-outline"}
              size={size}
              color={color}
            />
          ),
        }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            const state = navigation.getState();
            const tab = state.routes.find(r => r.name === 'CategoryTab');

            if (tab?.state?.index > 0) {
              navigation.navigate('CategoryTab', {
                screen: 'CategoryList',
              });
            }
          },
        })}
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
