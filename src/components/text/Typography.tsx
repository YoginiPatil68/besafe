import { colors } from "@utils";
import React, { StyleHTMLAttributes } from "react";
import { FlexAlignType, StyleProp, TextStyle } from "react-native";
import Text from "./Text";

interface Props {
    string?: string;
    color?: "#FFF" | "#1D0ECC" | "#000";
    vmargin?: number;
    bgcolor?: string;
    align?: "auto" | FlexAlignType | undefined;
    size?: number;
    textalign?: "auto" | "left" | "right" | "center" | "justify";
    width?: number | string;
}

export const RegularText = ({
    string,
    color,
    align = "center",
    vmargin = 0,
    size,
    textalign
}: Props) => {
    return (
        <Text
            weight="400"
            color={color ? color : "#FFF"}
            style={{
                marginVertical: vmargin,
                alignSelf: align,
                fontSize: size,
                textAlign: textalign
            }}
        >
            {string}
        </Text>
    );
};

export const MediumText = ({
    string,
    color,
    align = "center",
    vmargin = 0,
    size,
    width
}: Props) => {
    return (
        <Text
            weight="700"
            color="#FFF"
            style={{
                alignSelf: align,
                marginVertical: vmargin,
                fontSize: size ? size : 24,
                width: width
            }}
        >
            {string}
        </Text>
    );
};
export const LargeText = ({ string, color }: Props) => {
    return (
        <Text weight="900" color="#FFF">
            {string}
        </Text>
    );
};
export const LightText = ({ string, color, bgcolor, textalign }: Props) => {
    return (
        <Text weight="200" color="#FFF" style={{ textAlign: textalign ? textalign : "justify" }}>
            {string}
        </Text>
    );
};
export const StatusDetail = ({ string, color }: Props) => {
    return (
        <Text
            weight="700"
            color="#1D0ECC"
            style={{
                backgroundColor: "#fff",
                borderRadius: 10,
                paddingHorizontal: 15,
                paddingVertical: 8,
                fontSize: 17
            }}
        >
            {string}
        </Text>
    );
};
export const DateAndTime = ({ string, color }: Props) => {
    return (
        <Text
            weight="400"
            color="#FFF"
            style={{
                fontSize: 12
            }}
        >
            {string}
        </Text>
    );
};
export const Heading = ({ string, color, vmargin }: Props) => {
    return (
        <Text
            weight="700"
            style={{
                color: "#FFF",
                marginTop: 5,
                marginBottom: 10,
                fontSize: 18
            }}
        >
            {string}
        </Text>
    );
};
