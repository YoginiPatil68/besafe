import React from "react";
import { View, Image, ScrollView, FlatList } from "react-native";
import styles from "./language.styles";
import { Background, Button, Text } from "@components";
import { NavigationProps } from "@types";
import { colors } from "@utils";
import { useTranslation } from "react-i18next";

export function Language({ navigation }: NavigationProps<"Language">) {
    const { t, i18n } = useTranslation();
    const languages = [
        {
            id: 0,
            language: "English",
            code: "en"
        },
        {
            id: 1,
            language: "हिंदी",
            code: "hi"
        },
        {
            id: 2,
            language: "मराठी",
            code: "mi"
        }
    ];

    return (
        <Background>
            <View style={styles.screenview}>
                <View style={styles.container1}>
                    <Image style={styles.img} source={require("@assets/lang.png")} />
                    <Text style={{ color: colors.white }}>{t("lang")}</Text>
                </View>
                <View style={styles.container2}>
                    <FlatList
                        style={styles.list}
                        data={languages}
                        keyExtractor={lang => lang.id.toString()}
                        renderItem={({ item }) => (
                            <Button
                                btnName={item.language}
                                style={{ backgroundColor: colors.white, color: colors.quatnary }}
                                onPress={() => {
                                    i18n.changeLanguage(item.code);
                                    navigation.navigate("Register");
                                }}
                            />
                        )}
                        ItemSeparatorComponent={() => (
                            <View style={{ width: "100%", paddingVertical: 15 }} />
                        )}
                    />
                </View>
            </View>
        </Background>
    );
}

{
    /* <ScrollView contentContainerStyle={styles.scroll}>
                        <Text style={styles.button} onPress={() => navigation.navigate("Register")}>
                            English
                        </Text>
                        <Text style={styles.button} onPress={() => navigation.navigate("Register")}>
                            हिंदी
                        </Text>
                        <Text style={styles.button} onPress={() => navigation.navigate("Register")}>
                            मराठी
                        </Text>
                        <Text style={styles.button} onPress={() => navigation.navigate("Register")}>
                            English
                        </Text>
                        <Text style={styles.button} onPress={() => navigation.navigate("Register")}>
                            हिंदी
                        </Text>
                        <Text style={styles.button} onPress={() => navigation.navigate("Register")}>
                            मराठी
                        </Text>
                    </ScrollView> */
}
