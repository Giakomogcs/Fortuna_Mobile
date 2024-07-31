import "react-native-gesture-handler";
import React, { useContext, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./src/screens/LoginScreen";
import SignupScreen from "./src/screens/SignupScreen";
import GoalCreateScreen from "./src/screens/GoalCreateScreen";
import GoalDefineScreen from "./src/screens/GoalDefineScreen";
import QuestionsGoalScreen from "./src/screens/QuestionsGoalScreen";
import HomeScreen from "./src/screens/HomeScreen";
import FinancialGoalsScreen from "./src/screens/FinancialGoalsScreen";
import { TokenProvider, TokenContext } from "./src/hook/TokenContext";

const Stack = createStackNavigator();

const MainNavigator = () => {
  const { token } = useContext(TokenContext);
  const [initialRoute, setInitialRoute] = useState("Login");

  useEffect(() => {
    if (token) {
      setInitialRoute("Home");
    } else {
      setInitialRoute("Login");
    }
  }, [token]);

  return (
    <Stack.Navigator initialRouteName={initialRoute}>
      {!token ? (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Questôes" component={QuestionsGoalScreen} />
          <Stack.Screen name="Criando Meta" component={GoalCreateScreen} />
          <Stack.Screen name="Definição da meta" component={GoalDefineScreen} />
          <Stack.Screen
            name="FinancialGoals"
            component={FinancialGoalsScreen}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

function App() {
  return (
    <TokenProvider>
      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
    </TokenProvider>
  );
}

export default App;
