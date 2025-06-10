import React from 'react';
import {Text, View} from "react-native";

interface Props {
  title: string;
}

export const Post: React.FC<Props> = ({ title }) => {
  return (
    <View className="flex-row gap-4 items-center text-xl font-semibold mb-4 border border-gray-300 rounded-lg p-4">
      <Text className="text-xl font-semibold mb-2">
        {title}
      </Text>
    </View>
  );
};
