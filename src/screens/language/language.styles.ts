import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    screenview: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    container1: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        flex: 1.6,
        marginBottom: 20
    },
    container2: {
        flex: 1.4,
        width: "100%",
        paddingHorizontal: 20,
        paddingTop: 50,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#1D0ECC",
        borderTopRightRadius: 50,
        borderTopLeftRadius: 50
    },
    list: {
        width: "80%"
    },
    img: {
        height: 250,
        maxWidth: "80%",
        resizeMode: "contain"
    }
});

export default styles;
