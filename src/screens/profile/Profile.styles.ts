import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    profile: {
        height: "25%"
    },
    view: {
        display: "flex",
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20
    },
    img: {
        height: 150,
        width: 150,
        borderRadius: 95,
        borderColor: "#1D0ECC",
        borderWidth: 5
    },
    edit: {
        height: 30,
        width: 30,
        backgroundColor: "#FFF",
        borderRadius: 50,
        position: "absolute",
        right: 0,
        bottom: 0,
        alignItems: "center",
        justifyContent: "center"
    },
    name: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: "#1D0ECC",
        borderRadius: 10,
        paddingVertical: 18,
        width: "100%"
    },

    // protext: {
    //     color: "#FFF",
    //     textAlign: "center",
    //     backgroundColor: "#1D0ECC",
    //     height: 50,
    //     width: 320,
    //     borderTopLeftRadius: 10,
    //     borderTopRightRadius: 10,

    //     paddingVertical: 9
    // },
    btn: {
        textAlign: "center",
        width: "100%"
    },
    probtn: {
        width: "100%",
        height: "40%",
        backgroundColor: "#1D0ECC",
        marginTop: 30,
        borderRadius: 10,
        justifyContent: "space-evenly",
        alignItems: "center"
    }
});

export default styles;
