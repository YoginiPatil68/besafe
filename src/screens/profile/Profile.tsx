import React from "react";
import { Background, Text, RegularText, Button } from "@components";
import { Image, ScrollView, View } from "react-native";
import { NavigationProps } from "@types";
import styles from "./Profile.styles";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getTokens } from "@contexts/slice/authSlice";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { ViewProfile } from "./ViewProfile";
import { useTranslation } from "react-i18next";

interface profileBtnProps {
    navigate:
        | "EditProfile"
        | "Setting"
        | "Help"
        | "Register"
        | "ViewProfile"
        | "Exam"
        | "HistoryAllComplaints";
    name: string;
}

export function Profile({ navigation, route }: NavigationProps<"UserProfile">) {
    const { t } = useTranslation();
    const { userDetails, id, name, role, avatar, email } = useSelector(
        (state: RootStateOrAny) => state.auth
    );
    const dispatch = useDispatch();
    const userData = {
        id,
        name,
        role,
        avatar,
        email,
        userDetails: userDetails && userDetails
    };
    const ProfileText = ({ navigate, name }: profileBtnProps) => {
        return (
            <Text
                style={styles.btn}
                weight="400"
                color="#FFF"
                onPress={() => {
                    navigation.navigate(navigate);
                }}
            >
                {name}
            </Text>
        );
    };

    return (
        <Background>
            <View style={styles.view}>
                <View style={styles.profile}>
                    <View style={{ position: "relative" }}>
                        {role === 3000 ? (
                            <Image
                                style={styles.img}
                                source={avatar ? { uri: avatar } : require("@assets/img.png")}
                            />
                        ) : (
                            <Image
                                style={styles.img}
                                source={avatar ? { uri: avatar } : require("@assets/police.png")}
                            />
                        )}
                    </View>
                </View>
                <View style={styles.name}>
                    <RegularText string={name} size={17} />
                    <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                        <TouchableWithoutFeedback
                            onPress={() => {
                                navigation.navigate("ViewProfile", userData);
                            }}
                        >
                            <RegularText string={t("view")} size={17} />
                        </TouchableWithoutFeedback>
                    </View>
                </View>
                <View style={styles.probtn}>
                    {role === 3000 && (
                        <ProfileText name={t("editProfile")} navigate="EditProfile" />
                    )}
                    {/* history */}
                    <ProfileText name={t("history")} navigate="HistoryAllComplaints" />
                    <ProfileText name={t("setting")} navigate="Setting" />
                    <ProfileText name={t("help")} navigate="Help" />
                    <Text
                        style={styles.btn}
                        weight="400"
                        color="#FFF"
                        onPress={async () => {
                            await AsyncStorage.removeItem("keys");
                            dispatch(getTokens({ access_token: "" }));
                        }}
                    >
                        {t("logout")}
                    </Text>
                </View>
            </View>
        </Background>
    );
}
