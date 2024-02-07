// App.tsx

import React from "react";
import { Start } from "./src/screens/Start";
import { Login } from "./src/screens/Login";
import { ThemeProvider } from "styled-components/native";
import theme from "./styles/theme";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Login />
    </ThemeProvider>
  );
}
