import React, { useEffect, useState, useContext } from "react";
import {
  View,
  ScrollView,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { TokenContext } from "../hooks/TokenContext";
import Header from "../components/HeaderApp";
import { Text, Divider, useTheme, Box } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { List } from "react-native-paper";
import { background } from "native-base/lib/typescript/theme/styled-system";

export interface Step {
  step: number;
  description: string;
  actions: string[];
  timeline: string;
}

export interface Planning {
  objective?: string;
  steps?: Step[];
  resources?: string[];
  savings_tips?: string[];
  contingency_plan?: string[];
  additional_income_sources?: string[];
  monitoring_adjustments?: string[];
  current_situation?: {
    expenses?: string;
    income: string;
    savings?: string;
  };
}

export interface Goal {
  id: string;
  name: string;
  patrimony: string;
  my_patrimony: string;
  monthly_aport: string;
  dividends: string;
  rate: string;
  status: boolean;
  planning?: Planning;
  summary?: string;
}

type GoalDetailScreenProps = {
  route: {
    params: {
      goalId: string;
    };
  };
  navigation: any;
};

const GoalDetailScreen: React.FC<GoalDetailScreenProps> = ({
  route,
  navigation,
}) => {
  const { goalId } = route.params;
  const { token } = useContext(TokenContext);
  const [goalData, setGoalData] = useState<Goal | null>(null);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();

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
        <ActivityIndicator size="large" color={theme.colors.green[500]} />
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

  const { planning, summary } = goalData;

  const renderListItems = (items: string[]) => {
    return items.map((item, index) => (
      <Text key={index} style={styles.listItem}>
        * {item}
      </Text>
    ));
  };

  return (
    <View style={styles.container}>
      <Header title="Detalhes da Meta" onRefresh={fetchGoalData} />
      <ScrollView>
        <View style={styles.metaContainer}>
          <Text style={styles.metaTitle}>{goalData.name}</Text>

          <View style={styles.metaItem}>
            <Text style={styles.metaLabel}>Patrimônio:</Text>
            <Text style={styles.metaValue}>{goalData.patrimony}</Text>
          </View>

          <View style={styles.metaItem}>
            <Text style={styles.metaLabel}>Meu Patrimônio:</Text>
            <Text style={styles.metaValue}>{goalData.my_patrimony}</Text>
          </View>

          <View style={styles.metaItem}>
            <Text style={styles.metaLabel}>Aporte Mensal:</Text>
            <Text style={styles.metaValue}>{goalData.monthly_aport}</Text>
          </View>

          <View style={styles.metaItem}>
            <Text style={styles.metaLabel}>Dividendos:</Text>
            <Text style={styles.metaValue}>{goalData.dividends}</Text>
          </View>

          <View style={styles.metaItem}>
            <Text style={styles.metaLabel}>Rendimento:</Text>
            <Text style={styles.metaValue}>{goalData.rate}</Text>
          </View>

          <View style={styles.metaItem}>
            <Text style={styles.metaLabel}>Status:</Text>
            <Text style={styles.metaValue}>
              {goalData.status ? "Concluída" : "Em Andamento"}
            </Text>
          </View>
        </View>

        <Divider style={styles.divider} />

        {planning?.objective && (
          <>
            <List.Accordion
              style={styles.AccordionColor}
              title="Objetivo"
              left={(props) => <List.Icon {...props} icon="target" />}
            >
              <Text style={styles.text}>{planning.objective}</Text>
            </List.Accordion>
            <Divider style={styles.divider} />
          </>
        )}

        {summary && (
          <>
            <List.Accordion
              style={styles.AccordionColor}
              title="Resumo"
              left={(props) => (
                <List.Icon {...props} icon="file-document-outline" />
              )}
            >
              <Text style={styles.text}>{summary}</Text>
            </List.Accordion>
            <Divider style={styles.divider} />
          </>
        )}

        {planning?.steps && planning.steps.length > 0 && (
          <>
            <List.Accordion
              style={styles.AccordionColor}
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
                  <Text style={styles.stepDetail}>Prazo: {step.timeline}</Text>
                  <Text style={styles.stepDetail}>Ações:</Text>
                  {renderListItems(step.actions)}
                </View>
              ))}
            </List.Accordion>
            <Divider style={styles.divider} />
          </>
        )}

        {planning?.resources && planning.resources.length > 0 && (
          <>
            <List.Accordion
              style={styles.AccordionColor}
              title="Recursos"
              left={(props) => <List.Icon {...props} icon="book" />}
            >
              {renderListItems(planning.resources)}
            </List.Accordion>
            <Divider style={styles.divider} />
          </>
        )}

        {planning?.savings_tips && planning.savings_tips.length > 0 && (
          <>
            <List.Accordion
              style={styles.AccordionColor}
              title="Dicas de Poupança"
              left={(props) => <List.Icon {...props} icon="lightbulb" />}
            >
              {renderListItems(planning.savings_tips)}
            </List.Accordion>
            <Divider style={styles.divider} />
          </>
        )}

        {planning?.contingency_plan && planning.contingency_plan.length > 0 && (
          <>
            <List.Accordion
              style={styles.AccordionColor}
              title="Plano de Contingência"
              left={(props) => <List.Icon {...props} icon="alert" />}
            >
              {renderListItems(planning.contingency_plan)}
            </List.Accordion>
            <Divider style={styles.divider} />
          </>
        )}

        {planning?.additional_income_sources &&
          planning.additional_income_sources.length > 0 && (
            <>
              <List.Accordion
                style={styles.AccordionColor}
                title="Fontes de Renda Adicional"
                left={(props) => <List.Icon {...props} icon="cash-multiple" />}
              >
                {renderListItems(planning.additional_income_sources)}
              </List.Accordion>
              <Divider style={styles.divider} />
            </>
          )}

        {planning?.monitoring_adjustments &&
          planning.monitoring_adjustments.length > 0 && (
            <>
              <List.Accordion
                style={styles.AccordionColor}
                title="Ajustes de Monitoramento"
                left={(props) => <List.Icon {...props} icon="adjust" />}
              >
                {renderListItems(planning.monitoring_adjustments)}
              </List.Accordion>
            </>
          )}

        {planning?.current_situation && (
          <>
            <List.Accordion
              style={styles.AccordionColor}
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
    backgroundColor: "#e5e5e5fc",
    marginTop: 4,
  },
  AccordionColor: {
    backgroundColor: "#e5e5e5fc",
  },
  subtitle: {
    fontSize: 20,
    color: "#442c50",
    marginBottom: 10,
    marginTop: 16,
    paddingHorizontal: 20,
    fontWeight: "bold",
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
    paddingHorizontal: 20,
  },
  stepContainer: {
    backgroundColor: "#f0edf2",
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    marginHorizontal: 20,
  },
  stepTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 5,
  },
  stepDetail: {
    fontSize: 14,
    marginBottom: 5,
  },
  listItem: {
    fontSize: 14,
    marginLeft: 20,
    marginBottom: 5,
  },
  buttonContainer: {
    padding: 20,
    alignItems: "center",
  },
  goalsButton: {
    backgroundColor: "#9a67ea",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    width: "80%",
    color: "#f1f1f1",
  },
  buttonText: {
    color: "#dedddd",
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

  metaContainer: {
    justifyContent: "center",

    backgroundColor: "#d4d4d4",
    padding: 15,
    borderRadius: 16,
    marginBottom: 20,

    margin: 8,
  },
  metaTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#442c50",
    marginVertical: 12,
  },
  metaItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  metaLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#6c757d",
  },
  metaValue: {
    fontSize: 16,
    fontWeight: "400",
    color: "#343a40",
  },
});

export default GoalDetailScreen;
