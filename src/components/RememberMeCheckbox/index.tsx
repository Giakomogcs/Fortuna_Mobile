import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

const RememberMeCheckbox = () => {
  const [isChecked, setIsChecked] = useState(false);

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        alignItems: "center",
        marginBottom: 20,
      }}
    >
      <TouchableOpacity onPress={toggleCheckbox}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View
            style={{
              width: 20,
              height: 20,
              borderRadius: 4,
              borderWidth: 2,
              borderColor: isChecked ? "blue" : "black",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {isChecked && (
              <View
                style={{
                  width: 10,
                  height: 10,
                  backgroundColor: "blue",
                  borderRadius: 2,
                }}
              />
            )}
          </View>
          <Text style={{ marginLeft: 8, color: "gray" }}>Lembrar senha</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={{ color: "gray", textDecorationLine: "underline" }}>
          Esqueci a senha?
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default RememberMeCheckbox;
