import React from "react";
import { Container, TitleButton, StyledIcon } from "./styles";
import { StyleSheet, Text, Image, View } from "react-native";

interface ButtonProps {
  title?: string;
  icon?: React.ComponentType<IconProps>; // Altere para o tipo adequado do ícone
  onPress?: () => void;
}

// Defina o tipo para o ícone
interface IconProps {
  size?: number;
  color?: string;
}

export function ButtonWhite({ title, icon: Icon, onPress }: ButtonProps) {
  return (
    <Container onPress={onPress}>
      {Icon && (
        <StyledIcon>
          <Icon />
        </StyledIcon>
      )}
      {title && <TitleButton>{title}</TitleButton>}
    </Container>
  );
}
