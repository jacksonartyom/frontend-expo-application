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
});