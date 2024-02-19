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
import ProfilePicture from "../../components/ProfilePicture";

import { Ionicons } from "@expo/vector-icons";

export function Register() {
  return (
    <Container>
      <HeaderSessions title="Cadastro" />
      <Content>
        <ProfilePicture
          onPress={() => console.log("Adicionar imagem pressionado")}
        />
        <LoginInputs>
          <Input title="Nome" />
          <Input title="Email" />
          <PasswordInput title="Senha" />
          <Input title="Data de Nascimento" />
        </LoginInputs>

        <Button title="Cadastre-se" />
      </Content>
      <StatusBar style="auto" />

      <FooterSessions />
    </Container>
  );
}
