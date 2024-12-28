import { useState } from "react";
import { View, Text, Button, TextInput, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { users } from "../data/users";

export default function Register() {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  const handleRegister = () => {
    const newUser = {
      id: users.length,
      username: username,
      password: password,
      details: [{ name: name, image: image }],
    };
    users.push(newUser);
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
          placeholder="Name"
          value={name}
          onChangeText={setName}
          style={styles.input}
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
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
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
