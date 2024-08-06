import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  Switch,
  StyleSheet,
  Button,
  ScrollView,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import { TokenContext } from "../hooks/TokenContext";
import Header from "../components/HeaderApp";
import { useTheme } from 'native-base';

const GoalCreateScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [typeGoal, setTypeGoal] = useState(false);
  const [patrimony, setPatrimony] = useState(0);
  const [initialPatrimony, setInitialPatrimony] = useState(0);
  const [timeDesired, setTimeDesired] = useState(0); // anos
  const [monthlyAport, setMonthlyAport] = useState(0);
  const [rate, setRate] = useState(0.01);
  const [dividends, setDividends] = useState(0);
  const [timeOrAport, setTimeOrAport] = useState(false); // Novo switch
  const [responseMessage, setResponseMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { token } = useContext(TokenContext);
  const theme = useTheme();

  const handleSubmit = async () => {
    const goalData = {
      name,
      patrimony: typeGoal ? 0 : patrimony,
      dividends: typeGoal ? dividends : 0,
      type_goal: typeGoal,
      initial_patrimony: initialPatrimony,
      time_desired: timeOrAport ? timeDesired : 0,
      monthly_aport: timeOrAport ? 0 : monthlyAport,
      rate: rate,
    };

    setLoading(true);

    try {
      const responsePreview = await fetch(
        "https://fortuna-api.onrender.com/api/goals/preview",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(goalData),
        }
      );

      if (responsePreview.ok) {
        try {
          const resultPreview = await responsePreview.json();
          setResponseMessage(JSON.stringify(resultPreview, null, 2));

          const responseAnalyze = await fetch(
            "https://fortuna-api.onrender.com/api/gemini/analyze",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify(resultPreview),
            }
          );

          if (responseAnalyze.ok) {
            const resultAnalyze = await responseAnalyze.json();
            navigation.navigate("QuestionsGoal", { goalData: resultAnalyze });
          } else {
            setResponseMessage("Falha ao analisar os dados da meta.");
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        setResponseMessage("Falha ao enviar os dados da meta.");
      }
    } catch (error) {
      setResponseMessage("Ocorreu um erro ao enviar os dados da meta.");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ backgroundColor: "#fff", flex: 1 }}>
      <Header title="Criar Meta" />
      <ScrollView contentContainerStyle={styles.container}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#9a67ea" />
            <Text style={styles.loadingText}>Analisando Meta...</Text>
          </View>
        ) : (
          <>
            <Text style={styles.label}>Nome:</Text>
            <TextInput style={styles.input} value={name} onChangeText={setName} />

            <View style={styles.switchContainer}>
              <Text style={styles.label}>Tipo de Meta:</Text>
              <Switch
                value={typeGoal}
                onValueChange={setTypeGoal}
                trackColor={{ false: "#767577", true: theme.colors.purple[500] }}
                thumbColor={typeGoal ? "#fff" : theme.colors.purple[500]}
              />
            </View>

            {!typeGoal && (
              <>
                <Text style={styles.label}>Patrimônio:</Text>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  value={String(patrimony)}
                  onChangeText={(text) => setPatrimony(Number(text))}
                />

                <Text style={styles.label}>Patrimônio Inicial:</Text>
              </>
            )}

            {typeGoal && (
              <>
                <Text style={styles.label}>Dividendos:</Text>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  value={String(dividends)}
                  onChangeText={(text) => setDividends(Number(text))}
                />

                <Text style={styles.label}>Patrimônio Inicial:</Text>
              </>
            )}

            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={String(initialPatrimony)}
              onChangeText={(text) => setInitialPatrimony(Number(text))}
            />

            <View style={styles.switchContainer}>
              <Text style={styles.label}>Aporte ou Tempo:</Text>
              <Switch
                value={timeOrAport}
                onValueChange={setTimeOrAport}
                trackColor={{ false: "#767577", true: theme.colors.purple[500] }}
                thumbColor={timeOrAport ? "#fff" : theme.colors.purple[500]}
              />
            </View>

            {timeOrAport ? (
              <>
                <Text style={styles.label}>Tempo Desejado (anos):</Text>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  value={String(timeDesired)}
                  onChangeText={(text) => setTimeDesired(Number(text))}
                />
              </>
            ) : (
              <>
                <Text style={styles.label}>Aporte Mensal:</Text>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  value={String(monthlyAport)}
                  onChangeText={(text) => setMonthlyAport(Number(text))}
                />
              </>
            )}

            <Text style={styles.label}>Taxa:</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={String(rate)}
              onChangeText={(text) => setRate(Number(text))}
            />

            <Button title="Enviar" onPress={handleSubmit} color="#9a67ea" />

          </>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  label: {
    marginVertical: 8,
    fontWeight: "bold",
  },
  input: {
    height: 40,
    borderColor: "#9a67ea",
    borderWidth: 2,
    marginBottom: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
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
  responseContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
  },
  responseLabel: {
    fontWeight: "bold",
  },
  responseText: {
    marginTop: 5,
    color: "#333",
  },
});

export default GoalCreateScreen;
