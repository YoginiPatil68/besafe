import React, { ReactElement, ReactNode } from "react";
import { Background } from "@components";
import { StyleSheet, ActivityIndicator, View } from "react-native";
import { LightText, RegularText } from "../text/Typography";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { colors } from "@utils";

interface Props {
    size?: number | "small" | "large";
}

export const PostLoader = ({ size }: Props) => {
    return (
        <>
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    marginVertical: 3
                }}
            >
                <ActivityIndicator
                    size={size ? size : "large"}
                    color="#FFF"
                    style={{ marginEnd: 10 }}
                />
                <LightText string="loading..." />
            </View>
        </>
    );
};
export const LocationLoader = ({ size }: Props) => {
    return (
        <>
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    marginVertical: 3
                }}
            >
                <ActivityIndicator
                    size={size ? size : "small"}
                    color="#FFF"
                    style={{ marginEnd: 10 }}
                />
                <LightText string="loading..." />
            </View>
        </>
    );
};

export const Normalloader = () => {
    return (
        <>
            <View
                style={{
                    height: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#281B89"
                }}
            >
                <ActivityIndicator size={90} color={colors.primary} style={{ marginEnd: 10 }} />
            </View>
        </>
    );
};

export const ComplaintLoader = () => {
    return (
        <>
            <ActivityIndicator
                size={90}
                color={colors.primary}
                style={{
                    marginEnd: 10,
                    height: "100%",
                    alignItems: "center",
                    justifyContent: "center"
                }}
            />
        </>
    );
};
