import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTheme } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { Platform } from "react-native";

import HomeScreen from "@screens/HomeScreen";
import ListMeta from "@screens/ListMeta";
import UserEditScreen from "@screens/UserEditScreen";

const Tab = createBottomTabNavigator();

const AppRoutes = () => {
  const { sizes, colors } = useTheme();
  const iconSizes = sizes[6];

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.purple[500],
        tabBarInactiveTintColor: colors.gray[200],
        tabBarStyle: {
          backgroundColor: colors.gray[700],
          borderTopWidth: 0,
          height: Platform.OS === "android" ? "auto" : 96,
          paddingBottom: sizes[10],
          paddingTop: sizes[6],
        },
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === "Home") {
            iconName = "home";
          } else if (route.name === "Metas") {
            iconName = "list";
          } else if (route.name === "Profile") {
            iconName = "person";
          } else {
            iconName = "ellipse"; // valor padrão caso a rota não corresponda
          }

          return <Ionicons name={iconName} size={iconSizes} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Metas" component={ListMeta} />
      <Tab.Screen name="Profile" component={UserEditScreen} />
    </Tab.Navigator>
  );
};

export default AppRoutes;
