import React from "react";
import { Start } from "./src/screens/start";
import { ThemeProvider } from "styled-components/native"; // Certifique-se de importar o ThemeProvider correto
import theme from "./styles/theme";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Start />
    </ThemeProvider>
  );
}
