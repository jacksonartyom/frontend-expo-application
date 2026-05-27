import { StyleSheet } from 'react-native';

export const userStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between', // 👈 ตัวสำคัญ
        padding: 20,
        backgroundColor: '#fff',
    },

    content: {
        alignItems: 'center',
    },

    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 16,
    },

    name: {
        fontSize: 20,
        fontWeight: 'bold',
    },

    phone: {
        fontSize: 16,
        color: 'gray',
        marginBottom: 20,
    },

    btnText: {
        marginTop: 10,
    },

    signOutBtn: {
        backgroundColor: 'red',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginRight: 20
    },

    signOutText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});