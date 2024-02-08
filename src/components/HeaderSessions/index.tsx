import React from "react";
import { Container, HeaderText, Icon } from "./styles";

interface HeaderProps {
  title?: string;
  icon?: any;
}

export function HeaderSessions({ title, icon, ...props }: HeaderProps) {
  return (
    <Container {...props}>
      {icon && <Icon source={icon} />}
      {title && <HeaderText>{title} </HeaderText>}
    </Container>
  );
}
