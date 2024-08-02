import "react-native-gesture-handler";
import React, { useContext, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { NativeBaseProvider } from "native-base";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "styled-components";
import theme from "./src/theme";

import LoginScreen from "@screens/LoginScreen";
import SignupScreen from "@screens/SignupScreen";
import GoalCreateScreen from "@screens/GoalCreateScreen";
import GoalDefineScreen from "@screens/GoalDefineScreen";
import QuestionsGoalScreen from "@screens/QuestionsGoalScreen";
import HomeScreen from "@screens/HomeScreen";
import ListMeta from "@screens/ListMeta";
import GoalCreatePlanScreen from "@screens/GoalCreatePlanScreen";
import FinancialGoalsScreen from "@screens/FinancialGoalsScreen";
import UserEditScreen from "@screens/UserEditScreen";
import { TokenProvider, TokenContext } from "@hook/TokenContext";

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
          <Stack.Screen
            name="Criando Meta"
            component={GoalCreateScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Definição da meta" component={GoalDefineScreen} />
          <Stack.Screen
            name="Metas"
            component={ListMeta}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Plano de ação"
            component={GoalCreatePlanScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="FinancialGoals"
            component={FinancialGoalsScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="UserEditScreen"
            component={UserEditScreen}
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
      <NativeBaseProvider>
        <ThemeProvider theme={theme}>
          <SafeAreaProvider>
            <NavigationContainer>
              <MainNavigator />
            </NavigationContainer>
          </SafeAreaProvider>
        </ThemeProvider>
      </NativeBaseProvider>
    </TokenProvider>
  );
}

export default App;
