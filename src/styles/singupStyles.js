import { StyleSheet } from 'react-native';

export const singupStyles = StyleSheet.create({
    container: { flex: 1, padding: 30, backgroundColor: '#F5F7FA' },
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
    labelFormText: { fontSize: 14, marginBottom: 10 },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 10,
        paddingRight: 10,
    },
    inputName: {
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
});