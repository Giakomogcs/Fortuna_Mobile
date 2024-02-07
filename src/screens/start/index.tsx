// index.tsx
import React from "react";
import { Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import {
  Container,
  Footer,
  FooterContent,
  FooterText,
  Content,
} from "./styles";

export function Start() {
  return (
    <Container>
      <Content>
        <Image source={require("../../../assets/logo.png")} />
      </Content>
      <Footer>
        <FooterContent>
          <FooterText>by </FooterText>
          <FooterText style={{ fontWeight: "600" }}>Fortuna</FooterText>
        </FooterContent>
      </Footer>
      <StatusBar style="auto" />
    </Container>
  );
}
