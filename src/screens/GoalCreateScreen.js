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
} from "react-native";
import { TokenContext } from "../hook/TokenContext";

const GoalCreateScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [typeGoal, setTypeGoal] = useState(false);
  const [patrimony, setPatrimony] = useState(0);
  const [initialPatrimony, setInitialPatrimony] = useState(0);
  const [timeDesired, setTimeDesired] = useState(0); // anos
  const [monthlyAport, setMonthlyAport] = useState(0);
  const [rate, setRate] = useState(0.01);
  const [dividends, setDividends] = useState(0);
  const [responseMessage, setResponseMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { token } = useContext(TokenContext);

  const handleSubmit = async () => {
    const goalData = {
      name,
      patrimony: typeGoal ? 0 : patrimony,
      dividends: typeGoal ? dividends : 0,
      type_goal: typeGoal,
      initial_patrimony: initialPatrimony,
      time_desired: timeDesired,
      monthly_aport: monthlyAport,
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
          navigation.navigate("Questôes", { goalData: resultAnalyze });
        } else {
          setResponseMessage("Failed to analyze goal data.");
        }
      } else {
        setResponseMessage("Failed to submit goal data.");
      }
    } catch (error) {
      setResponseMessage("An error occurred while submitting goal data.");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#9a67ea" />
          <Text style={styles.loadingText}>Analisando Meta...</Text>
        </View>
      ) : (
        <>
          <Text style={styles.label}>Name:</Text>
          <TextInput style={styles.input} value={name} onChangeText={setName} />

          <View style={styles.switchContainer}>
            <Text style={styles.label}>Type Goal:</Text>
            <Switch value={typeGoal} onValueChange={setTypeGoal} />
          </View>

          {!typeGoal && (
            <>
              <Text style={styles.label}>Patrimony:</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={String(patrimony)}
                onChangeText={(text) => setPatrimony(Number(text))}
              />

              <Text style={styles.label}>Initial Patrimony:</Text>
            </>
          )}

          {typeGoal && (
            <>
              <Text style={styles.label}>Dividends:</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={String(dividends)}
                onChangeText={(text) => setDividends(Number(text))}
              />

              <Text style={styles.label}>Initial Patrimony:</Text>
            </>
          )}

          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={String(initialPatrimony)}
            onChangeText={(text) => setInitialPatrimony(Number(text))}
          />

          <Text style={styles.label}>Time Desired (years):</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={String(timeDesired)}
            onChangeText={(text) => setTimeDesired(Number(text))}
          />

          <Text style={styles.label}>Monthly Aport:</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={String(monthlyAport)}
            onChangeText={(text) => setMonthlyAport(Number(text))}
          />

          <Text style={styles.label}>Rate:</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={String(rate)}
            onChangeText={(text) => setRate(Number(text))}
          />

          <Button title="Submit" onPress={handleSubmit} />

          {responseMessage ? (
            <View style={styles.responseContainer}>
              <Text style={styles.responseLabel}>Response:</Text>
              <Text style={styles.responseText}>{responseMessage}</Text>
            </View>
          ) : null}
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
  },
  label: {
    marginVertical: 8,
    fontWeight: "bold",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
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
