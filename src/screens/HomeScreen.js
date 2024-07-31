import React, { useContext } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Alert } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { TokenContext } from "../hook/TokenContext";

const HomeScreen = ({ navigation }) => {
  const { logout } = useContext(TokenContext);

  const handleLogout = () => {
    Alert.alert("Logout", "Você saiu da sua conta.");
    logout(); // Remover o token
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Nome de usuário,</Text>
        <Text style={styles.welcomeBackText}>Seja bem vindo</Text>
      </View>
      <View style={styles.iconContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Criando Meta")}
          style={styles.iconBox}
        >
          <MaterialIcons name="attach-money" size={50} color="#9a67ea" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("Metas")}
          style={styles.iconBox}
        >
          <MaterialIcons name="list" size={50} color="#9a67ea" />
        </TouchableOpacity>


        <TouchableOpacity style={styles.iconBox}>
          <MaterialIcons name="insert-chart" size={50} color="#9a67ea" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("FinancialGoals")}
          style={styles.iconBox}
        >
          <MaterialIcons name="person" size={50} color="#9a67ea" />
        </TouchableOpacity>

        <TouchableOpacity onPress={handleLogout} style={styles.iconBox}>
          <MaterialIcons name="logout" size={50} color="#9a67ea" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  header: {
    width: "100%",
    padding: 20,
    paddingBottom: 50,
    backgroundColor: "#9a67ea",
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  welcomeText: {
    fontSize: 18,
    color: "#fff",
  },
  welcomeBackText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  iconContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 50,
  },
  iconBox: {
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    margin: 15,
    borderWidth: 2,
    borderColor: "#9a67ea",
    borderRadius: 10,
  },
});

export default HomeScreen;
