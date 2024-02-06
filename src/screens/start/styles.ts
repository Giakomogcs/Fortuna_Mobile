import styled from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND_DEFAULT};
`;

export const Content = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const Footer = styled(LinearGradient).attrs({
  colors: ["#3a0273", "#592d60"],
  start: { x: 0, y: 0 },
  end: { x: 0, y: 1 },
})`
  height: 100px;
  border-radius: 15px 15px 0 0;
  align-items: center;
  justify-content: center;
`;

export const FooterText = styled.Text`
  color: ${({ theme }) => theme.COLORS.WHITE};
  font-size: 24px;
`;
