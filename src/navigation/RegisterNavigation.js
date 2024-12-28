import { createStackNavigator } from "@react-navigation/stack";
import Register from "../screen/Register";
import Login from "../screen/Login";
import Profile from "../screen/Profile";

const Stack = createStackNavigator();

export default function RegisterNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
}
