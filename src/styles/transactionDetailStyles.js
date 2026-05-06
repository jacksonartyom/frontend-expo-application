import { StyleSheet } from 'react-native';

export const transactionDetailStyles = StyleSheet.create({
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
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#F5F7FA",
    },

    dropdownWrapper: {
        zIndex: 1000,
    },

    addButtonWrapper: {
        marginTop: 30,   // 👈 ดันปุ่มลงมา
    },

    listContainer: {
        marginTop: 20,
        paddingBottom: 20,
    },

    listItem: {
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },

    saveButtonWrapper: {
        marginTop: 20,
    },
    listItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
        backgroundColor: "#fff",
    },

    gridLeft: {
        flex: 1,
    },

    gridCenter: {
        flex: 1,
    },

    gridRight: {
        flex: 1,
        alignItems: "flex-end",
    },

    categoryText: {
        fontSize: 16,
        color: "#888",
        fontWeight: "bold",
        textTransform: "uppercase"
    },

    nameText: {
        fontSize: 14,
        fontWeight: "500",
    },

    amountText: {
        fontSize: 14,
        fontWeight: "bold",
    },
    addButton: {
        backgroundColor: "#2E86FF",
        padding: 14,
        borderRadius: 8,
        alignItems: "center",
    },

    addButtonDisabled: {
        backgroundColor: "#ccc",
    },

    addButtonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },
    deleteButton: {
        marginLeft: 10,
        padding: 6,
    },

    listItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
        backgroundColor: "#fff",
    },
    tdIncomeText: {
        color: "#16a34a",
        fontWeight: "bold",
    },

    tdExpenseText: {
        color: "#dc2626",
        fontWeight: "bold",
    },
});