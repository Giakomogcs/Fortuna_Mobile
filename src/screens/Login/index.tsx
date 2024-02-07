import { StyleSheet, Text, Image, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Container } from "./styles";

import { Input } from "../../components/Input";

export function Login() {
  return (
    <Container>
      <Input title="Name:" />

      <StatusBar style="auto" />
    </Container>
  );
}
