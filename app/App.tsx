import React from 'react';
import {StatusBar, Text, View, Alert} from 'react-native';
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

  React.useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        setPosts(response.data);
      } catch (error) {
        console.log(error);
        Alert.alert('Posts not found', 'Please try again later.');
      }
    }

    fetchPosts();
  }, []);

  return (
    <View className="mx-4">
      <StatusBar barStyle="default" />

      {/* Posts wrapper */}
      <Text className="text-xl font-semibold mb-6">Posts</Text>
      {
        posts.map((post) => (
          <Post key={post.id} {...post} />
        ))
      }
    </View>
  );
}
