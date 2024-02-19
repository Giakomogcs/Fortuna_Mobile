import React from "react";
import { Text } from "react-native";

import { StatusBar } from "expo-status-bar";
import { Container, Content, LoginInputs, Image } from "./styles";
import { Input } from "../../components/Input";
import PasswordInput from "../../components/PasswordInput";
import { Button } from "../../components/Button";
import { ButtonWhite } from "../../components/ButtonWhite";
import { HeaderSessions } from "../../components/HeaderSessions";
import { FooterSessions } from "../../components/FooterSessions";
import RememberMeCheckbox from "../../components/RememberMeCheckbox";

import { Ionicons } from "@expo/vector-icons";

import { FcGoogle } from "react-icons/fc";

export function Login() {
  return (
    <Container>
      <HeaderSessions title="Login" />
      <Content>
        <LoginInputs>
          <Input title="Email" />
          <PasswordInput title="Senha" />
        </LoginInputs>
        <RememberMeCheckbox />
        <Button title="Entrar" />
        <Text
          style={{
            marginVertical: 10,
            color: "#4E009C",
            fontSize: 24,
            fontWeight: "600",
          }}
        >
          ou
        </Text>
        <ButtonWhite
          title="Entrar com o Google"
          icon={() => <Ionicons name="logo-google" size={24} color="gray" />}
        />
        <ButtonWhite
          title="Entrar com a Apple"
          icon={() => <Ionicons name="logo-apple" size={24} color="gray" />}
        />
        <ButtonWhite
          title="Criar nova conta"
          style={{ marginTop: 20 }} // Adicionando marginTop de 10 pontos
        />
      </Content>
      <StatusBar style="auto" />

      <FooterSessions />
    </Container>
  );
}
