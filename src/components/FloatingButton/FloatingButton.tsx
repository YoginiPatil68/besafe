import { StyleSheet, Text, View, ViewProps } from "react-native";
import React from "react";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { updatePoliceStatus } from "@contexts/api/client";
import { getCredentials } from "@contexts/store/credentials";

type Props = {} & ViewProps;

export default function FloatingButton({ style }: Props) {
    const [toggle, setToggle] = React.useState(false);

    async function handleUpdateStatus(status: boolean) {
        const creds = await getCredentials();
        if (creds) {
            const updateStatus = await fetch(updatePoliceStatus, {
                method: "PUT",
                body: JSON.stringify({
                    status
                }),
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    authorization: `Bearer ${creds.access_token}`
                }
            });
            const res = await updateStatus.json();
            if (res.success) {
                setToggle(!toggle);
            }
        }
    }

    return (
        <View style={[styles.box, style]}>
            {toggle && (
                <View style={{}}>
                    <View style={styles.btn1}>
                        <Text
                            style={{ color: "#FFF", fontSize: 12 }}
                            onPress={() => handleUpdateStatus(true)}
                        >
                            Active
                        </Text>
                    </View>
                    <View style={styles.btn2}>
                        <Text
                            style={{ color: "#FFF", fontSize: 12 }}
                            onPress={() => handleUpdateStatus(false)}
                        >
                            Inactive
                        </Text>
                    </View>
                </View>
            )}
            <TouchableWithoutFeedback onPress={() => setToggle(!toggle)}>
                <View style={styles.mainbtn}>
                    <Text style={{ color: "#000", fontSize: 15 }}>status</Text>
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
}

const styles = StyleSheet.create({
    box: {
        justifyContent: "center",
        alignItems: "center",
        position: "absolute"
    },
    mainbtn: {
        backgroundColor: "#FFF",
        height: 50,
        width: 50,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 25
    },
    btn1: {
        backgroundColor: "#1C32F3",
        height: 45,
        width: 45,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 45 / 2,
        marginBottom: 5
    },
    btn2: {
        backgroundColor: "#1C32F3",
        height: 45,
        width: 45,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 45 / 2,
        marginBottom: 5
    }
});
