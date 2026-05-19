// screens/SignInScreen.js
import { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View, ScrollView } from 'react-native';
import { signIn } from '../services/authService';
import { signinStyles as styles } from '../styles/signinStyles';


export default function SignInScreen({ navigation, setIsLoggedIn }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignIn = async () => {
        const result = await signIn(email, password);

        if (result.success) {
            setIsLoggedIn(true);
        } else {
            alert(result.message || 'Sign in failed');
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
                onSubmitEditing={handleSignIn}
                returnKeyType="done"
            />
            <View style={styles.containerSignUp}>
                <Text style={styles.linkTxt} onPress={() => navigation.navigate("Sign Up")}>Sign up</Text>
            </View>
            <TouchableOpacity style={styles.activeBtn} onPress={handleSignIn}>
                <Text style={styles.btnText}>Sign in</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}