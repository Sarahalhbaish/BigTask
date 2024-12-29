import { NavigationContainer } from "@react-navigation/native";
import MainNavigation from "./src/navigation/MainNavigation";
import { CartProvider } from "./src/component/CartContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { View } from "react-native";

const queryClient = new QueryClient();

export default function App() {
  return (
    <View style={{ flex: 1, pointerEvents: "box-none" }}>
      <CartProvider>
        <QueryClientProvider client={queryClient}>
          <NavigationContainer>
            <MainNavigation />
          </NavigationContainer>
        </QueryClientProvider>
      </CartProvider>
    </View>
  );
}
