import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { TokenContext } from "../hook/TokenContext";

const GoalDefineScreen = ({ route, navigation }) => {
  const initialGoalData = route.params;
  const [goalData, setGoalData] = useState(initialGoalData);
  const [loading, setLoading] = useState(true);
  const { token } = useContext(TokenContext);

  useEffect(() => {
    const fetchGoalData = async () => {
      try {
        const response = await fetch(
          "https://fortuna-api.onrender.com/api/gemini/define",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(initialGoalData),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch goal data");
        }

        const data = await response.json();
        setGoalData(data);
      } catch (error) {
        Alert.alert("Erro", "Falha ao definir a meta.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchGoalData();
  }, [initialGoalData]);

  const handleCreateGoal = async () => {
    try {
      const dataToSend = { ...goalData };
      if (goalData.monthly_aport) {
        delete dataToSend.monthly_aport;
      }

      const response = await fetch(
        "https://fortuna-api.onrender.com/api/goals",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(dataToSend),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error data:", errorData);
        throw new Error(errorData.message || "Failed to create goal");
      }

      Alert.alert("Meta Criada", "Sua meta foi criada com sucesso!");
      navigation.navigate("Metas");
    } catch (error) {
      Alert.alert("Erro", error.message || "Falha ao criar a meta.");
      console.error("Fetch error:", error);
    }
  };

  const handleRewriteGoal = () => {
    navigation.navigate("Criando Meta", goalData);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#9a67ea" />
        <Text style={styles.loadingText}>Carregando...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Resumo da Meta</Text>
      <View style={styles.detailContainer}>
        <Text style={styles.label}>Nome:</Text>
        <Text style={styles.value}>{goalData.name}</Text>
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.label}>Tipo de Meta:</Text>
        <Text style={styles.value}>
          {goalData.type_goal ? "Dividendo" : "Patrimônio"}
        </Text>
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.label}>Patrimônio Inicial:</Text>
        <Text style={styles.value}>{goalData.initial_patrimony}</Text>
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.label}>Meu Patrimônio:</Text>
        <Text style={styles.value}>{goalData.my_patrimony}</Text>
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.label}>Patrimônio Desejado:</Text>
        <Text style={styles.value}>{goalData.patrimony}</Text>
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.label}>Taxa:</Text>
        <Text style={styles.value}>{goalData.rate * 100}%</Text>
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.label}>Tempo Desejado (anos):</Text>
        <Text style={styles.value}>{goalData.time_desired}</Text>
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.label}>Aporte Mensal:</Text>
        <Text style={styles.value}>{goalData.monthly_aport.toFixed(2)}</Text>
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.label}>Status:</Text>
        <Text style={styles.value}>{goalData.status}</Text>
      </View>
      <View style={styles.summaryContainer}>
        <Text style={styles.label}>Resumo:</Text>
        <Text style={styles.summary}>{goalData.summary}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.createButton}
          onPress={handleCreateGoal}
        >
          <Text style={styles.buttonText}>Criar Meta</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.rewriteButton}
          onPress={handleRewriteGoal}
        >
          <Text style={styles.buttonText}>Reescrever</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  detailContainer: {
    marginBottom: 15,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
  },
  summaryContainer: {
    marginTop: 20,
    marginBottom: 30,
  },
  summary: {
    fontSize: 16,
    lineHeight: 24,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  createButton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    width: "40%",
  },
  rewriteButton: {
    backgroundColor: "#F44336",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    width: "40%",
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
});

export default GoalDefineScreen;
