import { StyleSheet } from 'react-native';

export const signinStyles = StyleSheet.create({
    containerSignIn: { flex: 1, justifyContent: 'center', padding: 30, backgroundColor: '#F5F7FA' },
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
    containerSignUp: {
        width: "100%",
        alignItems: "flex-end",
        marginBottom: 15,
    },

});