import React, { useEffect } from "react";
import { View, ScrollView, TouchableWithoutFeedback, Modal } from "react-native";
import { Background, StatusDetail, Text, DateAndTime, ComplaintLoader } from "@components";
import { NavigationProps } from "@types";
import { colors } from "@utils";
import { complaintsHistory } from "@contexts/api/client";
import { getCredentials, isTokenExpired } from "@contexts/store/credentials";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { historyComplaints } from "@contexts/slice/authSlice";
import {
    closeSocket,
    subscribeToChat,
    initiateSocketConnection
} from "../../service/socketio.service";
import { ComplaintsLayout } from "../homescreen/ComplaintsLayout";
import { useTranslation } from "react-i18next";

// interface complaintProps {
//     _id?: string;
//     complaintType?: string;
//     createdAt?: Date;
//     location?: {
//         name?: string;
//     };
//     proof?: string;
//     reason?: string;
//     status?: string;
//     updatedAt?: Date;
//     image?: string[];
// }

// type multiProps = complaintProps[];
type multiProps = any[];

export function HistoryReport({ navigation }: NavigationProps<"HistoryPosty">) {
    const { t } = useTranslation();
    const [loading, setLoading] = React.useState(false);
    const getAllComplaints: multiProps = useSelector((state: RootStateOrAny) => state.auth.history);
    const dispatch = useDispatch();
    async function getComplaints() {
        const data = await getCredentials();
        if (data) {
            if (!isTokenExpired(data.access_token)) {
                const res = await fetch(complaintsHistory, {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        authorization: `Bearer ${data.access_token}`
                    }
                });
                const complaint = await res.json();
                dispatch(historyComplaints(complaint));
                //active status to be send from backend to login police
            }
        }
    }

    useEffect(() => {
        const ac = new AbortController();
        initiateSocketConnection((data: any) => {
            if (data) {
                getComplaints();
                subscribeToChat((err: any, data: any) => {
                    if (data.success) {
                        getComplaints();
                    }
                });
                setLoading(true);
            }
        });
        return function cleanup() {
            ac.abort();
            closeSocket();
        };
    }, []);

    const [x, setX] = React.useState({ state: false, id: "" });
    return (
        <Background>
            <View
                style={{
                    width: "100%",
                    height: "100%",
                    paddingHorizontal: 20,
                    paddingBottom: 60
                }}
            >
                <Text style={{ color: "#FFF", marginBottom: 18, textAlign: "center" }}>
                    {t("reportCom")}
                </Text>
                {!loading && <ComplaintLoader />}
                <View>
                    <ScrollView>
                        {getAllComplaints &&
                            getAllComplaints.map((item, index) => {
                                return (
                                    <TouchableWithoutFeedback
                                        key={index}
                                        onPress={() => {
                                            setX({ state: true, id: item._id });
                                        }}
                                    >
                                        <View
                                            style={{
                                                marginVertical: 10,
                                                width: "100%",
                                                backgroundColor: "#281B89",
                                                borderRadius: 10,
                                                padding: 10,
                                                elevation: 3
                                            }}
                                        >
                                            <Modal
                                                transparent={true}
                                                animationType="slide"
                                                visible={x.state && item._id === x.id}
                                                onRequestClose={() => {
                                                    setX({ state: false, id: "" });
                                                }}
                                            >
                                                <ComplaintsLayout route={item} />
                                            </Modal>
                                            <View
                                                style={{
                                                    flexDirection: "row",
                                                    alignItems: "center"
                                                }}
                                            >
                                                <View
                                                    style={{
                                                        flexDirection: "row",
                                                        alignItems: "center"
                                                    }}
                                                >
                                                    <StatusDetail string={item.status} />
                                                    <View
                                                        style={{
                                                            flexDirection: "column",
                                                            alignItems: "flex-start",
                                                            marginLeft: 10
                                                        }}
                                                    >
                                                        <DateAndTime
                                                            string={new Date(
                                                                item.createdAt!
                                                            ).toLocaleDateString("en-IN")}
                                                        />
                                                        <DateAndTime
                                                            string={new Date(
                                                                item.createdAt!
                                                            ).toLocaleTimeString("en-IN")}
                                                        />
                                                    </View>
                                                    {/* <Image
                                                                    resizeMode="contain"
                                                                    style={{
                                                                        height: 22,
                                                                        width: 22,
                                                                        marginLeft: 4
                                                                    }}
                                                                    source={require("@assets/remainder.png")}
                                                                /> */}
                                                </View>
                                            </View>
                                            <Text
                                                weight="400"
                                                style={{
                                                    color: colors.white,
                                                    fontSize: 15,
                                                    marginTop: 5
                                                }}
                                            >
                                                {t("reason")}
                                            </Text>
                                            <Text
                                                numberOfLines={4}
                                                weight="400"
                                                style={{
                                                    color: colors.white,
                                                    fontSize: 12,
                                                    paddingTop: 5
                                                }}
                                            >
                                                {item.reason}
                                            </Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                );
                            })}
                    </ScrollView>
                </View>
            </View>
        </Background>
    );
}

// id={a?.id}
// status={a?.status}
// date={a?.date}
// time={a?.time}
// reason={a?.reason}
// text={a?.text}
