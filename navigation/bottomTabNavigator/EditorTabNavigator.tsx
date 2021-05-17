import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import TabOneScreen from "@screens/TabOneScreen";
import { EditorTabParamList } from "@types";

const EdtiorTabStack = createStackNavigator<EditorTabParamList>();

export default function EditorTabNavigator() {
  return (
    <EdtiorTabStack.Navigator>
      <EdtiorTabStack.Screen
        name="EditorScreen"
        component={TabOneScreen}
        options={{ headerTitle: "Editor" }}
      />
    </EdtiorTabStack.Navigator>
  );
}
