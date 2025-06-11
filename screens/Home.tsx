import React from 'react';
import {
  StatusBar,
  Text,
  View,
  Alert,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity
} from 'react-native';
import {Post} from "@/components/Post";
import axios from "axios";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/screens/Navigation';

export type Post = {
  id: number;
  title: string;
  body: string;
}

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [posts, setPosts] = React.useState<Post[]>([]);
  const [loading, setLoading] = React.useState(true);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
      setPosts(response.data);

      setLoading(false);
    } catch (error) {
      console.log(error);
      Alert.alert('Posts not found', 'Please try again later.');
    }
  }

  React.useEffect(() => {
    setLoading(true);

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#0000ff" animating={loading} />
      </View>
    )
  }

  return (
    <View className="mx-4">
      <Text className="text-xl font-semibold mb-6">Posts</Text>

      <FlatList
        refreshControl={<RefreshControl refreshing={loading} onRefresh={fetchPosts} />}
        data={posts}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => navigation.navigate('FullPost', { postId: item.id })}>
            <Post {...item} />
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id.toString()}
      />

    </View>
  );
}
