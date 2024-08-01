import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const TokenContext = createContext();

export const TokenProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadTokenAndUser = async () => {
      try {
        const storedToken = await AsyncStorage.getItem("userToken");
        const storedUser = await AsyncStorage.getItem("userData");

        if (storedToken) {
          setToken(storedToken);
        }

        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Failed to load token and user data", error);
      }
    };

    loadTokenAndUser();
  }, []);

  const saveTokenAndUser = async (userToken, userData) => {
    try {
      await AsyncStorage.setItem("userToken", userToken);
      await AsyncStorage.setItem("userData", JSON.stringify(userData));
      setToken(userToken);
      setUser(userData);
    } catch (error) {
      console.error("Failed to save token and user data", error);
    }
  };

  const removeTokenAndUser = async () => {
    try {
      await AsyncStorage.removeItem("userToken");
      await AsyncStorage.removeItem("userData");
      setToken("");
      setUser(null);
    } catch (error) {
      console.error("Failed to remove token and user data", error);
    }
  };

  const logout = () => {
    removeTokenAndUser();
  };

  return (
    <TokenContext.Provider
      value={{ token, user, setTokenAndUser: saveTokenAndUser, logout }}
    >
      {children}
    </TokenContext.Provider>
  );
};
