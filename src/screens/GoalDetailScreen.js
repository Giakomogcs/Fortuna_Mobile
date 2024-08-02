import React, { useEffect, useState, useContext } from "react";
import { View, Text, ActivityIndicator, ScrollView } from "react-native";
import { TokenContext } from "@hooks/TokenContext";
import { Button, Divider, List } from "react-native-paper";

const GoalDetailScreen = ({ route }) => {
  const { goalId } = route.params;
  const [goal, setGoal] = useState(null);
  const [loading, setLoading] = useState(true);
  const { token } = useContext(TokenContext);

  useEffect(() => {
    const fetchGoalDetails = async () => {
      try {
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
        const data = await response.json();
        setGoal(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchGoalDetails();
  }, [goalId]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <ScrollView style={{ padding: 20 }}>
      <Text style={{ fontSize: 18, fontWeight: "bold" }}>{goal.name}</Text>
      <Text>Patrimônio: {goal.patrimony}</Text>
      <Text>Meu Patrimônio: {goal.my_patrimony}</Text>
      <Text>Aporte Mensal: {goal.monthly_aport}</Text>
      <Text>Dividendos: {goal.dividends}</Text>
      <Text>Rendimento: {goal.rate}</Text>
      <Text>Status: {goal.status ? "Concluída" : "Em Andamento"}</Text>
      <Button
        mode="contained"
        onPress={() => alert("Exibir plano de ação")}
        style={{ marginVertical: 10 }}
      >
        Ver Plano
      </Button>
      <Divider style={{ marginVertical: 10 }} />

      <List.Accordion
        title="Fonte de Renda Adicional"
        left={(props) => <List.Icon {...props} icon="currency-usd" />}
      >
        {goal.planning.additional_income_sources.map((item, index) => (
          <List.Item key={index} title={item} />
        ))}
      </List.Accordion>
      <Divider style={{ marginVertical: 10 }} />

      <List.Accordion
        title="Plano de Contingência"
        left={(props) => <List.Icon {...props} icon="alert-circle" />}
      >
        {goal.planning.contingency_plan.map((item, index) => (
          <List.Item key={index} title={item} />
        ))}
      </List.Accordion>
      <Divider style={{ marginVertical: 10 }} />

      <List.Accordion
        title="Ajustes de Monitoramento"
        left={(props) => <List.Icon {...props} icon="chart-line" />}
      >
        {goal.planning.monitoring_adjustments.map((item, index) => (
          <List.Item key={index} title={item} />
        ))}
      </List.Accordion>
      <Divider style={{ marginVertical: 10 }} />

      <List.Accordion
        title="Dicas de Economia"
        left={(props) => <List.Icon {...props} icon="lightbulb" />}
      >
        {goal.planning.savings_tips.map((item, index) => (
          <List.Item key={index} title={item} />
        ))}
      </List.Accordion>
      <Divider style={{ marginVertical: 10 }} />

      <List.Accordion
        title="Recursos"
        left={(props) => <List.Icon {...props} icon="book" />}
      >
        {goal.planning.resources.map((item, index) => (
          <List.Item key={index} title={item} />
        ))}
      </List.Accordion>
      <Divider style={{ marginVertical: 10 }} />

      <List.Accordion
        title="Etapas"
        left={(props) => <List.Icon {...props} icon="steps" />}
      >
        {goal.planning.steps.map((step, index) => (
          <View key={index}>
            <Text style={{ fontWeight: "bold", marginTop: 10 }}>
              Etapa {step.step}: {step.description}
            </Text>
            <Text>Timeline: {step.timeline}</Text>
            {step.actions.map((action, actionIndex) => (
              <Text key={actionIndex}>- {action}</Text>
            ))}
            <Divider style={{ marginVertical: 10 }} />
          </View>
        ))}
      </List.Accordion>
    </ScrollView>
  );
};

export default GoalDetailScreen;
