// src/screens/GoalCreatePlanScreen.js

import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

const planData = {
  planning: {
    objective:
      "Aumentar patrimônio para R$ 300.000,00 para gerar uma renda passiva de R$ 3.000,00 por mês.",
    steps: [
      {
        step: "Sub-objetivo",
        description: "Investir mensalmente R$ 1.303,44",
        deadline: "Mensal",
        responsible: "Giovani C.S",
        success_indicator: "Valor investido mensalmente",
        context:
          "O aporte mensal de R$ 1.303,44 é viável, representando cerca de 24% do salário atual de R$ 5.500,45. Se precisar, reavalie suas despesas e/ou busque aumentar sua renda para manter este ritmo de investimento.",
      },
      {
        step: "Sub-objetivo",
        description: "Acompanhar rendimentos mensais",
        deadline: "Mensal",
        responsible: "Giovani C.S",
        success_indicator: "Relatório de rendimentos",
      },
      {
        step: "Sub-objetivo",
        description: "Reavaliar investimentos a cada trimestre",
        deadline: "Trimestral",
        responsible: "Giovani C.S",
        success_indicator: "Relatório de avaliação de investimentos",
        context:
          "Como você já possui um bom conhecimento em renda fixa (0.6) e renda variável (0.5), a cada trimestre, analise o desempenho dos seus investimentos e faça os ajustes necessários para manter seu objetivo. Comece com uma carteira diversificada com foco em renda fixa e, gradualmente, com base em seu conhecimento, inclua investimentos de renda variável para aumentar o potencial de retorno. Não se esqueça de monitorar o risco de cada investimento.",
      },
      {
        step: "Sub-objetivo",
        description: "Estudar mais sobre investimentos em renda variável",
        deadline: "Semestral",
        responsible: "Giovani C.S",
        success_indicator:
          "Conclusão de cursos ou livros sobre investimentos em renda variável",
        context:
          "Aumentar o conhecimento sobre renda variável, como ações e fundos de investimento, pode te ajudar a construir uma carteira diversificada e aumentar o retorno a longo prazo. Utilize plataformas de educação financeira online, livros, cursos e outros materiais de aprendizagem para aumentar seu conhecimento e confiança.",
      },
    ],
    resources: [
      {
        resource: "Plataforma de investimentos",
        description: "Ferramenta utilizada para realizar os investimentos.",
      },
      {
        resource: "Relatórios financeiros",
        description:
          "Documentos que detalham os rendimentos e performance dos investimentos.",
      },
      {
        resource: "Consultoria financeira (se necessário)",
        description:
          "Serviço de orientação financeira para auxiliar nas decisões de investimento.",
      },
    ],
  },
};

const GoalCreatePlanScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Plano de Ação</Text>
      <Text style={styles.subtitle}>Objetivo</Text>
      <Text style={styles.text}>{planData.planning.objective}</Text>

      <Text style={styles.subtitle}>Passos</Text>
      {planData.planning.steps.map((step, index) => (
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
      {planData.planning.resources.map((resource, index) => (
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
});

export default GoalCreatePlanScreen;
