import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {HomeScreen} from "@/screens/Home";
import {FullPostScreen} from "@/screens/FullPost";

const Stack = createNativeStackNavigator();

export const Navigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
      <Stack.Screen name="FullPost" component={FullPostScreen} options={{ title: 'FullPost' }} />
   </Stack.Navigator>
  )
}