import React from "react";
import { ImageSourcePropType, Modal, Pressable, View } from "react-native";
import { Background, Text, CharRole, Button } from "@components";
import styles from "./register.styles";
import { NavigationProps } from "@types";
import { useTranslation } from "react-i18next";

interface rolesProps {
    police: { uri: ImageSourcePropType; role: number; agree: string };
    stationAdmin: { uri: ImageSourcePropType; role: number; agree: string };
    citizen: { uri: ImageSourcePropType; role: number };
}

export default function Register({ navigation }: NavigationProps<"Register">) {
    const { t } = useTranslation();
    const [police, setPolice] = React.useState(false);
    const roles: rolesProps = {
        police: {
            uri: require("@assets/police.png"),
            role: 5000,
            agree: "Agree to go through police verification process"
        },
        stationAdmin: {
            uri: require("@assets/admin.png"),
            role: 4000,
            agree: "Agree to go through police verification process"
        },
        citizen: {
            uri: require("@assets/citizen.png"),
            role: 3000
        }
    };
    return (
        <Background>
            <View style={styles.view}>
                <Text weight="700" style={{ color: "#FFF" }}>
                    {t("selRole")}
                </Text>
                <Modal
                    transparent={true}
                    animationType="slide"
                    visible={police}
                    onRequestClose={() => {
                        setPolice(!police);
                    }}
                >
                    <View
                        style={{
                            // paddingTop: 100,
                            backgroundColor: "#281B89",
                            height: "100%",
                            justifyContent: "center"
                        }}
                    >
                        <CharRole
                            role={t("police")}
                            uri={require("@assets/police.png")}
                            onPress={() => {
                                navigation.navigate("SignIn", roles.police);
                                setPolice(!police);
                            }}
                        />
                        <CharRole
                            role={t("station")}
                            uri={require("@assets/admin.png")}
                            onPress={() => {
                                navigation.navigate("SignIn", roles.stationAdmin);
                                setPolice(!police);
                            }}
                        />
                        <Pressable onPress={() => setPolice(!police)}>
                            <Button
                                weight="700"
                                size={18}
                                btnName={t("back")}
                                style={{
                                    width: "80%",
                                    justifyContent: "center",
                                    alignSelf: "center"
                                }}
                            />
                        </Pressable>
                    </View>
                </Modal>
                <Pressable>
                    <CharRole
                        role={t("police")}
                        uri={require("@assets/police.png")}
                        onPress={() => setPolice(true)}
                    />
                </Pressable>
                <CharRole
                    role={t("citizen")}
                    uri={require("@assets/citizen.png")}
                    onPress={() => {
                        navigation.navigate("SignIn", roles.citizen);
                    }}
                />
            </View>
        </Background>
    );
}
