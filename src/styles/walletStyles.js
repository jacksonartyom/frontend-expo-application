import { StyleSheet } from 'react-native';

export const walletStyles = StyleSheet.create({
    container: { flex: 1, padding: 30, backgroundColor: '#FAF9F6' },
    grid: { justifyContent: 'center' },
    headerButtonText: {
        color: 'white', // สีตัวอักษร
        fontSize: 16,
        fontWeight: 'bold',
    },
    labelFormText: { fontSize: 14, marginBottom: 10 },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
    inputError: {
        borderColor: 'red' // เมื่อ error เส้นขอบของ container จะแดงทั้งหมด
    },
    errorText: { color: 'red', fontSize: 14, marginBottom: 10 },
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
    card: {
        flex: 1,
        margin: 8,
        padding: 16,
        borderRadius: 12,
        paddingTop: 32,
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
    iconContainer: {
        position: "absolute",
        right: 10,
        top: 10,
        flexDirection: "row",
    },
    iconButton: {
        marginLeft: 10,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
    },

    modalContainer: {
        width: "85%",
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 16,
    },

    modalTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },

    modalMessage: {
        fontSize: 15,
        marginBottom: 20,
    },

    modalActions: {
        flexDirection: "row",
        justifyContent: "flex-end",
    },

    modalButton: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
        marginLeft: 10,
    },
    cancelButton: {
        backgroundColor: "#BDBDBD",
    },

    deleteButton: {
        backgroundColor: "#F44336",
    },

    balanceText: {
        fontSize: 18,
        fontWeight: "600",
        marginTop: 8,
        marginBottom: 20,
    }
});