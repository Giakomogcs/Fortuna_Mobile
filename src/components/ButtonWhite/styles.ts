import styled from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";

export const Container = styled.TouchableOpacity`
  width: 100%;
  max-width: 400px;
  height: 45px;

  border-radius: 20px;
  border-width: 2px;
  border-color: ${({ theme }) => theme.COLORS.BUTTON_BORDER};

  background-color: ${({ theme }) => theme.COLORS.WHITE};

  flex-direction: row;
  gap: 10px;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
`;

export const TitleButton = styled.Text`
  color: ${({ theme }) => theme.COLORS.COLOR_DEFAULT};
  width: 90%;
  text-align: center; /* Centraliza o texto horizontalmente */
  line-height: 45px; /* Centraliza o texto verticalmente */
  font-size: 16px;

  line-height: 16px;
`;

export const StyledIcon = styled.View`
  width: 24px;
  height: 24px;
`;
