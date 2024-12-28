import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeNavigation from "./HomeNavigation";
import RegisterNavigation from "./RegisterNavigation";

const Tab = createBottomTabNavigator();

export default function MainNavigation() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={HomeNavigation} />
      <Tab.Screen name="Account" component={RegisterNavigation} />
    </Tab.Navigator>
  );
}
