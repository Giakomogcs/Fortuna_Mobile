import styled from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND_DEFAULT};
  padding: 12%;
`;

export const Content = styled.View`
  width: 100%;
  //height: auto;
  margin: 20% 0 10%;

  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
`;

export const LoginInputs = styled.View`
  width: 100%;
  height: auto;

  flex: 1;
  gap: 16px;
  margin-top: 30px;
`;

export const Image = styled.Image`
  width: 100px;
  height: 100px;
`;
