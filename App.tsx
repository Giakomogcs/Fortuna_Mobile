import "react-native-gesture-handler";
import React from "react";
import { NativeBaseProvider } from "native-base";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "styled-components";
import theme from "./src/theme";
import { TokenProvider } from "@hooks/TokenContext";
import Routes from "./src/routes";

const App = () => {
  return (
    <TokenProvider>
      <NativeBaseProvider>
        <ThemeProvider theme={theme}>
          <SafeAreaProvider>
            <Routes />
          </SafeAreaProvider>
        </ThemeProvider>
      </NativeBaseProvider>
    </TokenProvider>
  );
};

export default App;
