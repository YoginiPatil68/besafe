import React from "react";
import { Image, ScrollView, View } from "react-native";
import styles from "./home.styles";
import { Background, Button, Text } from "@components";
import { NavigationProps } from "@types";
import { colors } from "@utils";
import { useTranslation } from "react-i18next";

export function Getstarted({ navigation }: NavigationProps<"Getstarted">) {
    const { t } = useTranslation();

    return (
        <Background>
            <View style={styles.screenview}>
                <Image style={styles.img} source={require("@assets/getstarted.png")} />
                <Text weight="900" style={styles.landingtext}>
                    Welcome to
                </Text>
                <Text weight="900" style={styles.besafe}>
                    BeSafe!
                </Text>
                <Button
                    weight="700"
                    btnName={t("start")}
                    onPress={() => navigation.navigate("Language")}
                    style={{ backgroundColor: colors.tertiary, width: "80%" }}
                />
            </View>
        </Background>
    );
}
