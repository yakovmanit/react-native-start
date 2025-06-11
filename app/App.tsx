import React from 'react';
import {StatusBar, Text, View, Alert, FlatList, ActivityIndicator} from 'react-native';
import '../global.css';
import {Post} from "@/components/Post";
import axios from "axios";

type Posts = {
  id: number;
  title: string;
  body: string;
}

export default function App() {
  const [posts, setPosts] = React.useState<Posts[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setLoading(true);

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
      <StatusBar barStyle="default" />

      <Text className="text-xl font-semibold mb-6">Posts</Text>

      <FlatList
        data={posts}
        renderItem={({item}) => <Post {...item} />}
        keyExtractor={item => item.id.toString()}
      />

    </View>
  );
}
