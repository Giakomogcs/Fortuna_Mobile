import React from "react";
import { View, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface PictureProps {
  imageSource?: any;
  onPress?: any;
}

const ProfilePicture = ({ imageSource, onPress }: PictureProps) => {
  return (
    <View style={{ alignItems: "center" }}>
      <TouchableOpacity onPress={onPress} style={{ position: "relative" }}>
        <Image
          source={
            imageSource
              ? { uri: imageSource }
              : require("../../../assets/userDefault.png")
          }
          style={{
            width: 127,
            height: 127,
            borderRadius: 100,
            borderWidth: 3,
            borderColor: "#4E009C",
            resizeMode: "cover",
          }}
        />
        <View
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            backgroundColor: "#4E009C",
            borderRadius: 20,
          }}
        >
          <Ionicons
            name="camera"
            size={24}
            color="white"
            style={{ padding: 5 }}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ProfilePicture;
