import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as React from "react";

import Colors from "../../constants/Colors";
import useColorScheme from "../../hooks/useColorScheme";
import { BottomTabParamList } from "../../types";
import TabBarIcon from "../../components/TabBarIcon";

import EditorTabNavigator from "./EditorTabNavigator";
import TerminalTabNavigator from "./TerminalTabNavigator";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="EditorTab"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}
    >
      <BottomTab.Screen
        name="EditorTab"
        component={EditorTabNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-code" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="TerminalTab"
        component={TerminalTabNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-code" color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}
