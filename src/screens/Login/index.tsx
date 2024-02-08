import React from "react";
import { StatusBar } from "expo-status-bar";
import { Container, Content, LoginInputs, Image } from "./styles";
import { Input } from "../../components/Input";
import PasswordInput from "../../components/PasswordInput";
import { Button } from "../../components/Button";
import { ButtonWhite } from "../../components/ButtonWhite";
import { HeaderSessions } from "../../components/HeaderSessions";

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
        <Button title="Entrar" />
      </Content>
      <StatusBar style="auto" />
      <ButtonWhite title="Entrar" />
    </Container>
  );
}
