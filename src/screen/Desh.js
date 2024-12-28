import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useCart } from "../component/CartContext";

export default function Desh({ route }) {
  const navigation = useNavigation();
  const { menuItem } = route.params;
  const { addToCart } = useCart();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
          <Ionicons name="cart-outline" size={24} color="#6B3CE9" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <Image source={{ uri: menuItem.image }} style={styles.image} />

        <View style={styles.detailsContainer}>
          <Text style={styles.name}>{menuItem.name}</Text>
          <Text style={styles.price}>${menuItem.price.toFixed(2)}</Text>
          <Text style={styles.description}>{menuItem.description}</Text>
        </View>
      </ScrollView>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          addToCart(menuItem);
          navigation.goBack();
        }}
      >
        <Text style={styles.addButtonText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  content: {
    flex: 1,
  },
  image: {
    width: "100%",
    height: 250,
    resizeMode: "cover",
  },
  detailsContainer: {
    padding: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  price: {
    fontSize: 20,
    fontWeight: "600",
    color: "#6B3CE9",
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: "#666",
    lineHeight: 24,
  },
  addButton: {
    backgroundColor: "#6B3CE9",
    margin: 16,
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
