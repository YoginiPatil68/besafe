import {
    Background,
    Complaint,
    RegularText,
    Text,
    CustomInput,
    PostLoader,
    Button,
    LocationLoader,
    ImageInputList,
    MediumText,
    LightText,
    CheckBox
} from "@components";
import { complaints, createPost, sendNotification, unIdPerson } from "@contexts/api/client";
import { getCredentials } from "@contexts/store/credentials";
import { colors } from "@utils";
import React, { useEffect } from "react";
import { TouchableWithoutFeedback, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import * as Location from "expo-location";
import { NavigationProps } from "@types";
import { useTranslation } from "react-i18next";

export function UnidPerson({ navigation }: NavigationProps<"UnidPerson">) {
    const [error, setError] = React.useState("");
    const { t } = useTranslation();
    const [loading, setLoading] = React.useState(false);
    const [policeLoading, setPoliceLoading] = React.useState(false);
    const [locationLoading, setLocationLoading] = React.useState(false);
    const [imageUris, setImageUris] = React.useState<string[]>([]);
    const [location, setLocation] = React.useState("");
    const [latlng, setlatlng] = React.useState<{ latitude: number; longitude: number }>();
    const [complaint, setComplaint] = React.useState({
        incidenceDesc: "",
        dateFrom: "Date & Time",
        dateTo: "Date & Time",
        height: "",
        expectedAge: "",
        upperDressColor: "",
        lowerDressColor: "",
        faceCutWithColor: "",
        hairCutWithColor: "",
        eyes: "",
        sex: "",
        locName: "",
        locAddress: "",
        stationName: "",
        stationAddress: "",
        reportFor: ""
    });
    const [nearbyStation, setNearbyStation] = React.useState<[]>();

    const handleAdd = (uri: string) => {
        setImageUris([...imageUris, uri]);
    };

    const handleRemove = (uri: string) => {
        setImageUris(imageUris.filter(imageUris => imageUris !== uri));
    };

    async function locAddress() {
        const loc = await fetch(
            `https://trueway-places.p.rapidapi.com/FindPlaceByText?text=${complaint.locName}&language=en`,
            {
                method: "GET",
                headers: {
                    "x-rapidapi-host": "trueway-places.p.rapidapi.com",
                    "x-rapidapi-key": "4dbe734a50msh60cc149bbe99849p1aefa1jsn434bf0188f79"
                }
            }
        );
        const { results } = await loc.json();
        setLocation(results[0].address);
        setLocationLoading(true);
        setTimeout(() => {
            setLocationLoading(false);
        }, 1000);
    }
    async function nearByPoliceStation() {
        setComplaint({ ...complaint, stationName: "", stationAddress: "" });
        const station = await fetch(
            `https://trueway-places.p.rapidapi.com/FindPlacesNearby?location=${latlng?.latitude},${latlng?.longitude}&type=police_station&language=en`,
            {
                method: "GET",
                headers: {
                    "x-rapidapi-host": "trueway-places.p.rapidapi.com",
                    "x-rapidapi-key": "4dbe734a50msh60cc149bbe99849p1aefa1jsn434bf0188f79"
                }
            }
        );
        const { results } = await station.json();
        setNearbyStation(results);
        setPoliceLoading(true);
        setTimeout(() => {
            setPoliceLoading(false);
        }, 1000);
    }

    async function submitComplaint() {
        const formData = new FormData();
        imageUris.forEach(element => {
            formData.append(
                "imageProof",
                JSON.parse(
                    JSON.stringify({
                        name: `image.${element.split(".").slice(-1)}`,
                        uri: element,
                        type: `image/${element.split(".").slice(-1)}`
                    })
                )
            );
        });
        formData.append("data", JSON.stringify(complaint));
        const creds = await getCredentials();
        try {
            const submit = await fetch(unIdPerson, {
                method: "POST",
                body: formData,
                headers: {
                    Accept: "application/json",
                    "Content-Type": "multipart/form-data",
                    authorization: `Bearer ${creds.access_token}`
                }
            });
            const res = await submit.json();
            if (res.success) {
                navigation.navigate("ViewUnidentifiedPerson");
                setComplaint({
                    incidenceDesc: "",
                    dateFrom: "Date & Time",
                    dateTo: "Date & Time",
                    height: "",
                    expectedAge: "",
                    upperDressColor: "",
                    lowerDressColor: "",
                    faceCutWithColor: "",
                    hairCutWithColor: "",
                    eyes: "",
                    sex: "",
                    locName: "",
                    locAddress: "",
                    stationName: "",
                    stationAddress: "",
                    reportFor: ""
                });
                const token = await fetch(sendNotification, {
                    method: "POST",
                    body: JSON.stringify({
                        userMessage: "You can see your complaint status in complaint panal"
                    }),
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                        authorization: `Bearer ${creds.access_token}`
                    }
                });
                const statusChange = await token.json();
            } else {
                setError(res.message);
                setTimeout(() => {
                    setError("");
                }, 3000);
            }
        } catch (err) {
            console.log(err);
        }
    }

    async function latLong() {
        try {
            const { granted } = await Location.requestForegroundPermissionsAsync();
            if (!granted) return;
            return await Location.watchPositionAsync(
                {
                    accuracy: Location.Accuracy.High,
                    distanceInterval: 1,
                    timeInterval: 1
                },
                pos => {
                    setlatlng({ latitude: pos.coords.latitude, longitude: pos.coords.longitude });
                }
            );
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        let locClean:
            | {
                  remove(): void;
              }
            | undefined;

        latLong().then(remove => {
            locClean = remove;
        });
        return function cleanup() {
            locClean?.remove();
        };
    }, []);
    const [isDatePickerVisible, setDatePickerVisibility] = React.useState({
        from: false,
        to: false
    });

    const showDatePicker = (show: string) => {
        if (show === "to") {
            setDatePickerVisibility({ ...isDatePickerVisible, to: true });
        } else {
            setDatePickerVisibility({ ...isDatePickerVisible, from: true });
        }
    };

    const hideDatePicker = (show: string) => {
        if (show === "to") {
            setDatePickerVisibility({ ...isDatePickerVisible, to: false });
        } else {
            setDatePickerVisibility({ ...isDatePickerVisible, from: false });
        }
    };

    const handleConfirmfrom = (date: any) => {
        setComplaint({ ...complaint, dateFrom: date.toString("en-IN") });
        hideDatePicker("from");
    };
    const handleConfirmto = (date: any) => {
        setComplaint({ ...complaint, dateTo: date.toString("en-IN") });
        hideDatePicker("to");
    };

    const [changeStatus, setChangeStatus] = React.useState({
        activity: false,
        status: ""
    });

    return (
        <Background>
            <Complaint error={error}>
                {error !== "" && <Text>{error}</Text>}
                <CustomInput
                    placeholder={t("exDetail")}
                    onChangeText={text => setComplaint({ ...complaint, incidenceDesc: text })}
                />
                <Button
                    btnName="Select Report Type"
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
                        ["Person", "Child", "DeadBody"].map((items, index) => {
                            return (
                                <CheckBox
                                    weight="200"
                                    check={changeStatus.status}
                                    key={index}
                                    onPress={() => {
                                        setChangeStatus({ ...changeStatus, status: items });
                                        setComplaint({ ...complaint, reportFor: items });
                                    }}
                                    btnName={items}
                                />
                            );
                        })}
                </View>
                {/* {changeStatus.status !== "" && (
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
                            <Button weight="200" style={{ width: "45%" }} btnName="Yes" />
                            <Button
                                weight="200"
                                style={{ width: "45%" }}
                                btnName="No"
                                onPress={() => setChangeStatus({ activity: false, status: "" })}
                            />
                        </View>
                    </>
                )} */}
                <MediumText size={18} string={`${changeStatus.status} Found Date Range`} />
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-around",
                        alignItems: "center"
                    }}
                >
                    <Button
                        style={{ fontSize: 13, width: "45%" }}
                        btnName={complaint.dateFrom}
                        numberOfLines={1}
                        onPress={() => showDatePicker("from")}
                        bgColor="#FFF"
                        textColor={colors.quatnary}
                    />
                    <LightText string="-" />
                    <Button
                        style={{ fontSize: 13, width: "45%" }}
                        btnName={complaint.dateTo}
                        numberOfLines={1}
                        onPress={() => showDatePicker("to")}
                        bgColor="#FFF"
                        textColor={colors.quatnary}
                    />
                </View>
                <CustomInput
                    placeholder={`Height`}
                    onChangeText={text => setComplaint({ ...complaint, height: text })}
                />
                <LightText textalign="center" string="Eg.5-6 feet OR in Cm" />
                <CustomInput
                    placeholder={`Expected Age`}
                    onChangeText={text => setComplaint({ ...complaint, expectedAge: text })}
                />
                <LightText textalign="center" string="Eg.21-24" />
                <CustomInput
                    placeholder={`Upper Dress with Color `}
                    onChangeText={text => setComplaint({ ...complaint, upperDressColor: text })}
                />
                <CustomInput
                    placeholder={`Lower Dress with Color`}
                    onChangeText={text => setComplaint({ ...complaint, lowerDressColor: text })}
                />
                <LightText textalign="center" string="Eg.shirt-red OR jeans-blue" />

                <CustomInput
                    placeholder="FaceCut with Color"
                    onChangeText={text => setComplaint({ ...complaint, faceCutWithColor: text })}
                />

                <CustomInput
                    placeholder="HairCut with Color"
                    onChangeText={text => setComplaint({ ...complaint, hairCutWithColor: text })}
                />
                <CustomInput
                    placeholder="Eyes"
                    onChangeText={text => setComplaint({ ...complaint, eyes: text })}
                />
                <Text weight="200" color="#FFF">
                    Sex
                </Text>
                <View
                    style={{
                        flexDirection: "row"
                    }}
                >
                    {["Male", "Female", "Other"].map((items, index) => {
                        return (
                            <CheckBox
                                btnName={items}
                                key={index}
                                check={complaint.sex}
                                onPress={() => {
                                    setComplaint({ ...complaint, sex: items });
                                }}
                            />
                        );
                    })}
                </View>
                <CustomInput
                    onChangeText={text => setComplaint({ ...complaint, locName: text })}
                    editable={complaint.locAddress ? false : true}
                    placeholder="Location Name"
                />
                {locationLoading && <PostLoader />}
                {location !== "" && <RegularText string={location} />}
                {location === "" ? (
                    <>
                        <Button
                            btnName={
                                complaint.locAddress ? "Saved Address" : "Check location Address"
                            }
                            weight="200"
                            onPress={locAddress}
                        />
                        {complaint.locAddress !== "" && (
                            <Button
                                btnName="Change Address"
                                weight="200"
                                onPress={() => setComplaint({ ...complaint, locAddress: "" })}
                            />
                        )}
                    </>
                ) : (
                    <Button
                        btnName="Approve Address"
                        weight="200"
                        onPress={() => {
                            setComplaint({
                                ...complaint,
                                locAddress: location
                            });
                            setLocation("");
                        }}
                    />
                )}

                <Button
                    weight="200"
                    btnName="Get Near by Police Station"
                    onPress={nearByPoliceStation}
                />
                {policeLoading && <LocationLoader />}
                {complaint.stationName === "" ? (
                    nearbyStation &&
                    nearbyStation.map((item: any, index) => {
                        return (
                            <TouchableWithoutFeedback
                                key={index}
                                onPress={() => {
                                    setComplaint({
                                        ...complaint,
                                        stationName: item.name,
                                        stationAddress: item.address
                                    });
                                }}
                            >
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
                                        size={11}
                                        color="#000"
                                        string={`Station Name: ${item.name && item.name}`}
                                    />
                                    <RegularText
                                        size={11}
                                        color="#000"
                                        textalign="justify"
                                        string={`Address: ${item.address && item.address}`}
                                    />
                                    <RegularText
                                        color="#000"
                                        size={11}
                                        align="flex-start"
                                        string={`${
                                            item.distance && (item.distance / 1000).toFixed(1)
                                        } KM`}
                                    />
                                </View>
                            </TouchableWithoutFeedback>
                        );
                    })
                ) : (
                    <Button
                        weight="200"
                        btnName="Saved Police Station"
                        onPress={nearByPoliceStation}
                    />
                )}
                <RegularText color="#FFF" string="Image Proof" vmargin={8} size={18} />
                <ImageInputList
                    imageUri={imageUris}
                    onAddImage={handleAdd}
                    onRemoveImage={(uri: string) => handleRemove(uri)}
                />
                <Button
                    btnName="Submit"
                    style={{ fontSize: 18, marginTop: 6 }}
                    onPress={submitComplaint}
                />
                <DateTimePickerModal
                    isVisible={isDatePickerVisible.from}
                    mode="datetime"
                    onConfirm={handleConfirmfrom}
                    onCancel={() => hideDatePicker("from")}
                />
                <DateTimePickerModal
                    isVisible={isDatePickerVisible.to}
                    mode="datetime"
                    onConfirm={handleConfirmto}
                    onCancel={() => hideDatePicker("to")}
                />
            </Complaint>
        </Background>
    );
}
