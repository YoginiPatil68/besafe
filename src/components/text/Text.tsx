import React, { ReactNode, ReactElement } from "react";
import { Text as DefaultText, TextProps as NativeTextProps } from "react-native";

type TextProps = {
    weight: "900" | "700" | "400" | "200";
    color?: "#FFF" | "#1D0ECC" | "#000" | "#FF4500";
    children: ReactNode;
} & NativeTextProps;

const defaultProps = {
    weight: "700"
};
export default function Text({
    children,
    style,
    weight,
    color,
    ...props
}: TextProps): ReactElement {
    let fontSize;
    let fontFamily;
    if (weight === "900") {
        fontFamily = "Chillax-Bold";
        fontSize = 30;
    } else if (weight === "700") {
        fontFamily = "Chillax-Medium";
        fontSize = 24;
    } else if (weight === "400") {
        fontFamily = "Chillax-Regular";
        fontSize = 18;
    } else if (weight === "200") {
        fontFamily = "Chillax-Light";
        fontSize = 15;
    }

    return (
        <DefaultText {...props} style={[{ fontSize, fontFamily, color }, style]}>
            {children}
        </DefaultText>
    );
}

Text.defaultProps = defaultProps;
