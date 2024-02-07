import styled from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND_DEFAULT};
  padding: 12%;
`;

export const LoginButton = styled.TouchableOpacity`
  width: 282px;
  height: 56px;
  justify-content: center;
  align-items: center;
`;

export const ButtonGradient = styled.View`
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.COLORS.GRADIENT};
`;

export const ButtonText = styled.Text`
  color: white;
  font-size: 18px;
`;
