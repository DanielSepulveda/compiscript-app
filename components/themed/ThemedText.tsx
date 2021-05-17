import * as React from "react";
import { Text as DefaultText } from "react-native";
import { iOSUIKit } from "react-native-typography";
import useThemeColor from "../../hooks/useThemeColor";
import useColorScheme from "../../hooks/useColorScheme";

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

const textVariants = [
  "largeTitleEmphasized",
  "title3Emphasized",
  "title3",
  "bodyEmphasized",
  "body",
  "subheadEmphasized",
  "subhead",
  "subheadShort",
  "callout",
  "footnoteEmphasized",
  "footnote",
  "caption2Emphasized",
  "caption2",
] as const;
type TextVariants = typeof textVariants[number];

type CustomTextProps = {
  variant?: TextVariants;
};

export type TextProps = ThemeProps & DefaultText["props"] & CustomTextProps;

const defaultProps = {
  variant: "body",
};

export default function Text(props: TextProps) {
  const { style, lightColor, darkColor, variant, ...otherProps } = props;
  const theme = useColorScheme();

  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");
  const textVariant = `${variant}${theme === "dark" ? "White" : ""}`;
  const textStyle = iOSUIKit[textVariant as keyof typeof iOSUIKit];

  return <DefaultText style={[{ color }, textStyle, style]} {...otherProps} />;
}

Text.defaultProps = defaultProps;
