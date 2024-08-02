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
        console.log(data); // Adicionado para verificar a estrutura dos dados recebidos
        setGoal(data[0]); // Acessando o primeiro elemento do array
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchGoalDetails();
  }, [goalId, token]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (!goal) {
    return <Text>Goal not found</Text>;
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

      {goal.planning && (
        <>
          <List.Accordion
            title="Recursos"
            left={(props) => <List.Icon {...props} icon="book" />}
          >
            {goal.planning.resources.map((item, index) => (
              <List.Item
                key={index}
                title={item.resource}
                description={item.description}
              />
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
                <Text>Contexto: {step.context}</Text>
                <Text>Prazo: {step.deadline}</Text>
                <Text>Responsável: {step.responsible}</Text>
                <Text>Indicador de Sucesso: {step.success_indicator}</Text>
                <Divider style={{ marginVertical: 10 }} />
              </View>
            ))}
          </List.Accordion>
        </>
      )}
    </ScrollView>
  );
};

export default GoalDetailScreen;
