import styled from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";

export const Container = styled.TouchableOpacity`
  width: 100%;
  height: auto;

  display: flex;
  flex-direction: row;
  gap: 3px;
  align-items: center;
  justify-content: center;
  margin-top: 65px;
`;

export const Icon = styled.Image`
  width: 20px;
  height: 20px;
`;

export const HeaderText = styled.Text`
  color: ${({ theme }) => theme.COLORS.COLOR_DEFAULT};
  width: 100%;
  font-size: 24px;
  font-weight: 600;
`;
