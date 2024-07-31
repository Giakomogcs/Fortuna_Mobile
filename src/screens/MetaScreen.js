import React, { useState } from 'react';
import { View, Text, TextInput, Switch, StyleSheet, Button, Alert, ScrollView } from 'react-native';

const MetaScreen = () => {
  const [name, setName] = useState('');
  const [typeGoal, setTypeGoal] = useState(false);
  const [patrimony, setPatrimony] = useState();
  const [initialPatrimony, setInitialPatrimony] = useState();
  const [timeDesired, setTimeDesired] = useState(); // anos
  const [monthlyAport, setMonthlyAport] = useState();
  const [rate, setRate] = useState(0.01);
  const [dividends, setDividends] = useState();
  const [responseMessage, setResponseMessage] = useState('');

  const handleSubmit = async () => {
    const goalData = {
      name,
      patrimony: typeGoal ? 0 : patrimony,
      dividends: typeGoal ? dividends : 0,
      type_goal: typeGoal,
      initial_patrimony: typeGoal ? 0 : initialPatrimony,
      time_desired: timeDesired,
      monthly_aport: monthlyAport,
      rate: rate,
    };

    try {
      // Authenticate and get the token
      const authResponse = await fetch('https://fortuna-api.onrender.com/api/sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'neguinho@gmail.com',
          password: '123',
        }),
      });

      if (!authResponse.ok) {
        setResponseMessage('Failed to authenticate.');
        return;
      }

      const authData = await authResponse.json();
      const token = authData.token;

      // Send the goal data with the token
      const response = await fetch('https://fortuna-api.onrender.com/api/goals/preview', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(goalData),
      });

      if (response.ok) {
        const result = await response.json();
        setResponseMessage(JSON.stringify(result, null, 2));
      } else {
        setResponseMessage('Failed to submit goal data.');
      }
    } catch (error) {
      setResponseMessage('An error occurred while submitting goal data.');
      console.error('Error:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Name:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

      <View style={styles.switchContainer}>
        <Text style={styles.label}>Type Goal:</Text>
        <Switch
          value={typeGoal}
          onValueChange={setTypeGoal}
        />
      </View>

      {!typeGoal && (
        <>
          <Text style={styles.label}>Patrimony:</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={String(patrimony)}
            onChangeText={text => setPatrimony(Number(text))}
          />

          <Text style={styles.label}>Initial Patrimony:</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={String(initialPatrimony)}
            onChangeText={text => setInitialPatrimony(Number(text))}
          />
        </>
      )}

      {typeGoal && (
        <>
          <Text style={styles.label}>Dividends:</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={String(dividends)}
            onChangeText={text => setDividends(Number(text))}
          />

          <Text style={styles.label}>Initial Patrimony:</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={String(initialPatrimony)}
            onChangeText={text => setInitialPatrimony(0)}
            editable={false} // Desabilita edição
          />
        </>
      )}

      <Text style={styles.label}>Time Desired (years):</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={String(timeDesired)}
        onChangeText={text => setTimeDesired(Number(text))}
      />

      <Text style={styles.label}>Monthly Aport:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={String(monthlyAport)}
        onChangeText={text => setMonthlyAport(Number(text))}
      />

      <Text style={styles.label}>Rate:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={String(rate)}
        onChangeText={text => setRate(Number(text))}
      />

      <Button title="Submit" onPress={handleSubmit} />

      {responseMessage ? (
        <View style={styles.responseContainer}>
          <Text style={styles.responseLabel}>Response:</Text>
          <Text style={styles.responseText}>{responseMessage}</Text>
        </View>
      ) : null}
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
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  responseContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  responseLabel: {
    fontWeight: 'bold',
  },
  responseText: {
    marginTop: 5,
    color: '#333',
  },
});

export default MetaScreen;