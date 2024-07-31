import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const TokenContext = createContext();

export const TokenProvider = ({ children }) => {
  const [token, setToken] = useState("");

  useEffect(() => {
    const loadToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem("userToken");
        if (storedToken) {
          setToken(storedToken);
        }
      } catch (error) {
        console.error("Failed to load token", error);
      }
    };

    loadToken();
  }, []);

  const saveToken = async (userToken) => {
    try {
      await AsyncStorage.setItem("userToken", userToken);
      setToken(userToken);
    } catch (error) {
      console.error("Failed to save token", error);
    }
  };

  const removeToken = async () => {
    try {
      await AsyncStorage.removeItem("userToken");
      setToken("");
    } catch (error) {
      console.error("Failed to remove token", error);
    }
  };

  const logout = () => {
    removeToken();
  };

  return (
    <TokenContext.Provider value={{ token, setToken: saveToken, logout }}>
      {children}
    </TokenContext.Provider>
  );
};
