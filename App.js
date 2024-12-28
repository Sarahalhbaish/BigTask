import { NavigationContainer } from "@react-navigation/native";
import MainNavigation from "./src/navigation/MainNavigation";
import { CartProvider } from "./src/component/CartContext";

export default function App() {
  return (
    <CartProvider>
      <NavigationContainer>
        <MainNavigation />
      </NavigationContainer>
    </CartProvider>
  );
}
