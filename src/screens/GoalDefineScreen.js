import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";

const GoalDefineScreen = ({ route, navigation }) => {
  const goalData = route.params;

  const handleCreateGoal = () => {
    // Lógica para criar a meta
    Alert.alert("Meta Criada", "Sua meta foi criada com sucesso!");
  };

  const handleRewriteGoal = () => {
    navigation.navigate("GoalCreate", goalData);
  };

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
        <Text style={styles.label}>Respostas:</Text>
        {goalData.answers.map((answer, index) => (
          <Text key={index} style={styles.value}>{`Pergunta ${index + 1}: ${
            answer ? "Sim" : "Não"
          }`}</Text>
        ))}
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
});

export default GoalDefineScreen;
