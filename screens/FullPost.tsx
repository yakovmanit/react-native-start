import React from 'react';
import { View, Text, Alert, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {Post} from "@/screens/Home";

export type RootStackParamList = {
  Home: undefined;
  FullPost: { postId: number };
};

type Props = NativeStackScreenProps<RootStackParamList, 'FullPost'>;

export const FullPostScreen: React.FC<Props> = ({ route }) => {
  const [post, setPost] = React.useState<Post>();
  const [loading, setLoading] = React.useState(true);
  const { postId } = route.params;

  const fetchPost = async () => {
    try {
      const response = await axios.get<Post>(`https://jsonplaceholder.typicode.com/posts/${postId}`);
      setPost(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      Alert.alert('Posts not found', 'Please try again later.');
    }
  };

  React.useEffect(() => {
    setLoading(true);
    fetchPost();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#0000ff" animating={loading} />
      </View>
    );
  }

  return (
    <View className="mx-4">
      <Text className="text-xl font-semibold mb-6">Post</Text>
      <Text className="text-xl font-semibold mb-6">{post?.title}</Text>
      <Text>{post?.body}</Text>
    </View>
  );
};
