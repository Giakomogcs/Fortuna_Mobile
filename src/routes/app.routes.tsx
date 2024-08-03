import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import GoalDetailScreen from "@screens/GoalDetailScreen";
import GoalCreateScreen from "@screens/GoalCreateScreen";
import GoalDefineScreen from "@screens/GoalDefineScreen";
import QuestionsGoalScreen from "@screens/QuestionsGoalScreen";
import HomeScreen from "@screens/HomeScreen";
import ListMeta from "@screens/ListMeta";
import GoalCreatePlanScreen from "@screens/GoalCreatePlanScreen";
import FinancialGoalsScreen from "@screens/FinancialGoalsScreen";
import UserEditScreen from "@screens/UserEditScreen";

const Stack = createStackNavigator();

const AppRoutes = () => {
  return (
    <Stack.Navigator>
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
      <Stack.Screen
        name="GoalDetail"
        component={GoalDetailScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AppRoutes;
