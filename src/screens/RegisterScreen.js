import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { commonStyles as styles } from '../styles/commonStyles';
import { register } from "../services/authService";

export default function RegisterScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNo, setPhoneNo] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errorConfirmPassword, setErrorConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});

    const validate = () => {
        if (confirmPassword !== '' && password !== confirmPassword) {
            setErrorConfirmPassword('Confirm password not correct, please try again');
        } else {
            setErrorConfirmPassword('');
        }
    };

    const handleRegister = async () => {
        let newErrors = {};

        if (!email) newErrors.email = 'Email is required';
        if (!firstName) newErrors.firstName = 'First Name is required';
        if (!lastName) newErrors.lastName = 'Last Name is required';
        if (!password) newErrors.password = 'Password is required';

        if (password !== confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) return;

        const requestBody = {
            email,
            firstName,
            lastName,
            middleName,
            phoneNo,
            password
        };

        const result = await register(requestBody);

        if (result.success) {
            alert("Register successful 🎉");
            navigation.navigate("SignIn")
        } else {
            setErrors(prev => ({
                ...prev,
                email: result.message
            }));
            return;
        }


    };

    return (
        <View style={styles.container}>
            <Text style={styles.labelFormText}>Email<Text style={{ color: 'red' }}> *</Text></Text>
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={(val) => { setEmail(val); setErrors({ ...errors, email: '' }); }}
                style={[styles.input, errors.email ? styles.inputError : null]}
            />
            {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
            <Text style={styles.labelFormText}>Name</Text>
            <View style={{ flexDirection: 'row', width: '100%' }}>
                <View style={{ flex: 1, marginRight: 5 }}>
                    <TextInput
                        placeholder="First"
                        value={firstName}
                        onChangeText={(val) => { setFirstName(val); setErrors({ ...errors, firstName: '' }); }}
                        style={[styles.inputName, errors.firstName ? styles.inputError : null]}
                    />
                    {errors.firstName ? (
                        <Text style={styles.errorText}>
                            {errors.firstName}
                        </Text>
                    ) : null}
                </View>
                <View style={{ flex: 1, marginRight: 5 }}>
                    <TextInput placeholder="Middle" value={middleName} onChangeText={setMiddleName} style={styles.inputName} />
                </View>
                <View style={{ flex: 1 }}><TextInput
                    placeholder="Last"
                    value={lastName}
                    onChangeText={(val) => { setLastName(val); setErrors({ ...errors, lastName: '' }); }}
                    style={[styles.inputName, errors.lastName ? styles.inputError : null]}
                />
                    {errors.lastName ? (
                        <Text style={styles.errorText}>
                            {errors.lastName}
                        </Text>
                    ) : null}
                </View>
            </View>

            <Text style={styles.labelFormText}>Phone No</Text>
            <TextInput placeholder="Phone No" value={phoneNo} onChangeText={setPhoneNo} style={styles.input} />

            {/* Password */}
            <Text style={styles.labelFormText}>Password<Text style={{ color: 'red' }}> *</Text></Text>
            <View style={[styles.passwordContainer, errors.password ? styles.inputError : null]}>
                <TextInput
                    placeholder="Password"
                    value={password}
                    onChangeText={(val) => { setPassword(val); setErrors({ ...errors, password: '' }); }}
                    style={styles.passwordInput}
                    secureTextEntry={!showPassword}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <Ionicons name={showPassword ? "eye-off" : "eye"} size={24} color="gray" />
                </TouchableOpacity>
            </View>
            {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}

            <Text style={styles.labelFormText}>Confirm Password</Text>
            <View style={[styles.passwordContainer, (errorConfirmPassword || errors.confirmPassword) ? styles.inputError : null]}>
                <TextInput
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChangeText={(val) => {
                        setConfirmPassword(val);
                        setErrorConfirmPassword('');
                        setErrors({ ...errors, confirmPassword: '' });
                    }}
                    onBlur={validate}
                    style={styles.confirmPasswordInput}
                    secureTextEntry={!showConfirmPassword}
                />
                <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                    <Ionicons name={showConfirmPassword ? "eye-off" : "eye"} size={24} color="gray" />
                </TouchableOpacity>
            </View>
            {(errorConfirmPassword || errors.confirmPassword) ? (
                <Text style={styles.errorText}>{errorConfirmPassword || errors.confirmPassword}</Text>
            ) : null}

            {/* เพิ่ม onPress เพื่อเรียกฟังก์ชัน handleRegister */}
            <TouchableOpacity style={styles.activeBtn} onPress={handleRegister}>
                <Text style={styles.btnText}>Register</Text>
            </TouchableOpacity>
        </View>
    );
}
