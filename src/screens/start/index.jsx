import { StyleSheet, Text, Image, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Container, Footer, FooterText, Content } from "./styles";

export function Start() {
  return (
    <Container>
      <Content>
        <Image source={require("../../../assets/logo.png")} />
      </Content>
      <Footer>
        <FooterText>
          by <Text style={{ fontWeight: "600" }}>Fortuna</Text>
        </FooterText>
      </Footer>
      <StatusBar style="auto" />
    </Container>
  );
}
