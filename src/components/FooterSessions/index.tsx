import React from "react";
import { Container, FooterText, Image } from "./styles";

interface HeaderProps {
  title?: string;
  icon?: any;
}

export function FooterSessions({ ...props }: HeaderProps) {
  return (
    <Container {...props}>
      <Image source={require("../../../assets/logo.png")} />
      <FooterText>Fortuna</FooterText>
    </Container>
  );
}
