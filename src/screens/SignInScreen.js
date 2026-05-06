// screens/SignInScreen.js
import { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View, ScrollView } from 'react-native';
import { login } from '../services/authService';
import { signinStyles as styles } from '../styles/signinStyles';


export default function SignInScreen({ navigation, setIsLoggedIn }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        const result = await login(email, password);

        if (result.success) {
            setIsLoggedIn(true);
        } else {
            alert(result.message || 'Login failed');
        }
    };

    return (

        <ScrollView contentContainerStyle={styles.containerSignIn}>
            <Text style={styles.title}>TOGETHERPLACE</Text>
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
            />
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={styles.input}
                onSubmitEditing={handleLogin}
                returnKeyType="done"
            />
            <View style={styles.containerRegister}>
                <Text style={styles.linkTxt} onPress={() => navigation.navigate("Register")}>Register</Text>
            </View>
            <TouchableOpacity style={styles.activeBtn} onPress={handleLogin}>
                <Text style={styles.btnText}>Sign in</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}