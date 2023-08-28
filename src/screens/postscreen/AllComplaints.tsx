import { View, Image, FlatList } from "react-native";
import React from "react";
import { Background, LightText, MediumText, Text } from "@components";
import { ScrollView, TouchableWithoutFeedback } from "react-native-gesture-handler";
import { Post } from "./Post";
import { NavigationProps } from "@types";
import { useTranslation } from "react-i18next";

interface profileBtnProps {
    navigate: "Post";
    items: any;
}

export function AllComplaints({ navigation }: NavigationProps<"AllComplaints">) {
    const { t } = useTranslation();
    const complaints = [
        { id: 0, name: `${t("reportCom")}`, uri: require("@assets/report.png"), navi: "Post" },
        {
            id: 1,
            name: `${t("missPerson")}`,
            uri: require("@assets/missing.png"),
            navi: "MissingPerson"
        },
        {
            id: 2,
            name: `${t("unidPerson")}`,
            uri: require("@assets/unid.png"),
            navi: "UnidPerson"
        },
        {
            id: 3,
            name: `${t("mslf")}`,
            uri: require("@assets/stolen.png"),
            navi: "MSLF"
        },
        {
            id: 4,
            name: `${t("wanted")}`,
            uri: require("@assets/Wanted.png"),
            navi: "Wanted"
        },
        {
            id: 5,
            name: `${t("mobApp")}`,
            uri: require("@assets/cyber.png"),
            navi: "MobileApp"
        },
        {
            id: 6,
            name: `${t("bank")}`,
            uri: require("@assets/bank.png"),
            navi: "Bank"
        },
        {
            id: 7,
            name: `${t("Get Near by Police Station ")}`,
            uri: require("@assets/bank.png"),
            navi: "NearbyPolice"
        }
    ];

    const Btn = ({ item }: any) => {
        return (
            <TouchableWithoutFeedback onPress={() => navigation.navigate(item.navi)}>
                <View
                    style={{
                        backgroundColor: "#281A89",
                        borderRadius: 10,
                        flexDirection: "row",
                        justifyContent: "space-evenly",
                        padding: 5,
                        height: 140,
                        margin: 10
                    }}
                >
                    <Image
                        source={item.uri}
                        resizeMode="contain"
                        style={{
                            height: 100,
                            width: "40%",
                            alignSelf: "center"
                        }}
                    />
                    <MediumText size={18} width={"60%"} string={item.name} />
                </View>
            </TouchableWithoutFeedback>
        );
    };
    return (
        <Background>
            <View
                style={{
                    paddingHorizontal: 10,
                    width: "100%",
                    height: "100%",
                    justifyContent: "space-evenly",
                    alignItems: "center"
                }}
            >
                <FlatList
                    data={complaints}
                    renderItem={Btn}
                    keyExtractor={(item, index) => item.name}
                    bounces={true}
                    stickyHeaderIndices={[0]}
                    ListHeaderComponentStyle={{
                        width: "100%",
                        backgroundColor: "#130e5c",
                        paddingBottom: 5
                    }}
                    ListHeaderComponent={
                        <Text color="#FFF" style={{ textAlign: "center" }}>
                            {t("postView")}
                        </Text>
                    }
                />
            </View>
        </Background>
    );
}
