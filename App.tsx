import "react-native-gesture-handler";
import React, { useContext, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./src/screens/LoginScreen";
import SignupScreen from "./src/screens/SignupScreen";
import GoalCreateScreen from "./src/screens/GoalCreateScreen";
import GoalDefineScreen from "./src/screens/GoalDefineScreen";
import QuestionsGoalScreen from "./src/screens/QuestionsGoalScreen";
import HomeScreen from "./src/screens/HomeScreen";
import ListMeta from "./src/screens/ListMeta";
import GoalCreatePlanScreen from "./src/screens/GoalCreatePlanScreen";

import FinancialGoalsScreen from "./src/screens/FinancialGoalsScreen";
import { TokenProvider, TokenContext } from "./src/hook/TokenContext";

const Stack = createStackNavigator();

const MainNavigator = () => {
  const { token } = useContext(TokenContext);

  useEffect(() => {
    // If the token changes, we need to reset the navigation state
  }, [token]);

  return (
    <Stack.Navigator>
      {!token ? (
        <>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Signup"
            component={SignupScreen}
            options={{ headerShown: false }}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Questôes" component={QuestionsGoalScreen} />
          <Stack.Screen name="Criando Meta" component={GoalCreateScreen} />
          <Stack.Screen name="Definição da meta" component={GoalDefineScreen} />
          <Stack.Screen name="Metas" component={ListMeta} />
          <Stack.Screen name="Plano de ação" component={GoalCreatePlanScreen} />
          <Stack.Screen
            name="FinancialGoals"
            component={FinancialGoalsScreen}
            options={{ headerShown: false }}
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
