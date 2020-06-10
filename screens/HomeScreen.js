import React, { useState, useEffect } from "react";
import { Image, AsyncStorage } from "react-native";
import { StatusBar } from "react-native";
import styled, { ThemeProvider } from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { switchTheme } from "../redux/themeActions";
import { lightTheme, darkTheme } from "../Theme";

export default function HomeScreen() {
  const [name, setName] = useState();

  const save = async () => {
    try {
      await AsyncStorage.setItem("MyName", name);
    } catch (err) {
      alert(err);
    }
    // let user = {
    //   name: "Admin",
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

  const theme = useSelector((state) => state.themeReducer.theme);
  const dispatch = useDispatch();

  return (
    <ThemeProvider theme={theme}>
      <StatusBar barStyle={theme.STATUS_BAR_STYLE} />
      <Image
        source={require("../assets/welcome.png")}
        style={{ width: "100%", height: 200, marginTop: 64 }}
        resizeMode="contain"
      />
      <Container>
        <TextContainer>
          <Text>{name}</Text>
          <Text>What's your name?</Text>
          <TextInput onChangeText={(text) => setName(text)} />
        </TextContainer>

        <Button onPress={() => save()}>
          <ButtonText>Save my name!</ButtonText>
        </Button>

        <Button onPress={() => remove()}>
          <ButtonText>Remove my name!</ButtonText>
        </Button>

        {theme.mode === "light" ? (
          <Button onPress={() => dispatch(switchTheme(darkTheme))}>
            <ButtonText>Change to Dark Theme</ButtonText>
          </Button>
        ) : (
          <Button onPress={() => dispatch(switchTheme(lightTheme))}>
            <ButtonText>Change to Light Theme</ButtonText>
          </Button>
        )}
      </Container>
    </ThemeProvider>
  );
}

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.PRIMARY_BACKGROUND_COLOR};
`;

const TextContainer = styled.View`
  border: 1px solid ${(props) => props.theme.PRIMARY_TEXT_COLOR};
  padding: 16px;
  border-radius: 6px;
`;

const Text = styled.Text`
  color: ${(props) => props.theme.PRIMARY_TEXT_COLOR};
  font-size: 24px;
  font-weight: 600;
`;

const TextInput = styled.TextInput`
  border-width: 1px;
  border-color: #575DD9;
  align-self: stretch;
  margin: 32px;
  height: 64px;
  borderRadius: 6px;
  paddingHorizontal: 16px;
  fontSize: 24px;
`;

const Button = styled.TouchableOpacity`
  margin: 16px 32px 16px 32px;
  background-color: ${(props) => props.theme.PRIMARY_BUTTON_COLOR};
  padding: 16px 32px;
  border-radius: 6px;
  align-items: center;
  justify-content: center;
  align-self: stretch;
`;

const ButtonText = styled.Text`
  font-size: 15px;
  font-weight: 500;
  color: ${(props) => props.theme.PRIMARY_BUTTON_TEXT_COLOR};
`;
