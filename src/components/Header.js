import React, { useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TokenContext } from "../hook/TokenContext";
import Icon from "react-native-vector-icons/Ionicons";

const getInitials = (name) => {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("");
  return initials.substring(0, 2).toUpperCase();
};

const Header = ({ title, onRefresh }) => {
  const navigation = useNavigation();
  const { user } = useContext(TokenContext);

  return (
    <View style={styles.header}>
      <TouchableOpacity
        onPress={() => navigation.navigate("FinancialGoals")}
        style={styles.userContainer}
      >
        {user?.photoUrl ? (
          <Image source={{ uri: user.photoUrl }} style={styles.userPhoto} />
        ) : (
          <View style={styles.initialsContainer}>
            <Text style={styles.initialsText}>
              {getInitials(user?.name || "")}
            </Text>
          </View>
        )}
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      {onRefresh && (
        <TouchableOpacity onPress={onRefresh} style={styles.refreshButton}>
          <Icon name="refresh" size={24} color="#fff" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "#4CAF50",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    flex: 1,
    textAlign: "center",
  },
  userContainer: {
    padding: 10,
  },
  userPhoto: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  initialsContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  initialsText: {
    color: "#4CAF50",
    fontWeight: "bold",
    fontSize: 18,
  },
  refreshButton: {
    padding: 10,
  },
});

export default Header;
