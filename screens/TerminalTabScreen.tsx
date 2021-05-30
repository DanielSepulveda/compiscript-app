import * as React from "react";
import {
  StyleSheet,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/Feather";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { parser, compiler, vm } from "@danielsepulveda/compiscript";
import "react-native-get-random-values";
import { nanoid } from "nanoid";

import { View } from "../components/themed";
import { useCodeStore, CodeState } from "../stores/codeStore";
import { MonoText } from "../components/StyledText";
import useColorScheme from "../hooks/useColorScheme";

const selector = (state: CodeState) => state.code;

type OutputItem = {
  key: string;
  message: string;
  isError?: boolean;
};

export default function TerminalTabScreen() {
  const inputRef = React.useRef<TextInput>(null);
  const [inputState, setInputState] = React.useState<"active" | "disabled">(
    "disabled"
  );
  const [input, setInput] = React.useState("");
  const code = useCodeStore(selector);
  const [output, setOutput] = React.useState<OutputItem[]>([]);
  const theme = useColorScheme();

  const handleExecuteCode = async () => {
    setOutput([]);
    try {
      const parsed = parser(code);
      const compiled = compiler(parsed);
      vm.init(compiled);
      vm.execute({
        onOutput: (message) => {
          if (message === "\n") {
            setOutput((prev) => [...prev, { key: nanoid(), message: "" }]);
          } else {
            setOutput((prev) => {
              const lastOutput = prev[prev.length - 1];
              if (lastOutput === undefined) {
                return [{ key: nanoid(), message }];
              } else {
                lastOutput.message = `${lastOutput.message}${message}`;
                const outputWithoutLast = prev.slice(0, prev.length - 1);
                return [...outputWithoutLast, lastOutput];
              }
            });
          }
        },
        onInput: () => {
          setInputState("active");
          inputRef.current?.focus();
        },
      });
    } catch (e) {
      setOutput([{ message: e.message, key: nanoid(), isError: true }]);
    }
  };

  const handleInput = () => {
    vm.sendInput(input);
    setInput("");
    setInputState("disabled");
  };

  const outputTextColor = theme === "light" ? "black" : "#E4E4E7";

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
          <Button
            style={{ marginBottom: 16 }}
            title="Ejecutar codigo"
            onPress={handleExecuteCode}
          />
          <View
            style={[
              styles.outputContainer,
              { borderColor: theme === "light" ? "black" : "#F3F4F6" },
            ]}
          >
            {output.map((o) => (
              <MonoText
                key={o.key}
                style={{ color: o.isError ? "red" : outputTextColor }}
              >
                {o.message}
              </MonoText>
            ))}
          </View>
          <View
            style={[
              styles.inputContainer,
              { backgroundColor: theme === "light" ? "#F3F4F6" : "#18181B" },
            ]}
          >
            <TextInput
              ref={inputRef}
              style={styles.input}
              value={input}
              onChangeText={setInput}
              autoCapitalize="none"
              autoCorrect={false}
              editable={inputState === "active"}
              onBlur={() => {
                Keyboard.dismiss();
              }}
            />
            <Button
              disabled={inputState === "disabled"}
              buttonStyle={{ height: "100%" }}
              icon={<Icon name="arrow-right" color="white" size={32} />}
              onPress={handleInput}
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
  outputContainer: {
    flex: 1,
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 4,
    padding: 16,
    marginBottom: 24,
  },
  inputContainer: {
    height: 50,
    display: "flex",
    flexDirection: "row",
  },
  input: {
    backgroundColor: "#F3F4F6",
    flex: 1,
    color: "black",
    fontSize: 24,
    paddingLeft: 8,
    paddingRight: 8,
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 4,
    marginRight: 8,
  },
  button: {
    height: "100%",
  },
});
