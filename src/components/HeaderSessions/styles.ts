import styled from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";

export const Container = styled.TouchableOpacity`
  width: 100%;
  max-width: 400px;
  height: auto;

  color: ${({ theme }) => theme.COLORS.COLOR_DEFAULT};

  flex-direction: column;
  gap: 3px;
  align-items: center;
  justify-content: center;
`;

export const Icon = styled.Image`
  width: 20px;
  height: 20px;
`;

export const HeaderText = styled.Text`
  color: ${({ theme }) => theme.COLORS.COLOR_HEADER};
  width: 100%;
  font-size: 24px;
  font-weight: 600;
  margin-top: 65px;
`;
