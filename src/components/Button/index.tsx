import React from "react";
import { Container, TitleButton, Icon } from "./styles";
import { StyleSheet, Text, Image, View } from "react-native";

interface ButtonProps {
  title?: string;
  icon?: any;
}

export function Button({ title, icon, ...props }: ButtonProps) {
  return (
    <Container {...props}>
      {icon && <Icon source={icon} />}
      {title && <TitleButton>{title} </TitleButton>}
    </Container>
  );
}
