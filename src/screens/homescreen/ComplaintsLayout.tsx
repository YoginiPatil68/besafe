import React from "react";
import { View, Image, Modal, ScrollView, TouchableOpacity } from "react-native";
import {
    Text,
    DateAndTime,
    StatusDetail,
    Background,
    RegularText,
    MediumText,
    LightText,
    Button,
    Heading
} from "@components";
import { colors } from "@utils";
import ImageViewer from "react-native-image-zoom-viewer";
import { assignReport, getStationPolice, updateStatus } from "@contexts/api/client";
import { getCredentials, isTokenExpired } from "@contexts/store/credentials";
import { RootStateOrAny, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

function Police({ item, select }: any) {
    return (
        <View
            style={{
                width: "100%",
                flexDirection: "row",
                borderWidth: 1,
                borderColor: "#FFFFFF",
                paddingHorizontal: 20,
                paddingVertical: 8,
                borderRadius: 10,
                alignItems: "center",
                backgroundColor: item._id === select ? "#27224dc7" : "#281B89"
            }}
        >
            <Image
                style={{
                    width: 45,
                    height: 40,
                    marginRight: 10,
                    borderRadius: 100
                }}
                resizeMode="contain"
                source={item.avatar ? { uri: item.avatar } : require("@assets/img.png")}
            />
            <View>
                <RegularText color="#FFF" textalign="left" align="center" string={item.name} />
                <RegularText
                    color="#FFF"
                    align="center"
                    textalign="left"
                    string={item.userDetails && item.userDetails.policePost}
                />
                <RegularText
                    color="#FFF"
                    align="center"
                    textalign="left"
                    string={item.userDetails && item.userDetails.caseCount}
                />
            </View>
        </View>
    );
}
export function ComplaintsLayout({ route }: any) {
    const { t } = useTranslation();

    const [changeStatus, setChangeStatus] = React.useState({
        activity: false,
        status: ""
    });
    const [police, setPolice] = React.useState<any[]>();
    const [assignComplaint, setAssignComplaint] = React.useState({
        activity: false,
        _id: "",
        name: ""
    });

    const [view, setView] = React.useState(false);
    const { _id, role } = useSelector((state: RootStateOrAny) => state.auth);

    const images = route.images?.map((img: any, index: any) => {
        return { url: img };
    });

    async function handleChangeStatus() {
        const creds = await getCredentials();
        if (creds) {
            try {
                const res = await fetch(updateStatus, {
                    method: "PUT",
                    body: JSON.stringify({
                        status: changeStatus.status,
                        _id: route._id
                    }),
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                        authorization: `Bearer ${creds.access_token}`
                    }
                });

                const statusChange = await res.json();
                if (statusChange.acknowledged) {
                    console.log("updated");
                } else {
                    console.log("error");
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    async function getAllStationPolice() {
        const data = await getCredentials();
        if (data) {
            if (!isTokenExpired(data.access_token)) {
                const user = await fetch(getStationPolice, {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        authorization: `Bearer ${data.access_token}`
                    }
                });
                const res = await user.json();
                if (res.success) {
                    setPolice(res.user);
                }
                //active status to be send from backend to login police
            }
        }
    }

    async function handleAssignPolice() {
        if (assignComplaint.name !== "" && assignComplaint._id !== "") {
            const cred = await getCredentials();
            if (cred) {
                if (!isTokenExpired(cred.access_token)) {
                    try {
                        const res = await fetch(assignReport, {
                            method: "PUT",
                            body: JSON.stringify({
                                assignName: assignComplaint.name,
                                assignTo: assignComplaint._id,
                                _id: route._id
                            }),
                            headers: {
                                Accept: "application/json",
                                "Content-Type": "application/json",
                                authorization: `Bearer ${cred.access_token}`
                            }
                        });
                        // const data = await res.json();
                    } catch (error) {
                        console.log(error);
                    }
                    //active status to be send from backend to login police
                }
            }
        } else {
            setAssignComplaint({ _id: "", activity: false, name: "" });
        }
    }

    React.useEffect(() => {
        const ac = new AbortController();
        getAllStationPolice();
        return function cleanup() {
            ac.abort();
        };
    }, []);

    const FlatListHead = () => {
        return (
            <>
                <View
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center"
                    }}
                >
                    <View
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            width: "100%",
                            marginBottom: 10
                        }}
                    >
                        <StatusDetail string={route.status && route.status} />
                        <View
                            style={{
                                flexDirection: "column",
                                alignItems: "flex-start",
                                marginLeft: 10
                            }}
                        >
                            <DateAndTime
                                string={new Date(route.createdAt!).toLocaleDateString("en-IN")}
                            />
                            <DateAndTime
                                string={new Date(route.createdAt!).toLocaleTimeString("en-IN")}
                            />
                        </View>
                    </View>
                </View>
                <MediumText
                    size={19}
                    align="flex-start"
                    string={
                        route.complaintAgainst === _id
                            ? `${t("involve")}`
                            : `${t("raised")} ${
                                  route.complaintAgainstName && route.complaintAgainstName
                              } `
                    }
                />
                {role === 4000 && (
                    <Button
                        btnName="Assign Complaint"
                        weight="200"
                        onPress={() => setAssignComplaint({ ...assignComplaint, activity: true })}
                    />
                )}
            </>
        );
    };

    const FlatListFooter = () => {
        return (
            <>
                {role === 4000 && (
                    <Button btnName="Update Complaint" weight="200" onPress={handleAssignPolice} />
                )}
                {role === 5000 && (
                    <>
                        <Button
                            btnName="Change Status"
                            weight="200"
                            onPress={() =>
                                setChangeStatus({
                                    ...changeStatus,
                                    activity: !changeStatus.activity
                                })
                            }
                        />
                        <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
                            {changeStatus.activity &&
                                ["In Process", "Hold", "Solved", "Closed"].map((items, index) => {
                                    return (
                                        <Button
                                            weight="200"
                                            style={{
                                                margin: 3,
                                                width: 100,
                                                paddingVertical: 5,
                                                borderRadius: 30,
                                                backgroundColor:
                                                    changeStatus.status === items
                                                        ? "#0d054b"
                                                        : "#1D0ECC"
                                            }}
                                            key={index}
                                            onPress={() =>
                                                setChangeStatus({ ...changeStatus, status: items })
                                            }
                                            btnName={items}
                                        />
                                    );
                                })}
                        </View>
                        {changeStatus.status !== "" && (
                            <>
                                <Text
                                    weight="200"
                                    color="#FFF"
                                >{`Change Complaint status to ${changeStatus.status}`}</Text>
                                <View
                                    style={{
                                        flexDirection: "row",
                                        justifyContent: "space-around"
                                    }}
                                >
                                    <Button
                                        weight="200"
                                        style={{ width: "45%" }}
                                        btnName="Yes"
                                        onPress={handleChangeStatus}
                                    />
                                    <Button
                                        weight="200"
                                        style={{ width: "45%" }}
                                        btnName="No"
                                        onPress={() =>
                                            setChangeStatus({ activity: false, status: "" })
                                        }
                                    />
                                </View>
                            </>
                        )}
                    </>
                )}
                <View style={{ marginBottom: 80 }}>
                    <Heading string={`${t("reason")}:`} />
                    <LightText string={route.reason} />
                    <View style={{ marginTop: 15, justifyContent: "space-evenly" }}>
                        <MediumText
                            align="flex-start"
                            size={18}
                            string={`${t("current")} ${route.currentSituation}`}
                        />
                        <MediumText
                            align="flex-start"
                            size={18}
                            string={`${t("lastLoc")} ${route.locationAddress}`}
                        />
                        <View
                            style={{
                                width: "100%",
                                flexDirection: "column",
                                backgroundColor: "#FFF",
                                borderRadius: 5,
                                padding: 5,
                                marginVertical: 4
                            }}
                        >
                            <RegularText
                                align="flex-start"
                                size={15}
                                color="#000"
                                string={`${t("stationName")} ${
                                    route.nearestPoliceStation && route.nearestPoliceStation
                                }`}
                            />
                            <RegularText
                                size={15}
                                color="#000"
                                textalign="justify"
                                string={`${t("add")}: ${
                                    route.nearestPoliceStationAddress &&
                                    route.nearestPoliceStationAddress
                                }`}
                            />
                        </View>
                    </View>
                </View>
            </>
        );
    };
    return (
        <Background bgColor="#281B89">
            <View
                style={{
                    position: "relative",
                    height: "100%",
                    width: "100%"
                }}
            >
                <View
                    style={{
                        paddingHorizontal: 20,
                        paddingBottom: 10,
                        height: "100%",
                        width: "100%"
                    }}
                >
                    <ScrollView>
                        <FlatListHead />

                        {assignComplaint.activity &&
                            role === 4000 &&
                            police?.map(item => (
                                <TouchableOpacity
                                    onPress={() => {
                                        setAssignComplaint({
                                            ...assignComplaint,
                                            _id: item._id,
                                            name: item.name
                                        });
                                    }}
                                    key={item._id}
                                >
                                    <Police item={item} select={assignComplaint._id} />
                                </TouchableOpacity>
                            ))}
                        <FlatListFooter />
                    </ScrollView>
                </View>
                <View
                    style={{
                        position: "absolute",
                        width: "100%",
                        paddingHorizontal: 20,
                        bottom: 0,
                        left: 0,
                        backgroundColor: "#281B89"
                    }}
                >
                    <Modal visible={view} transparent={true} onRequestClose={() => setView(false)}>
                        <ImageViewer
                            imageUrls={images}
                            onSwipeDown={() => setView(false)}
                            onCancel={() => setView(false)}
                            enableSwipeDown={true}
                            backgroundColor="#281B89"
                        />
                    </Modal>
                    <Button weight="200" btnName={t("viewImages")} onPress={() => setView(true)} />
                    <Button
                        bgColor="#DC143C"
                        weight="200"
                        style={{
                            color: colors.white
                        }}
                        btnName={`${t("assignTo")}: ${route.assignName}`}
                    />
                </View>
            </View>
        </Background>
    );
}
