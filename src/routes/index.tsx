import React, { useContext } from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { useTheme, Box } from "native-base";
import { TokenContext } from "@hooks/TokenContext";
import AuthRoutes from "./auth.routes";
import AppRoutes from "./app.routes";
import AppTabs from "./StackNavigator";
import { Loading } from "@components/Loading";

const Routes = () => {
  const { token, user, isLoadingUserStorageData } = useContext(TokenContext);
  const { colors } = useTheme();

  const theme = DefaultTheme;
  theme.colors.background = colors.gray[700];

  if (isLoadingUserStorageData) {
    return <Loading />;
  }

  return (
    <Box flex={1} bg={"gray.700"}>
      <NavigationContainer theme={theme}>
        {token ? <AppTabs /> : <AuthRoutes />}
      </NavigationContainer>
    </Box>
  );
};

export default Routes;
