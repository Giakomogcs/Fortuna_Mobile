import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { TokenContext } from "../hook/TokenContext"; // Importar o contexto do token
import { Questions } from "../components/Questions";
import { parse, format } from "date-fns";

const QuestionsGoalScreen = () => {
  const questions = [
    "Você está ciente do valor total necessário para o casamento flash? Esse valor de R$43.000 inclui todos os custos como aluguel do local, buffet, decoração e outros gastos?",
    "Você está disposto a aumentar o tempo para alcançar a meta? Caso você tenha mais tempo, será possível reduzir o valor do aporte mensal necessário, facilitando o planejamento financeiro.",
    "Você consegue aumentar o valor do aporte mensal para R$8.457,61 para atingir a meta em 6 meses? Essa mudança te permitiria alcançar a meta dentro do prazo desejado, mas exige um planejamento mais rigoroso.",
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);

  const handleAnswer = (answer) => {
    const updatedAnswers = [...answers, answer];
    setAnswers(updatedAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Aqui você pode enviar as respostas para o JSON de goals
      Alert.alert("Respostas enviadas", JSON.stringify(updatedAnswers));
      // Resetar perguntas e respostas
      setCurrentQuestionIndex(0);
      setAnswers([]);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.formContainer}>
        <Questions question={questions[currentQuestionIndex]} />
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
  },
  formContainer: {
    marginTop: "40%",
    padding: 20,
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
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
