import {
    Background,
    Button,
    CheckBox,
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
import { TouchableWithoutFeedback, View, AppRegistry } from "react-native";
import DocumentPicker from "react-native-document-picker";

export function Bank({ route }: NavigationProps<"Bank">) {
    const [loading, setLoading] = React.useState(false);
    const [policeLoading, setPoliceLoading] = React.useState(false);
    const [locationLoading, setLocationLoading] = React.useState(false);
    const [imageUris, setImageUris] = React.useState<string[]>([]);
    const [location, setLocation] = React.useState("");
    const [latlng, setlatlng] = React.useState<{ latitude: number; longitude: number }>();
    const [complaint, setComplaint] = React.useState({
        incidenceDesc: "",
        locationName: "",
        locationAddress: "",
        nearestPoliceStation: "",
        nearestPoliceStationAddress: "",
        reportFor: ""
    });
    console.log(complaint);
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
        setLocation(results[0].address);
        setLocationLoading(true);
        setTimeout(() => {
            setLocationLoading(false);
        }, 1000);
    }
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

    // async function submitComplaint() {
    //     const formData = new FormData();
    //     imageUris.forEach(element => {
    //         formData.append(
    //             "imageProof",
    //             JSON.parse(
    //                 JSON.stringify({
    //                     name: `image.${element.split(".")[1]}`,
    //                     uri: element,
    //                     type: `image/${element.split(".")[1]}`
    //                 })
    //             )
    //         );
    //     });
    //     formData.append("data", JSON.stringify(complaint));
    //     const creds = await getCredentials();
    //     try {
    //         const submit = await fetch(createPost, {
    //             method: "POST",
    //             body: formData,
    //             headers: {
    //                 Accept: "application/json",
    //                 "Content-Type": "multipart/form-data",
    //                 authorization: `Bearer ${creds.access_token}`
    //             }
    //         });
    //         console.log(await submit.json());
    //         const token = await fetch(sendNotification, {
    //             method: "POST",
    //             body: JSON.stringify({
    //                 userMessage: "Joi.string().required()"
    //             }),
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 Accept: "application/json",
    //                 authorization: `Bearer ${creds.access_token}`
    //             }
    //         });
    //         const statusChange = await token.json();
    //     } catch (err) {
    //         console.log(err);
    //     }
    // }

    function handleLoading() {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }

    const [changeStatus, setChangeStatus] = React.useState({
        activity: false,
        status: ""
    });

    // async function openDocumentFile() {
    //     try {
    //         const res = await DocumentPicker.pick({
    //             type: [DocumentPicker.types.allFiles]
    //         });
    //         console.log(res);
    //         // console.log(
    //         // res.uri,
    //         // res.type, // mime type
    //         // res.name,
    //         // res.size
    //         // );
    //     } catch (err) {
    //         if (DocumentPicker.isCancel(err)) {
    //             // User cancelled the picker, exit any dialogs or menus and move on
    //         } else {
    //             throw err;
    //         }
    //     }
    // }

    return (
        <Background>
            <Complaint>
                <CustomInput
                    placeholder="explaining the complete incidence"
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
                        [
                            "Net banking/ATM",
                            "Fake call frauds",
                            "Lottery scams",
                            "Online Transactions"
                        ].map((items, index) => {
                            return (
                                // <Button
                                //     weight="200"
                                //     style={{
                                //         margin: 3,
                                //         width: 140,
                                //         paddingVertical: 5,
                                //         borderRadius: 30,
                                //         backgroundColor:
                                //             changeStatus.status === items ? "#0d054b" : "#1D0ECC"
                                //     }}
                                //     key={index}
                                //     onPress={() =>
                                //         setChangeStatus({ ...changeStatus, status: items })
                                //     }
                                //     btnName={items}
                                // />
                                <CheckBox
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
                {/* <Button btnName="select Doc" onPress={() => openDocumentFile()} /> */}

                <CustomInput
                    onChangeText={text => setComplaint({ ...complaint, locationName: text })}
                    editable={complaint.locationAddress ? false : true}
                    placeholder="Location Name"
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
                    color="#FFF"
                    string="Copy of SMSs received in screenshot"
                    vmargin={8}
                    size={18}
                />
                <RegularText
                    textalign="center"
                    color="#FFF"
                    string="Copy of your ID proof and address in screenshot"
                    vmargin={8}
                    size={18}
                />

                <ImageInputList
                    imageUri={imageUris}
                    onAddImage={handleAdd}
                    onRemoveImage={(uri: string) => handleRemove(uri)}
                />
                <Button btnName="Submit" style={{ fontSize: 18, marginTop: 6 }} />
            </Complaint>
        </Background>
    );
}
// Bank related

// Net banking/ATM
// Fake call frauds
// Lottery scams
// Online Transactions related
// Bank statement from the concerned bank of last six months.

// Copy of SMSs received related to the alleged transactions.

// Copy of your ID proof and address proof as shown in the bank records.
