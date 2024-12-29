import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screen/Home";
import Cart from "../screen/Cart";
import Menu from "../screen/Menu";
import Desh from "../screen/Desh";
const Stack = createNativeStackNavigator();

export default function HomeNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Cart" component={Cart} />
      <Stack.Screen name="Menu" component={Menu} />
      <Stack.Screen name="Desh" component={Desh} />
    </Stack.Navigator>
  );
}
