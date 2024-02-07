import styled from "styled-components/native";

export const Container = styled.View`
  width: 100%;
  max-width: 400px;
  height: 55px;
  border-width: 2px;
  border-color: ${({ theme }) => theme.COLORS.INPUT_BORDER};
  border-radius: 20px;
  background-color: ${({ theme }) => theme.COLORS.WHITE};

  flex-direction: row;
  gap: 3px;
  align-items: center;
  justify-content: start;

  padding: 8px 15px;
  font-size: 16px;
`;

export const PasswordArea = styled.View`
  width: 90%;
  max-width: 400px;
  height: 55px;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  padding: 8px 0px;
  font-size: 16px;
`;

export const TextInput = styled.TextInput`
  margin-left: 10px;
  color: ${({ theme }) => theme.COLORS.INPUT_TEXT};
  width: 100%;
  align-items: center;
`;

export const TitleInput = styled.Text`
  margin-left: 10px;
  color: ${({ theme }) => theme.COLORS.INPUT_TITLE};
  font-weight: bold;

  width: 100%;
`;

export const Icon = styled.Image`
  width: 20px;
  height: 20px;
`;
