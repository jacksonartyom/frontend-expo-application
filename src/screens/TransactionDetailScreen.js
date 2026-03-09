import { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { transactionDetailStyles as styles } from "../styles/transactionDetailStyles";
import { getTransactionListByCondition } from "../services/transactionService";

export default function TransactionDetailScreen({ route, navigation }) {
  const [transactions, setTransactions] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(
    new Date().getMonth() + 1
  );
  const [selectedYear, setSelectedYear] = useState(
    new Date().getFullYear()
  );

  const mockTransactions = [
    {
      id: "t001",
      walletId: "w001",
      transaction_date: "2026-02-01",
      note: "เงินเดือน",
      deposit: 35000,
      withdraw: 0,
    },
    {
      id: "t002",
      walletId: "w001",
      transaction_date: "2026-02-03",
      note: "ค่าอาหาร",
      deposit: 0,
      withdraw: 450,
    },
    {
      id: "t003",
      walletId: "w001",
      transaction_date: "2026-02-05",
      note: "ค่าน้ำมัน",
      deposit: 0,
      withdraw: 1200,
    },
    {
      id: "t004",
      walletId: "w001",
      transaction_date: "2026-02-10",
      note: "ขายของออนไลน์",
      deposit: 5200,
      withdraw: 0,
    },
    {
      id: "t005",
      walletId: "w001",
      transaction_date: "2026-02-15",
      note: "Netflix",
      deposit: 0,
      withdraw: 419,
    },
    {
      id: "t006",
      walletId: "w001",
      transaction_date: "2026-02-20",
      note: "ค่าไฟ",
      deposit: 0,
      withdraw: 1800,
    },
  ];

  const { walletId, walletName } = route.params || {};

  useEffect(() => {
    console.log("walletId : " + walletId);
    console.log("selectedMonth : " + selectedMonth);
    console.log("selectedYear : " + selectedYear);

    if (walletId && selectedMonth && selectedYear) {
      fetchTransactionByWallet(walletId, selectedYear, selectedMonth);
    }
  }, [walletId, selectedMonth, selectedYear]);

  const fetchTransactionByWallet = async (id, year, month) => {
    try {
      const token = await AsyncStorage.getItem("token");

      const condition = {
        walletId: id,
        year: year,
        month: month,
      };

      const response = await getTransactionListByCondition(token, condition);
      const data = await response.json();

      setTransactions(data.result || []);
    } catch (err) {
      console.error("Fetch transaction error:", err);
    }
  };

  const income = transactions.reduce(
    (sum, t) => sum + (t.type === "income" ? t.amount : 0),
    0
  );

  const expense = transactions.reduce(
    (sum, t) => sum + (t.type === "expense" ? t.amount : 0),
    0
  );

  const months = [
    "ม.ค.",
    "ก.พ.",
    "มี.ค.",
    "เม.ย.",
    "พ.ค.",
    "มิ.ย.",
    "ก.ค.",
    "ส.ค.",
    "ก.ย.",
    "ต.ค.",
    "พ.ย.",
    "ธ.ค.",
  ];

  return (
    <SafeAreaView style={styles.tdSafeArea}>
      <View style={styles.tdContainer}>
        {/* Month / Year Selector */}
        <View style={styles.tdFilterRow}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {months.map((m, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.tdMonthButton,
                  selectedMonth === index + 1 && styles.tdMonthActive,
                ]}
                onPress={() => setSelectedMonth(index + 1)}
              >
                <Text
                  style={[
                    styles.tdMonthText,
                    selectedMonth === index + 1 && styles.tdMonthTextActive,
                  ]}
                >
                  {m}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.tdYearRow}>
          <TouchableOpacity
            onPress={() => setSelectedYear(selectedYear - 1)}
          >
            <Text style={styles.tdYearButton}>◀</Text>
          </TouchableOpacity>

          <Text style={styles.tdYearText}>{selectedYear}</Text>

          <TouchableOpacity
            onPress={() => setSelectedYear(selectedYear + 1)}
          >
            <Text style={styles.tdYearButton}>▶</Text>
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.tdSummaryCard}>
            <Text style={styles.tdSummaryTitle}>📌 สรุปตัวเลข</Text>

            <View style={styles.tdSummaryRow}>
              <View style={styles.tdIncomeBox}>
                <Text style={styles.tdSummaryLabel}>รายรับ</Text>
                <Text style={styles.tdSummaryValue}>
                  {income.toLocaleString()} ฿
                </Text>
              </View>

              <View style={styles.tdExpenseBox}>
                <Text style={styles.tdSummaryLabel}>รายจ่าย</Text>
                <Text style={styles.tdSummaryValue}>
                  {expense.toLocaleString()} ฿
                </Text>
              </View>
            </View>
          </View>

          {/* Transaction Detail List */}
          <View style={styles.tdListCard}>
            <Text style={styles.tdListTitle}>📄 รายการธุรกรรม</Text>

            {transactions.length === 0 ? (
              <Text style={styles.tdEmptyText}>
                ไม่มีรายการในเดือนนี้
              </Text>
            ) : (
              [...transactions]
                .sort(
                  (a, b) =>
                    new Date(b.transaction_date) -
                    new Date(a.transaction_date)
                )
                .map((item, index) => {
                  const isIncome = item.type === "income";

                  return (
                    <View key={index} style={styles.tdListRow}>
                      <View>
                        <Text style={styles.tdListDate}>
                          {new Date(
                            item.transaction_date
                          ).toLocaleDateString()}
                        </Text>
                        <Text style={styles.tdListNote}>
                          {item.name || "-"}
                        </Text>
                        <Text style={styles.tdListNote}>
                          {item.note || "-"}
                        </Text>
                      </View>

                      <Text
                        style={[
                          styles.tdAmount,
                          isIncome
                            ? styles.tdIncomeText
                            : styles.tdExpenseText,
                        ]}
                      >
                        {isIncome ? "+" : "-"}
                        {Number(item.amount).toLocaleString()} ฿
                      </Text>
                    </View>
                  );
                })
            )}
          </View>
        </ScrollView>
      </View>


    </SafeAreaView>
  );
}