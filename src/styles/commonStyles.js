import { StyleSheet } from 'react-native';

export const commonStyles = StyleSheet.create({
    containerSignIn: { flex: 1, justifyContent: 'center', padding: 30, backgroundColor: '#FAF9F6' },
    container: { flex: 1, padding: 30, backgroundColor: '#FAF9F6' },
    title: { fontSize: 24, marginBottom: 20, textAlign: 'center', fontWeight: 'bold' },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
    activeBtn: {
        backgroundColor: "#28A745",
        padding: 12,
        borderRadius: 8,
        alignItems: "center",
    },
    btnText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },
    linkTxt: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'right',
        fontWeight: 'bold',
        textDecorationLine: 'underline',
        color: '#0053ee'
    },
    labelFormText: { fontSize: 14, marginBottom: 10 },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 10,
        paddingRight: 10,
    }, inputName: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
        marginEnd: 5
    },
    passwordInput: {
        flex: 1,
        padding: 10,
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,      // ย้ายมาไว้ที่นี่
        borderColor: '#ccc', // ย้ายมาไว้ที่นี่
        borderRadius: 8,
        paddingRight: 10,    // เว้นระยะให้ไอคอน
        marginBottom: 10,
    },
    confirmPasswordInput: {
        flex: 1,
        padding: 10,
        // ลบ borderWidth และ borderColor ออกจากตรงนี้
    },
    inputError: {
        borderColor: 'red' // เมื่อ error เส้นขอบของ container จะแดงทั้งหมด
    },
    errorText: { color: 'red', fontSize: 14, marginBottom: 10 },
    grid: { justifyContent: 'center' },
    card: {
        flex: 1,
        margin: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        elevation: 3,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
    }, cardText: { fontSize: 16, fontWeight: '600' },
    headerButton: {
        marginRight: 10, // เว้นระยะห่างด้านขวาจากขอบจอ
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: '#cf2222ff', // สีพื้นหลังของปุ่ม
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerButtonText: {
        color: 'white', // สีตัวอักษร
        fontSize: 16,
        fontWeight: 'bold',
    }, balanceSection: {
        padding: 20,
        borderBottomWidth: 1,
    },

    balanceTitle: {
        fontSize: 18,
        fontWeight: "600",
    },

    balanceAmount: {
        fontSize: 26,
        marginTop: 8,
    },

    walletSection: {
        padding: 20,
        borderBottomWidth: 1,
    },

    walletHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    walletTitle: {
        fontSize: 18,
        fontWeight: "600",
    }, walletRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 15,
    },
    walletCard: {
        flex: 1,
        marginBottom: 15,
        marginHorizontal: 5,
        padding: 20,
        borderRadius: 20,
        borderWidth: 2,
        backgroundColor: "#fff",
        marginEnd: 5
    },
    walletName: {
        fontSize: 20,
        marginBottom: 10,
    },

    walletAmount: {
        fontSize: 18,
    },

    activitySection: {
        flex: 1,
        padding: 20,
    },

    activityTitle: {
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 10,
    },

    activityRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10,
    },

    activityText: {
        fontSize: 16,
    },

    amountText: {
        fontSize: 16,
        fontWeight: "600",
    }, grid: { justifyContent: 'center' },
    card: {
        flex: 1,
        margin: 8,
        padding: 16,
        borderRadius: 12,
        backgroundColor: "#FFF",
        borderWidth: 1,
        borderColor: "#eee",
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: "600",
        color: "#333",
    },
    cardAmount: {
        fontSize: 16,
        fontWeight: "500",
        marginTop: 4,
        color: "#008000",
    },
    cardType: {
        fontSize: 14,
        marginTop: 4,
        color: "#666",
    },
    cardText: { fontSize: 16, fontWeight: '600' },
    headerWalletButton: {
        marginRight: 10, // เว้นระยะห่างด้านขวาจากขอบจอ
        paddingHorizontal: 10,
        paddingVertical: 10,
        backgroundColor: '#28A745', // สีพื้นหลังของปุ่ม
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tdSafeArea: {
        flex: 1,
        backgroundColor: "#f5f7fa",
    },

    tdContainer: {
        flex: 1,
        padding: 16,
    },

    tdTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
    },

    tdFilterRow: {
        marginBottom: 10,
    },

    tdMonthButton: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        backgroundColor: "#e0e0e0",
        borderRadius: 20,
        marginRight: 8,
    },

    tdMonthActive: {
        backgroundColor: "#4CAF50",
    },

    tdMonthText: {
        fontSize: 13,
        color: "#333",
    },

    tdMonthTextActive: {
        color: "#fff",
        fontWeight: "bold",
    },

    tdYearRow: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 15,
    },

    tdYearButton: {
        fontSize: 18,
        paddingHorizontal: 20,
    },

    tdYearText: {
        fontSize: 18,
        fontWeight: "bold",
    },

    tdCard: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 15,
        marginBottom: 15,
        elevation: 3,
    },

    tdCardTitle: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 10,
    },

    tdLegendText: {
        fontSize: 14,
        marginTop: 5,
    },

    tdSummaryCard: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 15,
        elevation: 3,
    },

    tdSummaryTitle: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 10,
    },

    tdSummaryRow: {
        flexDirection: "row",
        justifyContent: "space-between",
    },

    tdIncomeBox: {
        flex: 1,
        backgroundColor: "#e8f5e9",
        padding: 12,
        borderRadius: 10,
        marginRight: 8,
    },

    tdExpenseBox: {
        flex: 1,
        backgroundColor: "#ffebee",
        padding: 12,
        borderRadius: 10,
        marginLeft: 8,
    },

    tdSummaryLabel: {
        fontSize: 13,
        color: "#555",
    },

    tdSummaryValue: {
        fontSize: 16,
        fontWeight: "bold",
        marginTop: 5,
    },

    tdHeaderButton: {
        marginRight: 15,
    },

    tdHeaderButtonText: {
        fontSize: 22,
        color: "#000",
    },
    tdListCard: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 15,
        marginTop: 15,
        elevation: 3,
    },

    tdListTitle: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 10,
    },

    tdEmptyText: {
        fontSize: 14,
        color: "#777",
        textAlign: "center",
        paddingVertical: 10,
    },

    tdListRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 10,
        borderBottomWidth: 0.5,
        borderColor: "#ddd",
    },

    tdListDate: {
        fontSize: 13,
        color: "#666",
    },

    tdListNote: {
        fontSize: 14,
        marginTop: 3,
    },

    tdAmount: {
        fontSize: 15,
        fontWeight: "bold",
    },

    tdIncomeText: {
        color: "#4CAF50",
    },

    tdExpenseText: {
        color: "#F44336",
    },
});