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
    }
});