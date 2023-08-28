import { StyleSheet } from "react-native";
import { colors } from "@utils";

const styles = StyleSheet.create({
    screenview: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    landingtext: {
        color: colors.white,
        textAlign: "center"
    },
    besafe: {
        textAlign: "center",
        color: colors.tertiary,
        marginBottom: 30
    },
    button: {
        backgroundColor: colors.tertiary,
        color: colors.white,
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 10
    },
    img: {
        height: 200,
        width: "100%",
        resizeMode: "contain"
    }
});

export default styles;
