import React, { useContext } from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { useTheme, Box } from "native-base";
import { TokenContext } from "@hooks/TokenContext";
import AuthRoutes from "./auth.routes";
import AppTabs from "./StackNavigator"; // Ajustado para usar AppTabs (StackNavigator)
import { Loading } from "@components/Loading";
import { THEME } from "src/theme";

const Routes = () => {
  const { token, user, isLoadingUserStorageData } = useContext(TokenContext);
  const { colors } = useTheme();

  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
    },
  };

  if (isLoadingUserStorageData) {
    return <Loading />;
  }

  return (
    <Box flex={1} bg={THEME.colors.background[500]}>
      <NavigationContainer theme={theme}>
        {token ? <AppTabs /> : <AuthRoutes />}
      </NavigationContainer>
    </Box>
  );
};

export default Routes;
