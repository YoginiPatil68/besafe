import React, { ReactElement, ReactNode } from "react";
import { SafeAreaView, StyleSheet, StatusBar, Platform } from "react-native";

type background = {
    children: ReactNode;
    bgColor?: "#281B89";
};

export default function Background({ children, bgColor }: background): ReactElement {
    return (
        <SafeAreaView
            style={[{ backgroundColor: bgColor ? bgColor : "#130e5c" }, styles.screenview]}
        >
            <StatusBar barStyle="default" />
            {children}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screenview: {
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    }
});
