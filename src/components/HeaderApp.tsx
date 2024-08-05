import React, { useContext, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { HStack, VStack, Text, Icon, useTheme } from "native-base";
import { TouchableOpacity } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { TokenContext } from "../hooks/TokenContext";
import { MaterialIcons } from "@expo/vector-icons";

type HeaderProps = {
  title: string;
  onRefresh?: () => void;
};

const Header: React.FC<HeaderProps> = ({ title, onRefresh }) => {
  const navigation = useNavigation<NavigationProp<any>>();
  const { user, logout } = useContext(TokenContext);
  const theme = useTheme();
  const [imageError, setImageError] = useState(false);

  return (
    <SafeAreaView style={{ backgroundColor: theme.colors.purple[700] }}>
      <HStack
        alignItems="center"
        justifyContent="space-between"
        height={8}
        px={4}
      >
        <VStack flex={1}>
          <Text color={theme.colors.white} fontSize="xl" fontWeight="bold">
            {title}
          </Text>
        </VStack>
        {onRefresh && (
          <TouchableOpacity onPress={onRefresh}>
            <Icon
              as={MaterialIcons}
              name="refresh"
              color={theme.colors.white}
              size={7}
            />
          </TouchableOpacity>
        )}
      </HStack>
    </SafeAreaView>
  );
};

export default Header;
