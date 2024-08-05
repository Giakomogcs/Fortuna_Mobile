import React from "react";
import { Spinner, Center, Text, useTheme } from "native-base";

type LoadingProps = {
  title?: string;
  spinnerSize?: string | number;
};

export function Loading({ title, spinnerSize = "lg" }: LoadingProps) {
  const theme = useTheme();

  return (
    <Center flex={1} bg={theme.colors.gray[700]} width="100%" height="100%">
      <Spinner color={theme.colors.purple[500]} size={spinnerSize} />
      {title && (
        <Text fontSize="xl" color={theme.colors.purple[500]} mt={4}>
          {title}
        </Text>
      )}
    </Center>
  );
}
