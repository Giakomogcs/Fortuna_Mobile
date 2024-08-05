import React, { useContext, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { HStack, VStack, Text, Icon, Image } from "native-base";
import { TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { TokenContext } from "../hooks/TokenContext";
import { MaterialIcons } from "@expo/vector-icons";

type HeaderProps = {
  title: string;
  onRefresh?: () => void;
};

const getInitials = (name: string): string => {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("");
  return initials.substring(0, 2).toUpperCase();
};

const Header: React.FC<HeaderProps> = ({ title, onRefresh }) => {
  const navigation = useNavigation<NavigationProp<any>>();
  const { user, logout } = useContext(TokenContext);
  const [imageError, setImageError] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <HStack style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.navigate("UserEditScreen")}
          style={styles.userContainer}
        >
          {user?.picture && !imageError ? (
            <Image
              source={{
                uri: `https://fortuna-api.onrender.com/api/files/${user.picture}`,
              }}
              alt="User Photo"
              style={styles.userPhoto}
              onError={() => setImageError(true)}
            />
          ) : (
            <VStack style={styles.initialsContainer}>
              <Text style={styles.initialsText}>
                {getInitials(user?.name || "N/A")}
              </Text>
            </VStack>
          )}
        </TouchableOpacity>
        <VStack flex={1} marginLeft={4}>
          <Text style={styles.greetingText}>
            Olá, {user?.name || "Nome não disponível"}
          </Text>
        </VStack>
        {onRefresh && (
          <TouchableOpacity onPress={onRefresh} style={styles.refreshButton}>
            <Icon as={MaterialIcons} name="refresh" color="white" size={7} />
          </TouchableOpacity>
        )}

        <TouchableOpacity onPress={logout} style={styles.refreshButton}>
          <MaterialIcons name="logout" size={50} color="#9a67ea" />
        </TouchableOpacity>
      </HStack>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#4CAF50",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 8,
    paddingVertical: 16,
    backgroundColor: "#4CAF50",
  },
  userContainer: {
    marginRight: 8,
  },
  userPhoto: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  initialsContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  initialsText: {
    color: "#4CAF50",
    fontWeight: "bold",
    fontSize: 18,
  },
  greetingText: {
    color: "#fff",
    fontSize: 16,
  },
  refreshButton: {
    padding: 10,
  },
});

export default Header;
