import {
    Background,
    Button,
    Complaint,
    CustomInput,
    ImageInputList,
    LocationLoader,
    PostLoader,
    RegularText,
    Text
} from "@components";
import { NavigationProps } from "@types";
import React from "react";
import { TouchableWithoutFeedback, View } from "react-native";
import * as Location from "expo-location";
import { getCredentials } from "@contexts/store/credentials";
import { mobileApp, sendNotification } from "@contexts/api/client";

export function MobileApp({ navigation, route }: NavigationProps<"MobileApp">) {
    const [error, setError] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const [policeLoading, setPoliceLoading] = React.useState(false);
    const [locationLoading, setLocationLoading] = React.useState(false);
    const [imageUris, setImageUris] = React.useState<string[]>([]);
    const [location, setLocation] = React.useState("");
    const [station, setStation] = React.useState("");
    const [latlng, setlatlng] = React.useState<{ latitude: number; longitude: number }>();
    const [complaint, setComplaint] = React.useState({
        incidenceDesc: "",
        locationName: "",
        locationAddress: "",
        nearestPoliceStation: "",
        nearestPoliceStationAddress: ""
    });

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
    React.useEffect(() => {
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

    const [nearbyStation, setNearbyStation] = React.useState<[]>();

    const handleAdd = (uri: string) => {
        setImageUris([...imageUris, uri]);
    };

    const handleRemove = (uri: string) => {
        setImageUris(imageUris.filter(imageUris => imageUris !== uri));
    };

    async function locationAddress() {
        const loc = await fetch(
            `https://trueway-places.p.rapidapi.com/FindPlaceByText?text=${complaint.locationName}&language=en`,
            {
                method: "GET",
                headers: {
                    "x-rapidapi-host": "trueway-places.p.rapidapi.com",
                    "x-rapidapi-key": "4dbe734a50msh60cc149bbe99849p1aefa1jsn434bf0188f79"
                }
            }
        );
        const { results } = await loc.json();
        setLocation(results[0]?.address);
        setLocationLoading(true);
        setTimeout(() => {
            setLocationLoading(false);
        }, 1000);
    }
    // async function stationAddress() {
    //     const loc = await fetch(
    //         `https://trueway-places.p.rapidapi.com/FindPlaceByText?text=${complaint.nearestPoliceStation}&language=en`,
    //         {
    //             method: "GET",
    //             headers: {
    //                 "x-rapidapi-host": "trueway-places.p.rapidapi.com",
    //                 "x-rapidapi-key": "4dbe734a50msh60cc149bbe99849p1aefa1jsn434bf0188f79"
    //             }
    //         }
    //     );
    //     const { results } = await loc.json();
    //     console.log(results);
    //     setStation(results[0]?.address);
    //     setLocationLoading(true);
    //     setTimeout(() => {
    //         setLocationLoading(false);
    //     }, 1000);
    // }
    async function nearByPoliceStation() {
        setComplaint({ ...complaint, nearestPoliceStation: "", nearestPoliceStationAddress: "" });
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
        console.log("hello");
        const creds = await getCredentials();
        try {
            const submit = await fetch(mobileApp, {
                method: "POST",
                body: formData,
                headers: {
                    Accept: "application/json",
                    "Content-Type": "multipart/form-data",
                    authorization: `Bearer ${creds.access_token}`
                }
            });
            const res = await submit.json();
            console.log(res);
            if (res.success) {
                navigation.navigate("ViewMobApp");
                setComplaint({
                    incidenceDesc: "",
                    locationName: "",
                    locationAddress: "",
                    nearestPoliceStation: "",
                    nearestPoliceStationAddress: ""
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
                }, 10000);
            }
        } catch (err) {
            console.log(err);
        }
    }

    const [changeStatus, setChangeStatus] = React.useState({
        activity: false,
        status: ""
    });
    return (
        <Background>
            <Complaint error={error}>
                {error !== "" && <Text>{error}</Text>}
                <CustomInput
                    placeholder="explaining the complete incidence"
                    onChangeText={text => setComplaint({ ...complaint, incidenceDesc: text })}
                />

                {/* Bank statement from the victim’s account if any transactions made. pdf*/}
                <CustomInput
                    onChangeText={text => setComplaint({ ...complaint, locationName: text })}
                    editable={complaint.locationAddress ? false : true}
                    placeholder={`${changeStatus.status} Location Name`}
                />
                {locationLoading && <PostLoader />}
                {location !== "" && <RegularText string={location} />}
                {location === "" ? (
                    <>
                        <Button
                            btnName={
                                complaint.locationAddress
                                    ? "Saved Address"
                                    : "Check location Address"
                            }
                            weight="400"
                            onPress={locationAddress}
                        />
                        {complaint.locationAddress !== "" && (
                            <Button
                                btnName="Change Address"
                                weight="400"
                                onPress={() => setComplaint({ ...complaint, locationAddress: "" })}
                            />
                        )}
                    </>
                ) : (
                    <Button
                        btnName="Approve Address"
                        weight="400"
                        onPress={() => {
                            setComplaint({
                                ...complaint,
                                locationAddress: location
                            });
                            setLocation("");
                        }}
                    />
                )}

                {/* <CustomInput
                    onChangeText={text => setComplaint({ ...complaint, nearestPoliceStation: "" })}
                    editable={complaint.nearestPoliceStationAddress ? false : true}
                    placeholder={`${changeStatus.status} Station Name`}
                />
                {locationLoading && <PostLoader />}
                {station !== "" && <RegularText string={station} />}
                {station === "" ? (
                    <>
                        <Button
                            btnName={
                                complaint.nearestPoliceStationAddress
                                    ? "Saved Address"
                                    : "Check location Address"
                            }
                            weight="400"
                            onPress={stationAddress}
                        />
                        {complaint.nearestPoliceStationAddress !== "" && (
                            <Button
                                btnName="Change Address"
                                weight="400"
                                onPress={() =>
                                    setComplaint({ ...complaint, nearestPoliceStationAddress: "" })
                                }
                            />
                        )}
                    </>
                ) : (
                    <Button
                        btnName="Approve Address"
                        weight="400"
                        onPress={() => {
                            setComplaint({
                                ...complaint,
                                nearestPoliceStationAddress: location
                            });
                            setLocation("");
                        }}
                    />
                )}
                <Text style={{ color: "#FFF", textAlign: "center" }}>OR</Text> */}
                <Button
                    weight="400"
                    btnName="Get Near by Police Station"
                    onPress={nearByPoliceStation}
                />
                {policeLoading && <LocationLoader />}
                {complaint.nearestPoliceStation === "" ? (
                    nearbyStation &&
                    nearbyStation.map((item: any, index) => {
                        return (
                            <TouchableWithoutFeedback
                                key={index}
                                onPress={() => {
                                    setComplaint({
                                        ...complaint,
                                        nearestPoliceStation: item.name,
                                        nearestPoliceStationAddress: item.address
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
                        weight="400"
                        btnName="Saved Police Station"
                        onPress={nearByPoliceStation}
                    />
                )}
                <RegularText
                    textalign="center"
                    color="#FFF"
                    string="screenshot of the malicious app and the location from where it downloaded"
                    vmargin={8}
                    size={18}
                />
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
            </Complaint>
        </Background>
    );
}
// In Mobile Apps related complaints
//  screenshot of the malicious app and the location from where it downloaded.

//  Bank statement from the victim’s account if any transactions made.

//  soft copy of all above mentioned documents in soft form
