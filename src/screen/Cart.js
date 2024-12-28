import {
  View,
  Text,
  Button,
  ScrollView,
  FlatList,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useCart } from "../component/CartContext";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function Cart() {
  const navigation = useNavigation();
  const { cartItems } = useCart();

  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Shopping Cart</Text>
      </View>

      <FlatList
        data={cartItems}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
            </View>
            <Ionicons name="trash-outline" size={24} color="#FF4444" />
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyCart}>Your cart is empty</Text>
        }
      />

      <View style={styles.footer}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Total:</Text>
          <Text style={styles.totalAmount}>${total.toFixed(2)}</Text>
        </View>
        <View style={styles.buttonsContainer}>
          <Button
            title="Continue Shopping"
            onPress={() => navigation.goBack()}
            color="#6B3CE9"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    padding: 20,
    backgroundColor: "#6B3CE9",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  cartItem: {
    flexDirection: "row",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    alignItems: "center",
    justifyContent: "space-between",
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 5,
  },
  itemPrice: {
    fontSize: 16,
    color: "#6B3CE9",
    fontWeight: "bold",
  },
  emptyCart: {
    textAlign: "center",
    padding: 20,
    fontSize: 16,
    color: "#666",
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: "bold",
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#6B3CE9",
  },
  buttonsContainer: {
    gap: 10,
  },
});
