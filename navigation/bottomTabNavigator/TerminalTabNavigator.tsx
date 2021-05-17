import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import TabTwoScreen from "@screens/TabTwoScreen";
import { TerminalTabParamList } from "@types";

const TerminalTabStack = createStackNavigator<TerminalTabParamList>();

export default function TerminalTabNavigator() {
  return (
    <TerminalTabStack.Navigator>
      <TerminalTabStack.Screen
        name="TerminalScreen"
        component={TabTwoScreen}
        options={{ headerTitle: "Terminal" }}
      />
    </TerminalTabStack.Navigator>
  );
}
