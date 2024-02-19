import React from "react";
import { Container, TitleButton, StyledIcon } from "./styles";
import { StyleSheet, Text, Image, View } from "react-native";

import { TouchableOpacityProps } from "react-native";

interface ButtonProps extends TouchableOpacityProps {
  title?: string;
  icon?: React.ComponentType<IconProps>;
  style?: object; // Defina a propriedade de estilo como opcional
}

// Defina o tipo para o ícone
interface IconProps {
  size?: number;
  color?: string;
}

export function ButtonWhite({
  title,
  icon: Icon,
  onPress,
  style,
}: ButtonProps) {
  return (
    <Container onPress={onPress} style={style}>
      {Icon && (
        <StyledIcon>
          <Icon />
        </StyledIcon>
      )}
      {title && <TitleButton>{title}</TitleButton>}
    </Container>
  );
}
