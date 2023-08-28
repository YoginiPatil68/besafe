import React from "react";
import { StyleSheet, View } from "react-native";
import CheckBox from "@react-native-community/checkbox";
import Text from "../text/Text";

type textCheckBoxProps = {
    toggleCheckBox: boolean;
    setToggleCheckBox: React.Dispatch<React.SetStateAction<boolean>>;
    agree: string;
};

export default function TextCheckBox({
    toggleCheckBox,
    setToggleCheckBox,
    agree
}: textCheckBoxProps) {
    return (
        <View style={styles.checkboxcontainer}>
            <CheckBox
                disabled={false}
                value={toggleCheckBox}
                onValueChange={newValue => setToggleCheckBox(newValue)}
            />
            <Text style={{ color: "#FFFFFF", marginLeft: 5 }} weight="200">
                {agree}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    checkboxcontainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        width: 330,
        marginTop: 10
    }
});
