import React, { useState } from "react";
import { Background, CustomInput, Text, Button, RegularText, MediumText } from "@components";
import { View, Image, ScrollView } from "react-native";
import { colors } from "@utils";
import { NavigationProps } from "@types";
import { TabRouter } from "@react-navigation/native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useTranslation } from "react-i18next";
export function ViewProfile({ navigation, route }: NavigationProps<"ViewProfile">) {
    const { t } = useTranslation();
    const [paper, setPaper] = useState(false);
    return (
        <Background>
            <View
                style={{
                    padding: 20
                }}
            >
                <View
                    style={{
                        backgroundColor: "#1D0ECC",
                        width: "100%",
                        height: "100%",
                        alignItems: "flex-start",
                        borderRadius: 25,
                        padding: 20
                    }}
                >
                    {route.params.role === 3000 ? (
                        <View style={{ height: "100%", width: "100%" }}>
                            <Image
                                style={{
                                    height: 150,
                                    width: 150,
                                    borderRadius: 95,
                                    borderColor: "#FFF",
                                    borderWidth: 3,
                                    alignSelf: "center"
                                }}
                                source={
                                    route.params.avatar
                                        ? { uri: route.params.avatar }
                                        : require("@assets/img.png")
                                }
                            />
                            <MediumText vmargin={10} color="#FFF" string={t("citizen")} />
                            <RegularText
                                size={18}
                                align="flex-start"
                                vmargin={10}
                                color="#FFF"
                                string={`${t("name")}: ${route.params.name}`}
                            />
                            <RegularText
                                size={18}
                                align="flex-start"
                                vmargin={10}
                                color="#FFF"
                                string={`${t("email")}: ${route.params.email}`}
                            />
                            <RegularText
                                size={18}
                                align="flex-start"
                                vmargin={10}
                                color="#FFF"
                                string={`${t("dob")}: ${
                                    route.params.userDetails && route.params.userDetails.dob
                                }`}
                            />
                            <RegularText
                                size={18}
                                align="flex-start"
                                vmargin={10}
                                color="#FFF"
                                string={`${t("add")}: ${
                                    route.params.userDetails && route.params.userDetails.address
                                }`}
                            />
                            <RegularText
                                size={18}
                                align="flex-start"
                                vmargin={10}
                                color="#FFF"
                                string={`${t("occupation")}: ${
                                    route.params.userDetails && route.params.userDetails.occupation
                                }`}
                            />
                        </View>
                    ) : (
                        <ScrollView>
                            <View style={{ height: "90%" }}>
                                <Image
                                    style={{
                                        height: 150,
                                        width: 150,
                                        borderRadius: 95,
                                        borderColor: "#FFF",
                                        borderWidth: 3,
                                        alignSelf: "center"
                                    }}
                                    source={
                                        route.params.avatar
                                            ? { uri: route.params.avatar }
                                            : require("@assets/police.png")
                                    }
                                />
                                <MediumText vmargin={10} color="#FFF" string={t("police")} />
                                <RegularText
                                    size={18}
                                    align="flex-start"
                                    vmargin={10}
                                    color="#FFF"
                                    string={`${t("name")}: ${route.params.name}`}
                                />
                                <RegularText
                                    size={18}
                                    align="flex-start"
                                    vmargin={10}
                                    color="#FFF"
                                    string={`${t("email")}: ${route.params.email}`}
                                />
                                <RegularText
                                    size={18}
                                    align="flex-start"
                                    vmargin={10}
                                    color="#FFF"
                                    string={`${t("dob")}: ${route.params.userDetails.dob}`}
                                />
                                <RegularText
                                    size={18}
                                    align="flex-start"
                                    vmargin={10}
                                    color="#FFF"
                                    string={`${t("police")} ${t("id")}: ${
                                        route.params.userDetails.policeID
                                    }`}
                                />
                                <RegularText
                                    size={18}
                                    align="flex-start"
                                    vmargin={10}
                                    color="#FFF"
                                    string={`${t("postArea")}: ${
                                        route.params.userDetails.postingArea
                                    }`}
                                />
                                <RegularText
                                    size={18}
                                    align="flex-start"
                                    vmargin={10}
                                    color="#FFF"
                                    string={`${t("police")} ${t("post")}: ${
                                        route.params.userDetails.policePost
                                    }`}
                                />
                                <RegularText
                                    size={18}
                                    align="flex-start"
                                    vmargin={10}
                                    color="#FFF"
                                    string={`${t("adhar")}: ${route.params.userDetails.adhaarCard}`}
                                />
                                <RegularText
                                    size={18}
                                    align="flex-start"
                                    vmargin={10}
                                    color="#FFF"
                                    string={`${t("pan")}: ${route.params.userDetails.panCard}`}
                                />

                                <RegularText
                                    size={18}
                                    align="flex-start"
                                    vmargin={10}
                                    color="#FFF"
                                    string={`${t("add")}: ${route.params.userDetails.address}`}
                                />
                                <RegularText
                                    size={18}
                                    align="flex-start"
                                    vmargin={10}
                                    color="#FFF"
                                    string={`${t("postArea")} ${t("add")}: ${
                                        route.params.userDetails.postingAreaAddress
                                    }`}
                                />
                                {paper && (
                                    <Image
                                        style={{ height: 300, width: 300, alignSelf: "center" }}
                                        resizeMode="contain"
                                        source={{
                                            uri: route.params.userDetails.verificationPaper
                                        }}
                                    />
                                )}
                                <TouchableWithoutFeedback>
                                    <Button
                                        btnName={t("verPaper")}
                                        style={{
                                            backgroundColor: "#130e5c",
                                            paddingHorizontal: 15
                                        }}
                                        onPress={() => setPaper(!paper)}
                                    />
                                </TouchableWithoutFeedback>
                            </View>
                        </ScrollView>
                    )}
                </View>
            </View>
        </Background>
    );
}
