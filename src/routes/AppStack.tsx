import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import GoalDetailScreen from "@screens/GoalDetailScreen";
import GoalCreateScreen from "@screens/GoalCreateScreen";
import GoalDefineScreen from "@screens/GoalDefineScreen";
import QuestionsGoalScreen from "@screens/QuestionsGoalScreen";
import HomeScreen from "@screens/HomeScreen";
import ListMeta from "@screens/ListMeta";
import GoalCreatePlanScreen from "@screens/GoalCreatePlanScreen";
import FinancialGoalsScreen from "@screens/FinancialGoalsScreen";
import UserEditScreen from "@screens/UserEditScreen";

const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="QuestionsGoal" component={QuestionsGoalScreen} />
      <Stack.Screen name="GoalCreate" component={GoalCreateScreen} />
      <Stack.Screen name="GoalDefine" component={GoalDefineScreen} />
      <Stack.Screen name="ListMeta" component={ListMeta} />
      <Stack.Screen name="GoalCreatePlan" component={GoalCreatePlanScreen} />
      <Stack.Screen name="FinancialGoals" component={FinancialGoalsScreen} />
      <Stack.Screen name="UserEdit" component={UserEditScreen} />
      <Stack.Screen name="GoalDetail" component={GoalDetailScreen} />
    </Stack.Navigator>
  );
};

export default AppStack;
