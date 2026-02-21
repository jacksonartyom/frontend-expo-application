import React, { useState, useEffect, useLayoutEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  TouchableOpacity
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PieChart } from "react-native-chart-kit";

export default function TransactionScreen({ route, navigation }) {
  const [transactions, setTransactions] = useState([]);
  const { walletId, walletName } = route.params || {};

  useLayoutEffect(() => {

    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => {
            // navigation.navigate('Add Wallet');
          }}
        >
          <Text style={styles.headerButtonText}>+</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    if (walletId) fetchTransactionByWallet(walletId);
  }, [walletId]);

  const fetchTransactionByWallet = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/dev/transaction?walletId=${id}`);
      const data = await response.json();
      setTransactions(data.result || []);
    } catch (err) {
      console.error("Fetch transaction error:", err);
    }
  };

  // summary
  const income = transactions

    .reduce((sum, t) => sum + (t.deposit || 0), 0);

  const expense = transactions
    .reduce((sum, t) => sum + (t.withdraw || 0), 0);

  const pieData = [
    {
      name: "รายรับ",
      amount: income,           // ตัวเลขจริง
      color: "#4CAF50",
      legendFontColor: "#333",
      legendFontSize: 15
    },
    {
      name: "รายจ่าย",
      amount: expense,          // ตัวเลขจริง
      color: "#F44336",
      legendFontColor: "#333",
      legendFontSize: 15
    }
  ];



  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>

        {/* Page Title */}
        <Text style={styles.title}>📊 สรุปยอดของ {walletName}</Text>

        <ScrollView showsVerticalScrollIndicator={false}>

          {/* Chart Card */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>ภาพรวมรายรับ - รายจ่าย</Text>

            <PieChart
              data={pieData}
              width={Dimensions.get("window").width - 40}
              height={260}
              chartConfig={{
                backgroundColor: "#ffffff",
                backgroundGradientFrom: "#ffffff",
                backgroundGradientTo: "#ffffff",
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(0,0,0,${opacity})`,
              }}
              accessor="amount"
              backgroundColor="transparent"
              paddingLeft="26"
              absolute
            />

            {pieData.map((item, index) => (
              <Text key={index} style={{ color: item.legendFontColor, fontSize: item.legendFontSize }}>
                {item.name}: {item.amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </Text>
            ))}

          </View>

          {/* Income & Expense summary */}
          <View style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>📌 สรุปตัวเลข</Text>

            <View style={styles.summaryRow}>
              <View style={styles.summaryBoxIncome}>
                <Text style={styles.summaryLabel}>รายรับ</Text>
                <Text style={styles.summaryValue}>{income.toLocaleString()} ฿</Text>
              </View>

              <View style={styles.summaryBoxExpense}>
                <Text style={styles.summaryLabel}>รายจ่าย</Text>
                <Text style={styles.summaryValue}>{expense.toLocaleString()} ฿</Text>
              </View>
            </View>
          </View>

        </ScrollView>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#f3f4f6" },
  container: { flex: 1, padding: 16 },

  // Title
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#111827"
  },

  // Chart Card
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4
  },
  cardTitle: {
    fontSize: 18,
    textAlign: "center",
    fontWeight: "600",
    marginBottom: 14,
    color: "#374151"
  },

  // Summary Section
  summaryCard: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 16,
    marginTop: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
    color: "#374151"
  },

  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between"
  },

  summaryBoxIncome: {
    flex: 1,
    marginRight: 8,
    backgroundColor: "#e8f5e9",
    padding: 16,
    borderRadius: 12
  },
  summaryBoxExpense: {
    flex: 1,
    marginLeft: 8,
    backgroundColor: "#ffebee",
    padding: 16,
    borderRadius: 12
  },
  summaryLabel: {
    fontSize: 16,
    color: "#555",
    marginBottom: 6,
    fontWeight: "500"
  },
  summaryValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111"
  },
  headerButton: {
    marginRight: 10, // เว้นระยะห่างด้านขวาจากขอบจอ
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#33CC33', // สีพื้นหลังของปุ่ม
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerButtonText: {
    color: 'white', // สีตัวอักษร
    fontSize: 18,
    fontWeight: 'bold',
  },
});
