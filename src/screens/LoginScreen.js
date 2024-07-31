import React, { useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { TokenContext } from "../hook/TokenContext"; // Importar o contexto do token

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { setToken } = useContext(TokenContext); // Usar o contexto do token

  const handleLogin = async () => {
    setLoading(true);
    try {
      const authResponse = await fetch(
        "https://fortuna-api.onrender.com/api/sessions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      if (!authResponse.ok) {
        setResponseMessage("Failed to authenticate.");
        Alert.alert("Erro", "Falha ao autenticar.");
        setLoading(false);
        return;
      }

      const authData = await authResponse.json();
      const token = authData.token;
      setToken(token); // Armazenar o token no contexto
      setResponseMessage(`Login successful. Token: ${token}`);
      Alert.alert("Sucesso", "Login realizado com sucesso.");

      navigation.navigate("Home");
    } catch (error) {
      setResponseMessage("An error occurred.");
      Alert.alert("Erro", "Ocorreu um erro.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Nome de usuário,</Text>
        <Text style={styles.welcomeBackText}>Que bom te ter de volta!</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Digite seu email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Digite sua senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
      {loading && <ActivityIndicator size="large" color="#9a67ea" />}
      {responseMessage && (
        <Text style={styles.responseMessage}>{responseMessage}</Text>
      )}
      <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
        <Text style={styles.createAccountText}>
          Você não tem uma conta? Crie agora!
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 40,
  },
  welcomeText: {
    fontSize: 18,
    color: "#000",
  },
  welcomeBackText: {
    fontSize: 18,
    color: "#000",
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#9a67ea",
    paddingVertical: 15,
    paddingHorizontal: 80,
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  createAccountText: {
    color: "#9a67ea",
  },
  responseMessage: {
    color: "#000",
    marginTop: 20,
    textAlign: "center",
  },
});

export default LoginScreen;
