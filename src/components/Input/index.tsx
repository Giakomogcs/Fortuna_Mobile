import React from "react";
import { Container, TextInput, TitleInput, Icon } from "./styles";
import { StyleSheet, Text, Image, View } from "react-native";

interface InputProps {
  title?: string;
  icon?: any;
}

export function Input({ title, icon, ...props }: InputProps) {
  return (
    <Container>
      {icon && <Icon source={icon} />}
      {title && <TitleInput>{title} </TitleInput>}
      <TextInput {...props} />
    </Container>
  );
}
