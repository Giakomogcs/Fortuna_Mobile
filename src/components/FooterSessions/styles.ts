import styled from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";

export const Container = styled.TouchableOpacity`
  width: 100%;

  height: 40px;

  flex-direction: row;
  gap: 8px;
  align-items: center;
  justify-content: center;
`;

export const FooterText = styled.Text`
  color: ${({ theme }) => theme.COLORS.COLOR_FOOTER};

  font-size: 20px;
  font-weight: 600;
`;

export const Image = styled.Image`
  width: 33px;
  height: 33px;
`;
