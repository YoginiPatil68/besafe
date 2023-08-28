import React from "react";
import { View, Image, Modal, FlatList } from "react-native";
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
import { NavigationProps } from "@types";
import ImageViewer from "react-native-image-zoom-viewer";
import { getStationPolice, updateStatus } from "@contexts/api/client";
import { getCredentials, isTokenExpired } from "@contexts/store/credentials";
import { RootStateOrAny, useSelector } from "react-redux";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
// import { ListItem } from "react-native-elements";
// import { subscribeToChat } from "../../service/socketio.service";

export function ComplaintsLayout({ route }: any) {
    const [changeStatus, setChangeStatus] = React.useState({
        activity: false,
        status: ""
    });
    const [police, setPolice] = React.useState<any[]>();
    const [assignComplaint, setAssignComplaint] = React.useState({
        activity: false,
        _id: "",
        name: "",
        avatar: "",
        policePost: ""
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

    React.useEffect(() => {
        getAllStationPolice();
    }, []);

    const [selectedId, setSelectedId] = React.useState(null);

    function Police({ item }: any) {
        return (
            <TouchableWithoutFeedback onPress={() => setSelectedId(item._id)}>
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
                        backgroundColor: item._id === selectedId ? "#27224dc7" : "#281B89"
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
                        <RegularText
                            color="#FFF"
                            textalign="left"
                            align="center"
                            string={item.name}
                        />
                        <RegularText
                            color="#FFF"
                            align="center"
                            textalign="left"
                            string={item.userDetails && item.userDetails.policePost}
                        />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    }

    const flatListHead = () => {
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
                            ? "You are involved in this complaint"
                            : `Your complaint is raised against: ${
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

    const flatListFooter = () => {
        return (
            <>
                {role === 4000 && (
                    <Button
                        btnName="Update Complaint"
                        weight="200"
                        onPress={() => setAssignComplaint({ ...assignComplaint, activity: true })}
                    />
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
                    <Heading string="Reason" />
                    <LightText string={route.reason} />
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
                    <FlatList
                        data={police && police}
                        renderItem={role === 4000 ? (assignComplaint ? Police : null) : null}
                        keyExtractor={item => item._id}
                        ListHeaderComponent={flatListHead}
                        ListFooterComponent={flatListFooter}
                        extraData={selectedId}
                    />
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
                    <Button weight="200" btnName="View Case Images" onPress={() => setView(true)} />
                    <Button
                        bgColor="#DC143C"
                        weight="200"
                        style={{
                            color: colors.white
                        }}
                        btnName={`Assigned to: ${route.assignTo}`}
                    />
                </View>
            </View>
        </Background>
    );
}
