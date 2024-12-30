import { useState } from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { register } from "../api/storage";
import { useMutation } from "@tanstack/react-query";

export default function Register() {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  const mutation = useMutation({
    mutationKey: ["register"],
    mutationFn: (newUser) => register(newUser),
  });

  const handleRegister = () => {
    mutation.mutate({
      username: username,
      password: password,
      image: image,
    });
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Create Account</Text>
        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          style={styles.input}
          placeholderTextColor="#666"
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          secureTextEntry
          placeholderTextColor="#666"
        />
        <TextInput
          placeholder="Image URL"
          value={image}
          onChangeText={setImage}
          style={styles.input}
          placeholderTextColor="#666"
        />
        <View style={styles.buttonContainer}>
          <Button title="Register" onPress={handleRegister} color="#6B3CE9" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    justifyContent: "center",
  },
  formContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    ...(Platform.OS === "ios" || Platform.OS === "web"
      ? { boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" }
      : { elevation: 5 }),
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },
  buttonContainer: {
    marginTop: 10,
  },
});
