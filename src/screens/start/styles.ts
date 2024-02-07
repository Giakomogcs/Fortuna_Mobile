// styles.ts
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND_DEFAULT};
`;

export const Content = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const Footer = styled.View`
  height: 100px;
  border-radius: 15px 15px 0 0;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND_FOOTER};
`;

export const FooterContent = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const FooterText = styled.Text`
  color: ${({ theme }) => theme.COLORS.WHITE};
  font-size: 24px;
`;
