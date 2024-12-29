import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useCart } from "../component/CartContext";
import { useQuery } from "@tanstack/react-query";
import { getRestaurantById } from "../api/storage";

export default function Menu({ route }) {
  const navigation = useNavigation();
  const { id } = route.params;
  const { addToCart } = useCart();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["restaurant", id],
    queryFn: ({ queryKey }) => getRestaurantById(queryKey[1]),
  });
  console.log("data is", data);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
          <Ionicons name="cart-outline" size={24} color="#6B3CE9" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.restaurantInfo}>
          <Image source={{ uri: data?.image }} style={styles.restaurantImage} />
          <Text style={styles.restaurantName}>{data?.name}</Text>
        </View>

        <View style={styles.menuList}>
          {data?.items?.map((menuItem) => (
            <View key={menuItem._id} style={styles.menuItem}>
              <Image
                source={{ uri: menuItem.image }}
                style={styles.menuItemImage}
              />
              <View style={styles.menuItemInfo}>
                <Text style={styles.menuItemName}>{menuItem.name}</Text>
                <Text style={styles.menuItemPrice}>
                  ${menuItem.price?.toFixed(2)}
                </Text>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => addToCart(menuItem)}
                  >
                    <Text style={styles.buttonText}>Add to Cart</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.detailsButton}
                    onPress={() =>
                      navigation.navigate("Desh", { id: menuItem._id })
                    }
                  >
                    <Text style={styles.detailsButtonText}>Details</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
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
  restaurantInfo: {
    padding: 16,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  restaurantImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 12,
  },
  restaurantName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  menuList: {
    padding: 16,
  },
  menuItem: {
    flexDirection: "row",
    backgroundColor: "#fff",
    marginBottom: 16,
    borderRadius: 12,
    padding: 12,
    ...Platform.select({
      ios: {
        boxShadow: "0px 2px 3.84px rgba(0, 0, 0, 0.1)",
      },
      android: {
        elevation: 5,
      },
    }),
  },
  menuItemImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 12,
  },
  menuItemInfo: {
    flex: 1,
    justifyContent: "space-between",
  },
  menuItemName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  menuItemPrice: {
    fontSize: 16,
    color: "#6B3CE9",
    fontWeight: "bold",
    marginBottom: 8,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 8,
  },
  addButton: {
    backgroundColor: "#6B3CE9",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    flex: 1,
  },
  detailsButton: {
    backgroundColor: "#fff",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#6B3CE9",
    flex: 1,
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
  detailsButtonText: {
    color: "#6B3CE9",
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
});
