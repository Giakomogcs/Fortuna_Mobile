import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTheme } from "native-base";
import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "@screens/HomeScreen";
import ListMeta from "@screens/ListMeta";
import UserEditScreen from "@screens/UserEditScreen";
import AppStack from "./AppStack";

const Tab = createBottomTabNavigator();

const AppTabs = () => {
  const { sizes, colors } = useTheme();
  const iconSizes = sizes[6];

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.purple[500],
        tabBarInactiveTintColor: colors.gray[200],
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
      <Tab.Screen
        name="AppStack"
        component={AppStack}
        options={{ tabBarButton: () => null }}
      />
    </Tab.Navigator>
  );
};

export default AppTabs;
