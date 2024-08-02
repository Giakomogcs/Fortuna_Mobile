import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { TokenContext } from "../hooks/TokenContext";
import Header from "../components/Header";
import Icon from "react-native-vector-icons/Ionicons";

const GoalCreatePlanScreen = ({ route, navigation }) => {
  const { goalId } = route.params;
  const { token, user } = useContext(TokenContext);
  const [goalData, setGoalData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchGoalData = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://fortuna-api.onrender.com/api/gemini/plan/${goalId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.text();
        console.error("Error response data:", errorData);
        throw new Error("Failed to fetch goal data");
      }

      const data = await response.json();
      setGoalData(data);
    } catch (error) {
      Alert.alert("Erro", "Falha ao buscar os dados da meta.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGoalData();
  }, [goalId, token]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#9a67ea" />
        <Text style={styles.loadingText}>Carregando...</Text>
      </View>
    );
  }

  if (!goalData) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>
          Erro ao carregar os dados do plano de ação.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header title="Plano de Ação" onRefresh={fetchGoalData} />
      <ScrollView>
        <Text style={styles.subtitle}>Objetivo</Text>
        <Text style={styles.text}>{goalData.planning.objective}</Text>

        <Text style={[styles.subtitle, { marginBottom: 10 }]}>Passos</Text>
        {goalData.planning.steps.map((step, index) => (
          <View key={index} style={styles.stepContainer}>
            <Text style={styles.text}>
              <Text style={styles.bold}>{step.description}</Text>
            </Text>
            <Text style={styles.text}>
              <Text style={styles.bold}>Prazo:</Text> {step.deadline}
            </Text>
            <Text style={styles.text}>
              <Text style={styles.bold}>Indicador de Sucesso:</Text>{" "}
              {step.success_indicator}
            </Text>
          </View>
        ))}

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.goalsButton}
            onPress={() => navigation.navigate("Metas")}
          >
            <Text style={styles.buttonText}>Ir para Minhas Metas</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  subtitle: {
    fontSize: 20,
    color: "#2c3e50",
    marginBottom: 10,
    paddingHorizontal: 20,
    fontWeight: "bold",
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
    paddingHorizontal: 20,
  },
  bold: {
    fontWeight: "bold",
  },
  stepContainer: {
    backgroundColor: "#ecf0f1",
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    marginHorizontal: 20,
  },
  buttonContainer: {
    padding: 20,
    alignItems: "center",
  },
  goalsButton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    width: "80%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#9a67ea",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 16,
    color: "#e74c3c",
  },
});

export default GoalCreatePlanScreen;
