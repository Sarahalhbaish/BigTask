import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useUser } from "../component/UserContext";
import { useMutation } from "@tanstack/react-query";
import { getProfile } from "../api/storage";
import { useQuery } from "@tanstack/react-query";

export default function Profile() {
  const navigation = useNavigation();
  const { user, logout } = useUser();

  const mutation = useMutation({  
    mutationKey: ["logout"],
    mutationFn: () => logout(),
    onSuccess: () => {
      navigation.navigate("Login");
    },
  });

  const { data, isLoading, error } = useQuery({
    queryKey: ["profile"],
    queryFn: () => getProfile(),
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{ flex: 1 }} />
        <TouchableOpacity
          style={styles.cartButton}
          onPress={() => navigation.navigate("Cart")}
        >
          <Ionicons name="cart-outline" size={24} color="#6B3CE9" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.profileHeader}>
          <Image source={data?.image} style={styles.profileImage} />
          <Text style={styles.name}>{data?.name}</Text>
        </View>

        <View style={styles.infoSection}>
          <TouchableOpacity style={styles.infoItem}>
            <Ionicons name="person-outline" size={24} color="#6B3CE9" />
            <Text style={styles.infoText}>Edit Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.infoItem}>
            <Ionicons name="location-outline" size={24} color="#6B3CE9" />
            <Text style={styles.infoText}>Shipping Address</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.infoItem}>
            <Ionicons name="card-outline" size={24} color="#6B3CE9" />
            <Text style={styles.infoText}>Payment Methods</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.infoItem}>
            <Ionicons name="settings-outline" size={24} color="#6B3CE9" />
            <Text style={styles.infoText}>Settings</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
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
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  content: {
    flex: 1,
  },
  profileHeader: {
    alignItems: "center",
    padding: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  username: {
    fontSize: 16,
    color: "#666",
  },
  infoSection: {
    padding: 20,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  infoText: {
    marginLeft: 15,
    fontSize: 16,
    color: "#333",
  },
  logoutButton: {
    margin: 20,
    backgroundColor: "#FF4444",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  cartButton: {
    alignSelf: "flex-end",
  },
});
