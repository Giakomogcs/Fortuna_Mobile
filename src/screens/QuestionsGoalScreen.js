import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Questions } from "../components/Questions";

const QuestionsGoalScreen = ({ route, navigation }) => {
  const { goalData } = route.params;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);

  const handleAnswer = (answer) => {
    const updatedAnswers = [...answers, answer];
    setAnswers(updatedAnswers);

    if (currentQuestionIndex < goalData.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      goalData.answers = updatedAnswers;
      navigation.navigate("GoalDefine", { ...goalData });
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.summaryContainer}>
        <Text style={styles.summaryTitle}>Resumo da Meta</Text>
        <Text style={styles.summaryText}>{goalData.summary}</Text>
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.questionHeader}>
          Questão {currentQuestionIndex + 1} de {goalData.questions.length}
        </Text>
        <Questions question={goalData.questions[currentQuestionIndex]} />
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.yesButton]}
            onPress={() => handleAnswer(true)}
          >
            <Text style={styles.buttonText}>Sim</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.noButton]}
            onPress={() => handleAnswer(false)}
          >
            <Text style={styles.buttonText}>Não</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  summaryContainer: {
    marginBottom: 20,
    padding: 20,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  summaryText: {
    fontSize: 16,
    lineHeight: 24,
  },
  formContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  questionHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 20,
  },
  button: {
    padding: 15,
    borderRadius: 10,
    width: "40%",
    alignItems: "center",
  },
  yesButton: {
    backgroundColor: "#4CAF50",
  },
  noButton: {
    backgroundColor: "#F44336",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default QuestionsGoalScreen;
