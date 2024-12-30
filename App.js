import { NavigationContainer } from "@react-navigation/native";
import MainNavigation from "./src/navigation/MainNavigation";
import { CartProvider } from "./src/component/CartContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UserProvider } from "./src/component/UserContext";

const queryClient = new QueryClient();

export default function App() {
  return (
      <UserProvider>
          <CartProvider>
            <QueryClientProvider client={queryClient}>
              <NavigationContainer>
              <MainNavigation />
          </NavigationContainer>
        </QueryClientProvider>
      </CartProvider>
    </UserProvider>
  );
}
