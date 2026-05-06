import { StyleSheet } from 'react-native';

export const dashboardStyles = StyleSheet.create({
    container: { flex: 1, padding: 30, backgroundColor: '#F5F7FA' },
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
    },
    addButton: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: "#4CAF50",
        justifyContent: "center",
        alignItems: "center",
    },
    addText: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "bold",
        lineHeight: 22,
    },
});