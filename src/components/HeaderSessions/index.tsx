import React from "react";
import { TouchableOpacity } from "react-native";
import { Container, HeaderText, Icon } from "./styles";
import { Ionicons } from "@expo/vector-icons";

interface HeaderProps {
  title?: string;
  icon?: any;
  onPressIcon?: () => void; // Adicione uma propriedade para lidar com o pressionamento do ícone
}

export function HeaderSessions({
  title,
  icon,
  onPressIcon,
  ...props
}: HeaderProps) {
  return (
    <Container {...props}>
      {icon ? (
        <TouchableOpacity
          onPress={onPressIcon}
          style={{ marginHorizontal: 20 }}
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
      ) : null}
      {title && <HeaderText>{title} </HeaderText>}
    </Container>
  );
}
