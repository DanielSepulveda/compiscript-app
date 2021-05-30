import * as React from "react";
import {
  StyleSheet,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Button } from "react-native-elements";
import shallow from "zustand/shallow";
import RNPickerSelect from "react-native-picker-select";

import { View } from "../components/themed";
import { useCodeStore, CodeState } from "../stores/codeStore";
import { TEST_SCRIPTS } from "../constants/testScripts";
import useColorScheme from "../hooks/useColorScheme";

const selector = (state: CodeState) => ({
  input: state.code,
  setInput: state.setCode,
  clearCode: state.clearCode,
});

type Item = {
  label: string;
  value: keyof typeof TEST_SCRIPTS;
};

const ITEMS: Item[] = [
  { label: "Fibonacci recursivo", value: "fib_recursive" },
  { label: "Fibonacci iterativo", value: "fib_iterative" },
  { label: "Factorial recursivo", value: "fact_recursive" },
  { label: "Factorial iterativo", value: "fact_iterative" },
  { label: "Saludo", value: "greet_user" },
  { label: "Bubble sort", value: "bubble_sort" },
];

export default function EditorTabScreen() {
  const [select, setSelect] = React.useState("");
  const { input, setInput, clearCode } = useCodeStore(selector, shallow);
  const theme = useColorScheme();

  const handleSelectTest = (value: string) => {
    setSelect(value);
    if (value !== null) {
      const selectedTest = TEST_SCRIPTS[value as keyof typeof TEST_SCRIPTS];
      setInput(selectedTest.trim());
    }
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={[
        styles.container,
        { backgroundColor: theme === "light" ? "#F3F4F6" : "#18181B" },
      ]}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View
          style={{
            flex: 1,
            backgroundColor: theme === "light" ? "#F3F4F6" : "#18181B",
          }}
        >
          <View
            style={[
              styles.actionsContainer,
              { backgroundColor: theme === "light" ? "#F3F4F6" : "#18181B" },
            ]}
          >
            <RNPickerSelect
              onValueChange={handleSelectTest}
              value={select}
              items={ITEMS}
              placeholder={{
                label: "Seleccionar prueba...",
                value: null,
              }}
              style={{
                viewContainer: styles.select,
                inputIOS: styles.selectInput,
                inputAndroid: styles.selectInput,
              }}
            />
            <Button onPress={clearCode} title="Borrar" />
          </View>
          <View
            style={[
              styles.inputContainer,
              { borderColor: theme === "light" ? "black" : "#F3F4F6" },
            ]}
          >
            <TextInput
              style={[
                styles.input,
                { color: theme === "light" ? "black" : "#E4E4E7" },
              ]}
              value={input}
              onChangeText={setInput}
              multiline
              autoCapitalize="none"
              autoCorrect={false}
              onBlur={() => {
                Keyboard.dismiss();
              }}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    padding: 16,
  },
  actionsContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  select: {
    flex: 1,
    borderWidth: 1,
    display: "flex",
    justifyContent: "center",
    borderRadius: 4,
    marginRight: 8,
    backgroundColor: "#F3F4F6",
  },
  selectInput: {
    padding: 8,
  },
  inputContainer: {
    flex: 1,
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 4,
    padding: 16,
    marginBottom: 16,
  },
  input: {
    color: "black",
    fontFamily: "space-mono",
    fontSize: 16,
    height: "100%",
  },
});
