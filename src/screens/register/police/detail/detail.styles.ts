import { colors } from "@utils";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    view: {
        width: "100%",
        height: "100%",
        justifyContent: "flex-end"
    },
    box1: {
        width: "100%",
        textAlign: "center",
        marginBottom: 40
    },
    box2: {
        padding: 20,
        backgroundColor: colors.tertiary,
        width: "100%",
        height: "80%",
        borderTopLeftRadius: 45,
        borderTopRightRadius: 45,
        paddingVertical: 35
    }
});

export default styles;
