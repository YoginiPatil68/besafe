import { View, TouchableWithoutFeedback, Image, FlatList } from "react-native";
import React from "react";
import { NavigationProps } from "@types";
import { Background, FloatingButton, LightText, MediumText, Text } from "@components";
import { useTranslation } from "react-i18next";
import { RootStateOrAny, useSelector } from "react-redux";

type Props = {};

const ViewAllComplaints = ({ navigation, route }: NavigationProps<"ViewAllComplaints">) => {
    const { userDetails, id, name, role, avatar, email } = useSelector(
        (state: RootStateOrAny) => state.auth
    );
    const { t, i18n } = useTranslation();
    const complaints = [
        { id: 0, name: `${t("reportCom")}`, uri: require("@assets/report.png"), navi: "ViewPost" },
        {
            id: 1,
            name: `${t("missPerson")}`,
            uri: require("@assets/missing.png"),
            navi: "ViewMissingPerson"
        },
        {
            id: 2,
            name: `${t("unidPerson")}`,
            uri: require("@assets/unid.png"),
            navi: "ViewUnidentifiedPerson"
        },
        {
            id: 3,
            name: `${t("mslf")}`,
            uri: require("@assets/stolen.png"),
            navi: "ViewMSLF"
        },

        {
            id: 4,
            name: `${t("wanted")}`,
            uri: require("@assets/Wanted.png"),
            navi: "ViewWanted"
        },

        {
            id: 5,
            name: `${t("mobApp")}`,
            uri: require("@assets/cyber.png"),
            navi: "ViewMobApp"
        },
        {
            id: 6,
            name: `${t("bank")}`,
            uri: require("@assets/bank.png"),
            navi: "ViewBank"
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
                            {t("complaintView")}
                        </Text>
                    }
                />
            </View>
            {role === 5000 && <FloatingButton style={{ bottom: 10, right: 15 }} />}
        </Background>
    );
};

export default ViewAllComplaints;
