import React, { useState } from "react";
import { Background, CustomInput, Text, Button } from "@components";
import { View } from "react-native";
import { colors } from "@utils";
import { NavigationProps } from "@types";
import { Form } from "formik";
import { useTranslation } from "react-i18next";
export function Help({ navigation }: NavigationProps<"Help">) {
    const { t } = useTranslation();
    return (
        <Background>
            <View
                style={{
                    height: "100%",
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: 20
                }}
            >
                <Button btnName={t("help")} weight="400" />
                <View style={{ width: "100%" }}>
                    <CustomInput placeholder={t("name")} />
                    <CustomInput placeholder={t("email")} />
                    <CustomInput placeholder={t("msg")} numberOfLines={4} />
                    <CustomInput placeholder={t("query")} />
                    <Button
                        btnName={t("submit")}
                        // onPress={() => {
                        //     navigation.navigate("Profile");
                        // }}
                        weight="400"
                    />
                </View>
            </View>
        </Background>
    );
}
