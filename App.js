import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, AsyncStorage } from "react-native";

export default function App() {
  const [name, setName] = useState();

  const save = async () => {
    try {
      await AsyncStorage.setItem("MyName", name);
    } catch (err) {
      alert(err);
    }

    // let user = {
    //   name: "DesignIntoCode",
    //   location: "US",
    // };

    // await AsyncStorage.setItem("MyName", JSON.stringify(user));
  };

  const load = async () => {
    try {
      let name = await AsyncStorage.getItem("MyName");

      if (name !== null) {
          setName(name);
      }

      // let jsonValue = await AsyncStorage.getItem("MyName")

      // if (jsonValue != null) {
      //   setName(JSON.parse(jsonValue))
      // }
    } catch (err) {
      alert(err);
    }
  };

  const remove = async () => {
    try {
      await AsyncStorage.removeItem("MyName");
    } catch (err) {
      alert(err);
    } finally {
      setName("");
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <View style={styles.container}>
      <Image
          source={require("./assets/welcome.png")}
          style={{ width: "100%", height: 200, marginTop: 64 }}
          resizeMode="contain"
      />

      <Text style={{ height: 30 }}>{name}</Text>
      <Text style={styles.name}>What's your name?</Text>

      <TextInput style={styles.input} onChangeText={(text) => setName(text)} />

      <TouchableOpacity style={styles.button} onPress={() => save()}>
        <Text style={{ color: "white" }}>Save my name!</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => remove()}>
        <Text style={{ color: "white" }}>Remove my name!</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  name: {
    fontSize: 24,
    fontWeight: "300",
  },
  input: {
    borderWidth: 1,
    borderColor: "#575DD9",
    alignSelf: "stretch",
    margin: 32,
    height: 64,
    borderRadius: 6,
    paddingHorizontal: 16,
    fontSize: 24,
    fontWeight: "300",
  },
  button: {
    backgroundColor: "#575DD9",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "stretch",
    paddingVertical: 12,
    paddingHorizontal: 32,
    marginTop: 32,
    marginHorizontal: 32,
    borderRadius: 6,
  },
});
