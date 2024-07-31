import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TokenContext } from '../components/TokenContext'; // Importar o contexto do token

const SignupScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [birthDate, setBirthDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');
  const { setToken } = useContext(TokenContext); // Usar o contexto do token

  const handleRegister = async () => {
    setLoading(true);
    try {
      const formattedBirthDate = birthDate.toISOString();

      const registerResponse = await fetch('https://fortuna-api.onrender.com/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
          birthDate: formattedBirthDate,
        }),
      });

      const registerData = await registerResponse.json();

      if (!registerResponse.ok) {
        setResponseMessage(registerData.message || 'Failed to register.');
        setLoading(false);
        return;
      }

      const token = registerData.token;
      setToken(token); // Armazenar o token no contexto
      setResponseMessage('Cadastro realizado com sucesso.');
      Alert.alert('Sucesso', 'Cadastro realizado com sucesso.');
      navigation.navigate('FinancialGoals'); // Redirecionar para FinancialGoalsScreen
    } catch (error) {
      setResponseMessage('Ocorreu um erro.');
      Alert.alert('Erro', 'Ocorreu um erro.');
    } finally {
      setLoading(false);
    }
  };

  const onChangeDate = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setBirthDate(selectedDate);
    }
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.headerText}>
          Crie sua conta, <Text style={styles.headerTextBold}>e aproveite nosso app. Estamos te esperando</Text>
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Seu nome"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Seu email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirme seu email"
          value={confirmEmail}
          onChangeText={setConfirmEmail}
        />
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.input}
            placeholder="Sua senha"
            secureTextEntry={secureTextEntry}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setSecureTextEntry(!secureTextEntry)}>
            <MaterialIcons name={secureTextEntry ? 'visibility-off' : 'visibility'} size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.input}
            placeholder="Confirme sua senha"
            secureTextEntry={secureTextEntry}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <TouchableOpacity onPress={() => setSecureTextEntry(!secureTextEntry)}>
            <MaterialIcons name={secureTextEntry ? 'visibility-off' : 'visibility'} size={24} color="black" />
          </TouchableOpacity>
        </View>
        {Platform.OS === 'web' ? (
          <View>
            <Text style={styles.datePickerLabel}>Data de nascimento</Text>
            <input
              type="date"
              value={birthDate.toISOString().split('T')[0]}
              onChange={(e) => setBirthDate(new Date(e.target.value))}
              style={styles.input}
            />
          </View>
        ) : (
          <TouchableOpacity onPress={showDatepicker}>
            <TextInput
              style={styles.input}
              placeholder="Data de nascimento"
              value={birthDate.toISOString().split('T')[0]}
              editable={false}
            />
          </TouchableOpacity>
        )}
        {showDatePicker && (
          <DateTimePicker
            value={birthDate}
            mode="date"
            display="default"
            onChange={onChangeDate}
          />
        )}
        <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={loading}>
          <Text style={styles.buttonText}>Criar sua conta</Text>
        </TouchableOpacity>
        {responseMessage ? (
          <Text style={styles.responseMessage}>{responseMessage}</Text>
        ) : null}
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginText}>Você já tem uma conta? <Text style={styles.loginTextBold}>Logar!</Text></Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
  },
  formContainer: {
    marginTop: '40%',
    padding: 20,
  },
  headerText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  headerTextBold: {
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    flex: 1,
  },
  datePickerLabel: {
    fontSize: 18,
    marginBottom: 10,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#8A2BE2',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  responseMessage: {
    textAlign: 'center',
    color: 'red',
    marginBottom: 20,
  },
  loginText: {
    textAlign: 'center',
    color: '#000',
  },
  loginTextBold: {
    color: '#8A2BE2',
    fontWeight: 'bold',
  },
});

export default SignupScreen;