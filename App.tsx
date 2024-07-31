import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./src/screens/LoginScreen";
import SignupScreen from "./src/screens/SignupScreen";
import MetaScreen from "./src/screens/MetaScreen";
import HomeScreen from "./src/screens/HomeScreen";
import FinancialGoalsScreen from "./src/screens/FinancialGoalsScreen";
import { TokenProvider } from "./src/components/TokenContext";

const Stack = createStackNavigator();

function App() {
  return (
    <TokenProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
          <Stack.Screen name="Criando Meta" component={MetaScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen
            name="FinancialGoals"
            component={FinancialGoalsScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </TokenProvider>
  );
}

export default App;
