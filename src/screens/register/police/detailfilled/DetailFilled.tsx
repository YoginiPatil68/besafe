import React, { useEffect } from "react";
import { Background, Text } from "@components";
import { Image, View } from "react-native";
import { NavigationProps } from "@types";
import { t } from "i18next";
import { useTranslation } from "react-i18next";

export function DetailFilled({ navigation }: NavigationProps<"DetailFilled">) {
    const { t } = useTranslation();
    function validSubmission() {}
    setTimeout(validSubmission, 3000);
    return (
        <Background>
            <View
                style={{
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                    padding: 20
                }}
            >
                <Text weight="700" style={{ color: "#FFF", textAlign: "center" }}>
                    {t("verSuccess")}
                </Text>
                <Image style={{ marginVertical: 25 }} source={require("@assets/yayee.png")} />
                <Text weight="200" style={{ color: "#FFF", textAlign: "center" }}>
                    {t("verMail")}
                </Text>
            </View>
        </Background>
    );
}
