import * as React from "react";
import {
  StyleSheet,
  TextInput,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Button } from "react-native-elements";
import shallow from "zustand/shallow";
import RNPickerSelect from "react-native-picker-select";

import { View } from "../components/themed";
import { useCodeStore, CodeState } from "../stores/codeStore";

const selector = (state: CodeState) => ({
  input: state.code,
  setInput: state.setCode,
  clearCode: state.clearCode,
});

const ITEMS = [
  { label: "Fibonacci recursivo", value: "fib_recursive" },
  { label: "Fibonacci iterativo", value: "fib_iterative" },
  { label: "Factorial recursivo", value: "fact_recursive" },
  { label: "Factorial iterativo", value: "fact_iterative" },
];

export default function EditorTabScreen() {
  const [select, setSelect] = React.useState("");
  const { input, setInput, clearCode } = useCodeStore(selector, shallow);

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1, backgroundColor: "#F3F4F6" }}>
          <View style={styles.actionsContainer}>
            <RNPickerSelect
              onValueChange={setSelect}
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
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
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
    backgroundColor: "#F3F4F6",
  },
  actionsContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    backgroundColor: "#F3F4F6",
  },
  select: {
    flex: 1,
    borderWidth: 1,
    borderColor: "black",
    display: "flex",
    justifyContent: "center",
    borderRadius: 4,
    marginRight: 8,
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
