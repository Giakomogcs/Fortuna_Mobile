import React from "react";
import { Container, TitleButton, StyledIcon } from "./styles";
import { StyleSheet, Text, Image, View } from "react-native";

interface ButtonProps {
  title?: string;
  icon?: any; // Alteração aqui para IconType
}

export function ButtonWhite({ title, icon, ...props }: ButtonProps) {
  return (
    <Container {...props}>
      {icon && <StyledIcon>{icon}</StyledIcon>}
      {""}
      {/* Renderiza o ícone como um componente */}
      {title && <TitleButton>{title} </TitleButton>}
    </Container>
  );
}
