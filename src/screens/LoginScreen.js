import React, { useState, useContext, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { TokenContext } from "@hook/TokenContext"; // Importar o contexto do token

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { token, setTokenAndUser } = useContext(TokenContext); // Usar o contexto do token

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

      const responseText = await authResponse.text();
      console.log("Response Status:", authResponse.status);
      console.log("Response Text:", responseText);

      if (!authResponse.ok) {
        setResponseMessage(`Erro ${authResponse.status}: ${responseText}`);
        Alert.alert("Erro", `Falha ao autenticar. ${responseText}`);
        setLoading(false);
        return;
      }

      const authData = JSON.parse(responseText);
      const token = authData.token;
      const userData = authData.user;
      setTokenAndUser(token, userData); // Armazenar o token e os dados do usuário no contexto
      setResponseMessage("Login realizado com sucesso.");
      Alert.alert("Sucesso", "Login realizado com sucesso.");
    } catch (error) {
      console.error("Login Error:", error);
      setResponseMessage(`Erro: ${error.message}`);
      Alert.alert("Erro", `Ocorreu um erro: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      navigation.navigate("Home");
    }
  }, [token]);

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
