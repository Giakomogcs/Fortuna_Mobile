import React, { useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import Slider from "@react-native-community/slider";
import { TokenContext } from "../hooks/TokenContext";

const FinancialGoalsScreen = ({ navigation }) => {
  const [risk, setRisk] = useState(0);
  const [salary, setSalary] = useState("");
  const [variableIncome, setVariableIncome] = useState(0);
  const [fixedIncome, setFixedIncome] = useState(0);
  const { token } = useContext(TokenContext);

  const handleConfirm = async () => {
    const payload = {
      risk: risk / 100,
      salary: parseFloat(salary),
      knowledge: {
        variable_income: variableIncome / 100,
        fixed_income: fixedIncome / 100,
      },
    };

    try {
      const response = await fetch(
        "https://fortuna-api.onrender.com/api/users/profile/",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Response:", data);
        Alert.alert("Sucesso", "Informações enviadas com sucesso!");
        // Navegar para a tela Home
        navigation.navigate("Home");
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erro na resposta do servidor");
      }
    } catch (error) {
      console.error("Error:", error.message);
      Alert.alert("Erro", `Falha ao enviar informações: ${error.message}`);
    }
  };

  const handleSalaryChange = (value) => {
    const numericValue = value.replace(/[^0-9]/g, "");
    setSalary(numericValue);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Risco</Text>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={100}
        step={1}
        value={risk}
        onValueChange={setRisk}
        minimumTrackTintColor="#9a67ea"
        maximumTrackTintColor="#ccc"
        thumbTintColor="#9a67ea"
      />
      <Text style={styles.percentage}>{risk}%</Text>
      <TextInput
        style={styles.input}
        placeholder="Salário"
        value={salary}
        onChangeText={handleSalaryChange}
        keyboardType="numeric"
      />
      <Text style={styles.label}>Conhecimento em:</Text>
      <Text style={styles.subLabel}>Renda Variável</Text>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={100}
        step={1}
        value={variableIncome}
        onValueChange={setVariableIncome}
        minimumTrackTintColor="#9a67ea"
        maximumTrackTintColor="#ccc"
        thumbTintColor="#9a67ea"
      />
      <Text style={styles.percentage}>{variableIncome}%</Text>
      <Text style={styles.subLabel}>Renda Fixa</Text>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={100}
        step={1}
        value={fixedIncome}
        onValueChange={setFixedIncome}
        minimumTrackTintColor="#9a67ea"
        maximumTrackTintColor="#ccc"
        thumbTintColor="#9a67ea"
      />
      <Text style={styles.percentage}>{fixedIncome}%</Text>
      <TouchableOpacity style={styles.button} onPress={handleConfirm}>
        <Text style={styles.buttonText}>Confirmar</Text>
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
  label: {
    fontSize: 18,
    color: "#000",
    marginBottom: 10,
  },
  subLabel: {
    fontSize: 16,
    color: "#000",
    marginTop: 20,
    marginBottom: 10,
  },
  slider: {
    width: "100%",
    height: 40,
    marginBottom: 10,
  },
  percentage: {
    fontSize: 16,
    color: "#000",
    marginBottom: 20,
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
    marginTop: 30,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default FinancialGoalsScreen;
