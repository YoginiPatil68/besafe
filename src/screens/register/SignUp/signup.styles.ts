import { colors } from "@utils";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    view: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center"
    },
    box1: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        padding: 20
    },
    box2: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.tertiary,
        width: "100%",
        borderTopLeftRadius: 60,
        borderTopRightRadius: 60,
        paddingVertical: 20
    },
    img: {
        height: 180,
        width: "100%",
        resizeMode: "contain"
    }
});

export default styles;
