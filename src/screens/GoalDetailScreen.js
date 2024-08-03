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
import { List, Divider } from "react-native-paper";

const GoalDetailScreen = ({ route, navigation }) => {
  const { goalId } = route.params;
  const { token } = useContext(TokenContext);
  const [goalData, setGoalData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchGoalData = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `https://fortuna-api.onrender.com/api/goals/${goalId}`,
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
      setGoalData(data[0]);
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

  const { planning } = goalData;

  return (
    <View style={styles.container}>
      <Header title="Detalhes da Meta" onRefresh={fetchGoalData} />
      <ScrollView>
        <Text style={styles.subtitle}>Meta</Text>
        <Text style={styles.text}>Nome: {goalData.name}</Text>
        <Text style={styles.text}>Patrimônio: {goalData.patrimony}</Text>
        <Text style={styles.text}>Meu Patrimônio: {goalData.my_patrimony}</Text>
        <Text style={styles.text}>Aporte Mensal: {goalData.monthly_aport}</Text>
        <Text style={styles.text}>Dividendos: {goalData.dividends}</Text>
        <Text style={styles.text}>Rendimento: {goalData.rate}</Text>
        <Text style={styles.text}>
          Status: {goalData.status ? "Concluída" : "Em Andamento"}
        </Text>

        <Divider style={styles.divider} />

        {planning?.objective && (
          <>
            <List.Accordion
              title="Objetivo"
              left={(props) => <List.Icon {...props} icon="target" />}
            >
              <Text style={styles.text}>{planning.objective}</Text>
            </List.Accordion>
            <Divider style={styles.divider} />
          </>
        )}

        {planning?.steps && planning.steps.length > 0 && (
          <>
            <List.Accordion
              title="Passos"
              left={(props) => (
                <List.Icon {...props} icon="format-list-numbered" />
              )}
            >
              {planning.steps.map((step, index) => (
                <View key={index} style={styles.stepContainer}>
                  <Text style={styles.stepTitle}>
                    Passo {step.step}: {step.description}
                  </Text>
                  <Text style={styles.stepDetail}>
                    Contexto: {step.context}
                  </Text>
                  <Text style={styles.stepDetail}>Prazo: {step.deadline}</Text>
                  <Text style={styles.stepDetail}>
                    Responsável: {step.responsible}
                  </Text>
                  <Text style={styles.stepDetail}>
                    Indicador de Sucesso: {step.success_indicator}
                  </Text>
                  <Divider style={styles.divider} />
                </View>
              ))}
            </List.Accordion>
            <Divider style={styles.divider} />
          </>
        )}

        {planning?.resources && planning.resources.length > 0 && (
          <>
            <List.Accordion
              title="Recursos"
              left={(props) => <List.Icon {...props} icon="book" />}
            >
              {planning.resources.map((item, index) => (
                <List.Item key={index} title={item} />
              ))}
            </List.Accordion>
            <Divider style={styles.divider} />
          </>
        )}

        {planning?.savings_tips && planning.savings_tips.length > 0 && (
          <>
            <List.Accordion
              title="Dicas de Poupança"
              left={(props) => <List.Icon {...props} icon="lightbulb" />}
            >
              {planning.savings_tips.map((tip, index) => (
                <List.Item key={index} title={tip} />
              ))}
            </List.Accordion>
            <Divider style={styles.divider} />
          </>
        )}

        {planning?.contingency_plan && planning.contingency_plan.length > 0 && (
          <>
            <List.Accordion
              title="Plano de Contingência"
              left={(props) => <List.Icon {...props} icon="alert" />}
            >
              {planning.contingency_plan.map((plan, index) => (
                <List.Item key={index} title={plan} />
              ))}
            </List.Accordion>
            <Divider style={styles.divider} />
          </>
        )}

        {planning?.additional_income_sources &&
          planning.additional_income_sources.length > 0 && (
            <>
              <List.Accordion
                title="Fontes de Renda Adicional"
                left={(props) => <List.Icon {...props} icon="cash-multiple" />}
              >
                {planning.additional_income_sources.map((source, index) => (
                  <List.Item key={index} title={source} />
                ))}
              </List.Accordion>
              <Divider style={styles.divider} />
            </>
          )}

        {planning?.monitoring_adjustments &&
          planning.monitoring_adjustments.length > 0 && (
            <>
              <List.Accordion
                title="Ajustes de Monitoramento"
                left={(props) => <List.Icon {...props} icon="adjust" />}
              >
                {planning.monitoring_adjustments.map((adjustment, index) => (
                  <List.Item key={index} title={adjustment} />
                ))}
              </List.Accordion>
            </>
          )}

        {planning?.current_situation && (
          <>
            <List.Accordion
              title="Situação Atual"
              left={(props) => <List.Icon {...props} icon="information" />}
            >
              <Text style={styles.text}>
                Despesas:{" "}
                {planning.current_situation.expenses
                  ? planning.current_situation.expenses
                  : "N/A"}
              </Text>
              <Text style={styles.text}>
                Renda: {planning.current_situation.income}
              </Text>
              <Text style={styles.text}>
                Poupança:{" "}
                {planning.current_situation.savings
                  ? planning.current_situation.savings
                  : "N/A"}
              </Text>
            </List.Accordion>
            <Divider style={styles.divider} />
          </>
        )}

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
  stepTitle: {
    fontWeight: "bold",
    fontSize: 16,
  },
  stepDetail: {
    fontSize: 14,
    marginBottom: 5,
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
  divider: {
    marginVertical: 10,
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

export default GoalDetailScreen;
