import React, { useState, useContext, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { TokenContext } from "../hooks/TokenContext";
import Header from "../components/HeaderApp";
import { Loading } from "../components/Loading";
import { useFocusEffect } from "@react-navigation/native";

const ListMeta = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const { token } = useContext(TokenContext);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://fortuna-api.onrender.com/api/goals",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        setError(true);
        setLoading(false);
        return;
      }
      const result = await response.json();
      setData(result);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [token])
  );

  const renderGoal = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("GoalDetail", { goalId: item.id })}
    >
      <View style={styles.goalContainer}>
        <Text style={styles.goalName}>{item.name}</Text>
        <Text>Patrimônio: R${item.patrimony}</Text>
        <Text>Meu Patrimônio: R${item.my_patrimony}</Text>
        <Text>Dividendos: R${item.dividends}</Text>
        <Text>Aporte Mensal: R${item.monthly_aport}</Text>
        <Text>Tempo Desejado: {item.time_desired} anos</Text>
      </View>
    </TouchableOpacity>
  );

  const handleCreateGoal = () => {
    navigation.navigate("GoalCreate");
  };

  return (
    <View style={styles.container}>
      <Header title="Lista da Meta" onRefresh={fetchData} />

      {loading ? (
        <Loading title="Carregando metas..." />
      ) : (
        <FlatList
          data={data}
          renderItem={renderGoal}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
      <TouchableOpacity style={styles.createButton} onPress={handleCreateGoal}>
        <Text style={styles.buttonText}>Criar Nova Meta</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
  },

  goalContainer: {
    backgroundColor: "#f0f0f0",
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  goalName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  createButton: {
    backgroundColor: "#9a67ea",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 20,
    width: "80%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ListMeta;
