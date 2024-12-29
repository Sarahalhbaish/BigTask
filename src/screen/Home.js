import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCategories, getRestaurants } from "../api/storage";

export default function Home() {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
  console.log("categories", categories);

  const { data: restaurants } = useQuery({
    queryKey: ["restaurants"],
    queryFn: getRestaurants,
  });
  console.log("restaurants", restaurants);

  const handleSearch = (text) => {
    setSearchQuery(text);
    const filtered = restaurants?.filter((restaurant) =>
      restaurant.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredRestaurants(filtered);
  };
  console.log("Filtered Restaurants:", filteredRestaurants);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <Ionicons
            name="search-outline"
            size={20}
            color="#666"
            style={styles.searchIcon}
          />
          <TextInput
            placeholder="Search"
            style={styles.searchInput}
            placeholderTextColor="#666"
            value={searchQuery}
            onChangeText={handleSearch}
          />
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
          <Ionicons name="cart-outline" size={24} color="#6B3CE9" />
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Categories</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryContainer}
      >
        {categories?.map((item) => (
          <TouchableOpacity key={item._id} style={styles.categoryCard}>
            <Image source={{ uri: item.image }} style={styles.categoryImage} />
            <Text style={styles.categoryName}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Text style={styles.sectionTitle}>Popular Restaurants</Text>
      <View style={styles.restaurantsContainer}>
        {filteredRestaurants.length > 0
          ? filteredRestaurants.map((item) => (
              <TouchableOpacity
                key={item._id}
                style={styles.restaurantCard}
                onPress={() => 
                  
                  navigation.navigate("Menu", { id: item.id })}
              >
                <Image
                  source={{ uri: item.image }}
                  style={styles.restaurantImage}
                />
                <Text style={styles.restaurantName}>{item.name}</Text>
              </TouchableOpacity>
            ))
          : restaurants?.map((item) => (
              <TouchableOpacity
                key={item._id}
                style={styles.restaurantCard}
                onPress={() => {
                  console.log("Full item:", item);
                  console.log("item id is:", item._id);
                  console.log("Navigating to Menu with params:", {
                    id: item._id,
                  });
                  navigation.navigate("Menu", { id: item._id });
                }}
              >
                <Image
                  source={{ uri: item.image }}
                  style={styles.restaurantImage}
                />
                <Text style={styles.restaurantName}>{item.name}</Text>
              </TouchableOpacity>
            ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    gap: 10,
  },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    padding: 10,
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  categoryContainer: {
    marginBottom: 25,
  },
  categoryCard: {
    marginRight: 15,
    alignItems: "center",
  },
  categoryImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
  },
  restaurantsContainer: {
    marginBottom: 25,
  },
  restaurantCard: {
    marginBottom: 15,
    backgroundColor: "#fff",
    borderRadius: 12,
    boxShadow: "0px 2px 3.84px rgba(0, 0, 0, 0.1)",
    elevation: 5,
  },
  restaurantImage: {
    width: "100%",
    height: 200,
    borderRadius: 12,
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: "bold",
    padding: 10,
    color: "#333",
  },
  noResultsText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginTop: 20,
  },
});
