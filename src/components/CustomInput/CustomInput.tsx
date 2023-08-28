import Text from "../text/Text";
import { colors } from "@utils";
import React from "react";
import { StyleSheet, TextInputProps, TextInput, View } from "react-native";
import { Icon } from "react-native-elements/dist/icons/Icon";

type CustomInputProps = {
    placeholder: string;
    error?: string | false | undefined;
    width?: number | string;
} & TextInputProps;

export default function CustomInput({ placeholder, style, error, ...props }: CustomInputProps) {
    return (
        <>
            {error && (
                <Text weight="700" style={{ color: "red", fontSize: 14 }}>
                    {error}
                </Text>
            )}

            <TextInput style={[styles.text, style]} placeholder={placeholder} {...props} />
        </>
    );
}

export function Password({ placeholder, style, width, error, ...props }: CustomInputProps) {
    const [hidePass, setHidePass] = React.useState(true);
    return (
        <>
            {error && (
                <Text weight="700" style={{ color: "red", fontSize: 14 }}>
                    {error}
                </Text>
            )}
            <View
                style={{
                    flexDirection: "row",
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "space-between"
                }}
            >
                <TextInput
                    secureTextEntry={hidePass ? true : false}
                    style={[styles.text, style, { width: width ? width : "89%" }]}
                    placeholder={placeholder}
                    {...props}
                />
                <Text
                    style={{
                        width: "10%",
                        fontSize: 10,
                        color: "#FFF"
                        // position: "absolute"
                    }}
                    onPress={() => setHidePass(!hidePass)}
                >
                    {hidePass ? "Show" : "Hide"}
                </Text>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    text: {
        backgroundColor: "#FFF",
        color: colors.quatnary,
        height: 45,
        width: "100%",
        fontFamily: "Chillax-Regular",
        fontSize: 15,
        borderRadius: 10,
        paddingLeft: 15,
        marginVertical: 8
    }
});
