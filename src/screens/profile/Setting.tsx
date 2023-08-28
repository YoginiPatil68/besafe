import React, { useState } from "react";
import { Background, CustomInput, Text } from "@components";
import { Modal, Pressable, ScrollView, View } from "react-native";
import { Button } from "@components";
import { NavigationProps } from "@types";
import { colors } from "@utils";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import emailjs from "@emailjs/browser";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { resetPass } from "@contexts/api/client";
import { getCredentials, isTokenExpired } from "@contexts/store/credentials";
import { signUp } from "@contexts/slice/authSlice";
import { useTranslation } from "react-i18next";

export function Setting({ navigation }: NavigationProps<"Setting">) {
    const dispatch = useDispatch();
    const user = useSelector((state: RootStateOrAny) => state.auth);
    const [changePassword, setChangePassword] = useState({
        activity: false,
        currentPass: "",
        newPass: "",
        confPass: "",
        error: ""
    });

    const [language, setLanguage] = useState(false);
    const [account, setAccount] = useState(false);

    const SendMail = async () => {
        try {
            const emailres = await emailjs.send(
                "gmail",
                "contactTemplate",
                { email: JSON.stringify(user.email) },
                "user_brys7kId9nfyXkoJzjuw5"
            );
            if (emailres.status === 200) {
                console.log(emailres);
            }
        } catch (err) {
            console.log(err);
        }
    };
    const { t, i18n } = useTranslation();
    function handleLang(lang: string) {
        i18n.changeLanguage(lang);
        setLanguage(false);
    }
    async function handleChangePass() {
        const creds = await getCredentials();
        if (creds) {
            const res = await fetch(resetPass, {
                method: "POST",
                body: JSON.stringify({
                    password: changePassword.currentPass,
                    newPass: changePassword.newPass,
                    confirmPass: changePassword.confPass
                })
            });
            const changed = await res.json();
            if (changed.success) {
                dispatch(signUp(user));
                setChangePassword({
                    activity: false,
                    confPass: "",
                    currentPass: "",
                    newPass: "",
                    error: ""
                });
            } else {
                setChangePassword({
                    activity: false,
                    confPass: "",
                    currentPass: "",
                    newPass: "",
                    error: "Something went wrong try again later"
                });
            }
        }
    }
    return (
        <Background>
            <View
                style={{
                    height: "100%",
                    width: "100%",
                    alignItems: "center",
                    marginTop: 20,
                    padding: 20
                }}
            >
                <Button weight="400" btnName={t("setting")} />

                <View style={{ marginTop: 25, width: "100%", height: "100%" }}>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={changePassword.activity}
                        onRequestClose={() => {
                            setChangePassword({ ...changePassword, activity: false });
                        }}
                    >
                        <View
                            style={{
                                height: "100%",
                                width: "100%",
                                justifyContent: "center",
                                padding: 20
                            }}
                        >
                            <View
                                style={{
                                    width: "100%",
                                    justifyContent: "center",
                                    padding: 20,
                                    backgroundColor: colors.tertiary,
                                    alignItems: "center",
                                    borderRadius: 10,
                                    shadowColor: colors.black,
                                    shadowOffset: { width: 0, height: 2 },
                                    shadowOpacity: 0.25,
                                    shadowRadius: 4,
                                    elevation: 5
                                }}
                            >
                                <Text weight="700" style={{ fontSize: 20, color: colors.white }}>
                                    Password
                                </Text>
                                <View style={{ width: "100%" }}>
                                    {changePassword.error !== "" && (
                                        <Text>{changePassword.error}</Text>
                                    )}
                                    <CustomInput
                                        placeholder={t("oldPass")}
                                        onChangeText={text =>
                                            setChangePassword({
                                                ...changePassword,
                                                currentPass: text
                                            })
                                        }
                                    />
                                    <CustomInput
                                        placeholder={t("newPass")}
                                        onChangeText={text =>
                                            setChangePassword({ ...changePassword, newPass: text })
                                        }
                                    />
                                    <CustomInput
                                        placeholder={t("confirmPass")}
                                        onChangeText={text =>
                                            setChangePassword({ ...changePassword, confPass: text })
                                        }
                                    />
                                    <Pressable onPress={handleChangePass}>
                                        <Button
                                            bgColor="#130e5c"
                                            btnName={t("chanPass")}
                                            weight="400"
                                        />
                                    </Pressable>
                                </View>
                            </View>
                        </View>
                    </Modal>
                    <Pressable>
                        <Button
                            weight="400"
                            btnName={t("chanPass")}
                            onPress={handleChangePass}
                            bgColor="#FFF"
                            textColor="#130e5c"
                        />
                    </Pressable>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={language}
                        onRequestClose={() => {
                            setLanguage(!language);
                        }}
                    >
                        <View
                            style={{
                                height: "100%",
                                width: "100%",
                                justifyContent: "center",
                                padding: 20
                            }}
                        >
                            <View
                                style={{
                                    width: "100%",
                                    justifyContent: "center",
                                    padding: 20,
                                    backgroundColor: colors.tertiary,
                                    alignItems: "center",
                                    borderRadius: 10,
                                    shadowColor: colors.black,
                                    shadowOffset: { width: 0, height: 2 },
                                    shadowOpacity: 0.25,
                                    shadowRadius: 4,
                                    elevation: 5
                                }}
                            >
                                <Text weight="700" style={{ fontSize: 20, color: colors.white }}>
                                    {t("Lang")}
                                </Text>
                                <View style={{ width: "100%", marginTop: 10 }}>
                                    <Button
                                        weight="400"
                                        btnName="English"
                                        bgColor="#FFF"
                                        textColor="#130e5c"
                                        style={{ marginVertical: 8 }}
                                        onPress={() => handleLang("en")}
                                    />
                                    <Button
                                        weight="400"
                                        btnName="हिंदी"
                                        bgColor="#FFF"
                                        textColor="#130e5c"
                                        style={{ marginVertical: 8 }}
                                        onPress={() => handleLang("hi")}
                                    />
                                    <Button
                                        weight="400"
                                        btnName="मराठी"
                                        bgColor="#FFF"
                                        textColor="#130e5c"
                                        style={{ marginVertical: 8 }}
                                        onPress={() => handleLang("mi")}
                                    />
                                    {/* <Pressable>
                                        <Button
                                            btnName="Change language"
                                            weight="400"
                                            onPress={() => setLanguage(!language)}
                                            bgColor="#130e5c"
                                        />
                                    </Pressable> */}
                                </View>
                            </View>
                        </View>
                    </Modal>
                    <Pressable onPress={() => setLanguage(!language)}>
                        <Button
                            weight="400"
                            btnName={t("chanLang")}
                            bgColor="#FFF"
                            textColor="#130e5c"
                        />
                    </Pressable>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={account}
                        onRequestClose={() => {
                            setAccount(!account);
                        }}
                    >
                        <View
                            style={{
                                height: "100%",
                                width: "100%",
                                justifyContent: "center",
                                padding: 20
                            }}
                        >
                            <View
                                style={{
                                    width: "100%",
                                    justifyContent: "center",
                                    padding: 20,
                                    backgroundColor: colors.tertiary,
                                    alignItems: "center",
                                    borderRadius: 10,
                                    shadowColor: colors.black,
                                    shadowOffset: { width: 0, height: 2 },
                                    shadowOpacity: 0.25,
                                    shadowRadius: 4,
                                    elevation: 5
                                }}
                            >
                                <Text
                                    weight="700"
                                    style={{
                                        color: colors.white,
                                        fontSize: 20
                                    }}
                                >
                                    {t("deleteAc")}
                                </Text>
                                <CustomInput placeholder={`${t("reason")} ${"?"}`} />
                                <View style={{ width: "100%" }}>
                                    <Pressable
                                        onPress={async () => {
                                            const res = await SendMail();
                                            setAccount(!account);
                                            await AsyncStorage.removeItem("keys");
                                        }}
                                    >
                                        <Button
                                            weight="400"
                                            btnName={t("confirm")}
                                            bgColor="#FFF"
                                            textColor="#130e5c"
                                        />
                                    </Pressable>
                                </View>
                            </View>
                        </View>
                    </Modal>
                    <Pressable>
                        <Button
                            weight="400"
                            btnName={t("deleteAc")}
                            onPress={() => setAccount(true)}
                            bgColor="#FFF"
                            textColor="#130e5c"
                        />
                    </Pressable>
                </View>
            </View>
        </Background>
    );
}
