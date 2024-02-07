import React from "react";
import { StatusBar } from "expo-status-bar";
import { Container, LoginButton, ButtonText, ButtonGradient } from "./styles";
import { Input } from "../../components/Input";
import PasswordInput from "../../components/PasswordInput";
import { LinearGradient } from "expo-linear-gradient";

export function Login() {
  return (
    <Container>
      <Input title="Email" />
      <PasswordInput title="Senha" />
      <LoginButton>
        <ButtonGradient>
          <ButtonText>Entrar</ButtonText>
        </ButtonGradient>
      </LoginButton>
      <StatusBar style="auto" />
    </Container>
  );
}
