import Text from "../text/Text";
import React from "react";
import { StyleSheet } from "react-native";
import { TextProps } from "react-native-elements";

type btnProps = {
    weight?: "200" | "400" | "700" | "900" | undefined;
    btnName: string;
    bgColor?: string;
    textColor?: string;
    size?: number;
    check?: string;
} & TextProps;

export default function Button({
    weight = "200",
    btnName,
    bgColor,
    textColor,
    style,
    size,
    ...props
}: btnProps) {
    return (
        <Text
            weight={weight}
            style={[
                styles.button,
                {
                    backgroundColor: bgColor ? bgColor : "#1D0ECC",
                    color: textColor ? textColor : "#FFF"
                },
                style
            ]}
            {...props}
        >
            {btnName}
        </Text>
    );
}
export function CheckBox({
    weight = "200",
    btnName,
    bgColor,
    textColor,
    style,
    size,
    check,
    ...props
}: btnProps) {
    return (
        <Text
            weight={weight}
            style={[
                styles.checkBox,
                {
                    backgroundColor: check === btnName ? "#181161" : bgColor ? bgColor : "#1D0ECC",
                    color: textColor ? textColor : "#FFF"
                },
                style
            ]}
            {...props}
        >
            {btnName}
        </Text>
    );
}

const styles = StyleSheet.create({
    button: {
        paddingVertical: 10,
        textAlign: "center",
        width: "100%",
        borderRadius: 10,
        marginVertical: 8
    },
    checkBox: {
        margin: 3,
        padding: 8,
        borderRadius: 30,
        backgroundColor: "#1D0ECC",
        marginVertical: 8
    }
});

// backgroundColor: bgColor ? bgColor : "#0085FF",
