import styled from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";

export const Container = styled.TouchableOpacity`
  width: 100%;
  max-width: 400px;
  height: 45px;

  border-radius: 20px;
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND_BUTTON};

  flex-direction: column;
  gap: 3px;
  align-items: center;
  justify-content: center;
`;

export const TitleButton = styled.Text`
  color: ${({ theme }) => theme.COLORS.WHITE};
  width: 100%;
  height: 100%;

  text-align: center; /* Centraliza o texto horizontalmente */
  line-height: 45px; /* Centraliza o texto verticalmente */
  font-size: 16px;
  font-weight: bold;
`;

export const Icon = styled.Image`
  width: 20px;
  height: 20px;
`;
