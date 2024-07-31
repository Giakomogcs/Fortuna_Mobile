import React, { useState, useEffect,useContext } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, Alert, Button } from 'react-native';
import { TokenContext } from "../hook/TokenContext";

const ListMeta = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  
  const { token } = useContext(TokenContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://fortuna-api.onrender.com/api/goals', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
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

    fetchData();
  }, []);

  useEffect(() => {
    if (error) {
      const mockData = [
        {
          "id": 26,
          "name": "Meu salario minimo brabo",
          "dividends": 40000,
          "patrimony": 4000000,
          "my_patrimony": 215937.02,
          "monthly_aport": 3135.098,
          "time_desired": 17.583334,
          "type_goal": true,
          "user_id": 1,
          "created_at": "2024-01-29T21:17:03.527Z",
          "updated_at": "2024-07-29T17:07:41.029Z",
          "my_dividends": 2159.3702,
          "rate": 0.01,
          "status": false,
          "finished_at": null,
          "planning": {},
          "summary": ""
        },
        {
          "id": 34,
          "name": "Segundo Salário",
          "dividends": 0,
          "patrimony": 0,
          "my_patrimony": 0,
          "monthly_aport": 0,
          "time_desired": 10,
          "type_goal": true,
          "user_id": 1,
          "created_at": "2024-07-16T02:06:10.287Z",
          "updated_at": "2024-07-16T02:06:10.287Z",
          "my_dividends": 0,
          "rate": 0.012,
          "status": false,
          "finished_at": null,
          "planning": [],
          "summary": ""
        },
        {
          "id": 37,
          "name": "Pagar casamento flash",
          "dividends": 430,
          "patrimony": 43000,
          "my_patrimony": 16000,
          "monthly_aport": 1968.9172,
          "time_desired": 1,
          "type_goal": false,
          "user_id": 1,
          "created_at": "2024-07-29T17:02:22.289Z",
          "updated_at": "2024-07-29T17:07:53.551Z",
          "my_dividends": 160,
          "rate": 0.01,
          "status": false,
          "finished_at": null,
          "planning": {},
          "summary": ""
        }
      ];
      setData(mockData);
    }
  }, [error]);

  const renderGoal = ({ item }) => (
    <View style={styles.goalContainer}>
      <Text style={styles.goalName}>{item.name}</Text>
      <Text>Patrimônio: R${item.patrimony}</Text>
      <Text>Meu Patrimônio: R${item.my_patrimony}</Text>
      <Text>Dividends: R${item.dividends}</Text>
      <Text>Aporte Mensal: R${item.monthly_aport}</Text>
      <Text>Tempo Desejado: {item.time_desired} anos</Text>
    </View>
  );

  const handleCreateGoal = () => {
    navigation.navigate('CreateGoal');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Nome de usuário,</Text>
        <Text style={styles.welcomeBackText}>Aqui estão suas metas financeiras:</Text>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#9a67ea" />
      ) : (
        <FlatList
          data={data}
          renderItem={renderGoal}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
      <Button title="Criar Nova Meta" onPress={handleCreateGoal} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    width: '100%',
    padding: 20,
    paddingBottom: 50,
    backgroundColor: '#9a67ea',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  welcomeText: {
    fontSize: 18,
    color: '#fff',
  },
  welcomeBackText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  goalContainer: {
    backgroundColor: '#f0f0f0',
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
    width: '100%',
  },
  goalName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default ListMeta;
