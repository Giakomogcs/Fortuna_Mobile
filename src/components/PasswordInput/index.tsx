import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Container, TextInput, TitleInput, Icon, PasswordArea } from "./styles";

interface PasswordInputProps {
  title: string;
}

const PasswordInput: React.FC<PasswordInputProps> = ({ title }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container>
      <PasswordArea>
        {title && <TitleInput>{title} </TitleInput>}
        <TextInput
          secureTextEntry={!showPassword}
          value={inputValue}
          onChangeText={setInputValue}
        />
      </PasswordArea>
      <TouchableOpacity onPress={toggleShowPassword}>
        <MaterialIcons
          name={showPassword ? "visibility-off" : "visibility"}
          size={24}
          color="gray"
        />
      </TouchableOpacity>
    </Container>
  );
};

export default PasswordInput;
