import styled from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";

export const Container = styled.View`
  width: 100%;
  max-width: 400px;
  height: 55px;
  border-width: 2px;
  border-color: ${({ theme }) => theme.COLORS.INPUT_BORDER};
  border-radius: 20px;
  background-color: ${({ theme }) => theme.COLORS.WHITE};

  flex-direction: column;
  gap: 3px;
  align-items: start;
  justify-content: start;

  padding: 8px 15px;
  font-size: 16px;
`;

export const TextInput = styled.TextInput`
  color: ${({ theme }) => theme.COLORS.INPUT_TEXT};
  width: 100%;
  align-items: center;
`;

export const TitleInput = styled.Text`
  color: ${({ theme }) => theme.COLORS.INPUT_TITLE};
  font-weight: bold;

  width: 100%;
`;

export const Icon = styled.Image`
  width: 20px;
  height: 20px;
`;
