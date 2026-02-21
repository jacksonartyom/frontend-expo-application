// screens/SignInScreen.js
import { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { login } from '../services/authService';
import { commonStyles as styles } from '../styles/commonStyles';


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
        <View style={styles.containerSignIn}>
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
            />
            <View style={styles.containerRegister}>
                <Text style={styles.linkTxt} onPress={() => navigation.navigate("Register")}>Register</Text>
            </View>
            <TouchableOpacity style={styles.activeBtn} onPress={handleLogin}>
                <Text style={styles.btnText}>Sign in</Text>
            </TouchableOpacity>
        </View>
    );
}