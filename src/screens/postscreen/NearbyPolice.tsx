import { View, TouchableWithoutFeedback, Image, FlatList } from "react-native";
import React from "react";
import { NavigationProps } from "@types";
import { Background, Button, LocationLoader, RegularText } from "@components";
import { useTranslation } from "react-i18next";
import * as Location from "expo-location";

type Props = {};

const NearbyPolice = ({ navigation }: NavigationProps<"NearbyPolice">) => {
    const { t, i18n } = useTranslation();
    const [policeLoading, setPoliceLoading] = React.useState(false);
    const [nearbyStation, setNearbyStation] = React.useState<[]>();
    const [latlng, setlatlng] = React.useState<{ latitude: number; longitude: number }>();

    async function nearByPoliceStation() {
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
        console.log(results);
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

    return (
        <Background>
            <View
                style={{
                    paddingHorizontal: 10,
                    width: "100%",
                    height: "100%",
                    justifyContent: "space-evenly"
                }}
            >
                <Button
                    weight="200"
                    btnName="Get Near by Police Station"
                    onPress={nearByPoliceStation}
                />
                {policeLoading && <LocationLoader />}
                {nearbyStation &&
                    nearbyStation.map((item: any, index) => {
                        return (
                            <TouchableWithoutFeedback key={index}>
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
                                        size={11}
                                        color="#000"
                                        textalign="justify"
                                        string={`Phone number: ${
                                            item.phone_number && item.phone_number
                                        }`}
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
                    })}
            </View>
        </Background>
    );
};

export default NearbyPolice;
