import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { TokenContext } from "../hook/TokenContext";

const GoalCreatePlanScreen = ({ route }) => {
  const { goalId } = route.params;
  const { token } = useContext(TokenContext);
  const [goalData, setGoalData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGoalData = async () => {
      try {
        const response = await fetch(
          `https://fortuna-api.onrender.com/api/gemini/plan/${goalId}`,
          {
            method: "GET", // Usando o método GET
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
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Plano de Ação</Text>
      <Text style={styles.subtitle}>Objetivo</Text>
      <Text style={styles.text}>{goalData.planning.objective}</Text>
      <Text style={styles.subtitle}>ID da Meta: {goalId}</Text>

      <Text style={styles.subtitle}>Passos</Text>
      {goalData.planning.steps.map((step, index) => (
        <View key={index} style={styles.stepContainer}>
          <Text style={styles.stepTitle}>{step.step}</Text>
          <Text style={styles.text}>
            <Text style={styles.bold}>Descrição:</Text> {step.description}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.bold}>Prazo:</Text> {step.deadline}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.bold}>Responsável:</Text> {step.responsible}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.bold}>Indicador de Sucesso:</Text>{" "}
            {step.success_indicator}
          </Text>
          {step.context && (
            <Text style={styles.text}>
              <Text style={styles.bold}>Contexto:</Text> {step.context}
            </Text>
          )}
        </View>
      ))}

      <Text style={styles.subtitle}>Recursos</Text>
      {goalData.planning.resources.map((resource, index) => (
        <View key={index} style={styles.resourceContainer}>
          <Text style={styles.resourceTitle}>{resource.resource}</Text>
          <Text style={styles.text}>{resource.description}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 20,
    color: "#2c3e50",
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
  bold: {
    fontWeight: "bold",
  },
  stepContainer: {
    backgroundColor: "#ecf0f1",
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  stepTitle: {
    fontSize: 18,
    color: "#34495e",
    marginBottom: 5,
  },
  resourceContainer: {
    backgroundColor: "#ecf0f1",
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  resourceTitle: {
    fontSize: 18,
    color: "#34495e",
    marginBottom: 5,
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
