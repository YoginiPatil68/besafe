import React from "react";
import { Background, Button, CustomInput, ImageInput, Text, RegularText } from "@components";
import { ScrollView, FlatList, Image } from "react-native";
import { View } from "react-native";
import styles from "./detail.styles";
import { NavigationProps } from "@types";
import { colors } from "@utils";
import { policeDetails, uploadPaper } from "@contexts/api/client";
import { getCredentials } from "@contexts/store/credentials";
import { useDispatch } from "react-redux";
import { userData } from "@contexts/slice/authSlice";
import { useTranslation } from "react-i18next";

export function PoliceDetail({ route, navigation }: NavigationProps<"PoliceDetail">) {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [imageUri, setImageUri] = React.useState<string>();
    const [passport, setPassport] = React.useState<string>();
    const [error, setError] = React.useState<string>("");
    const [verificationDetails, setVerificationDetails] = React.useState({
        phoneNo: "",
        adhaarCard: "",
        panCard: "",
        policeID: "",
        postingArea: "",
        policePost: "",
        dob: "",
        city: "",
        address: "",
        postingAreaAddress: ""
    });
    const [postingArea, setPostingArea] = React.useState("");

    async function fetchPostingArea() {
        const res = await fetch(
            `https://trueway-places.p.rapidapi.com/FindPlaceByText?text=${verificationDetails.postingArea}&language=en`,
            {
                method: "GET",
                headers: {
                    "x-rapidapi-host": "trueway-places.p.rapidapi.com",
                    "x-rapidapi-key": "4dbe734a50msh60cc149bbe99849p1aefa1jsn434bf0188f79"
                }
            }
        );
        const { results } = await res.json();
        setPostingArea(results[0].address);
    }
    const formData = new FormData();
    formData.append(
        "verification",
        JSON.parse(
            JSON.stringify({
                name: "image",
                uri: imageUri,
                type: "image/jpg"
            })
        )
    );
    async function SubmitForVerification() {
        const creds = await getCredentials();
        if (creds) {
            try {
                const upPaper = await fetch(uploadPaper, {
                    method: "POST",
                    body: formData,
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "multipart/form-data",
                        authorization: `Bearer ${creds.access_token}`
                    }
                });
                const paper = await upPaper.json();
                try {
                    if (paper.success) {
                        const data = {
                            ...verificationDetails,
                            verificationPaper: paper.uri
                        };
                        const res = await fetch(policeDetails, {
                            method: "PUT",
                            body: JSON.stringify(data),
                            headers: {
                                "Content-Type": "application/json",
                                authorization: `Bearer ${creds.access_token}`
                            }
                        });
                        const user = await res.json();
                        if (user.success) {
                            dispatch(userData(user));
                        } else {
                            setError(
                                "Error occured kindly recheck your adhaar,pan or posting area"
                            );
                        }
                    } else {
                        setError("Server Error or Verification Paper was not found");
                    }
                } catch (error) {
                    console.log(error);
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <Background>
            <View style={styles.view}>
                <View style={styles.box1}>
                    <Text
                        weight="700"
                        style={{
                            textAlign: "center",
                            color: colors.white
                        }}
                    >
                        {t("verDetail")}
                    </Text>
                </View>
                <View style={styles.box2}>
                    <ScrollView>
                        {error !== "" && <RegularText string={error} />}
                        <Text style={{ alignSelf: "center" }} weight="700" color="#FFF">
                            Passport Size Photo
                        </Text>
                        <ImageInput
                            imageUri={passport}
                            onChangeImage={setPassport}
                            style={{
                                borderRadius: 70,
                                marginVertical: 10,
                                alignSelf: "center"
                            }}
                        />
                        <CustomInput
                            keyboardType="number-pad"
                            onChangeText={text =>
                                setVerificationDetails({ ...verificationDetails, phoneNo: text })
                            }
                            placeholder="Phone Number"
                        />
                        <CustomInput
                            onChangeText={text =>
                                setVerificationDetails({ ...verificationDetails, adhaarCard: text })
                            }
                            placeholder={t("adhar")}
                        />
                        <CustomInput
                            onChangeText={text =>
                                setVerificationDetails({ ...verificationDetails, panCard: text })
                            }
                            placeholder={t("pan")}
                        />
                        <CustomInput
                            onChangeText={text =>
                                setVerificationDetails({ ...verificationDetails, policeID: text })
                            }
                            placeholder={t("policeId")}
                        />
                        <CustomInput
                            onChangeText={text =>
                                setVerificationDetails({
                                    ...verificationDetails,
                                    postingArea: text
                                })
                            }
                            placeholder={t("postArea")}
                        />
                        {postingArea !== "" && <RegularText string={postingArea} />}
                        {postingArea === "" ? (
                            <Button
                                style={{ backgroundColor: "#281B89" }}
                                btnName={
                                    verificationDetails.postingAreaAddress
                                        ? `${t("save")} ${t("add")}`
                                        : `${t("checkPost")}`
                                }
                                weight="400"
                                onPress={fetchPostingArea}
                            />
                        ) : (
                            <Button
                                style={{ backgroundColor: "#281B89" }}
                                btnName={`${t("approve")} ${t("add")}`}
                                weight="400"
                                onPress={() => {
                                    setVerificationDetails({
                                        ...verificationDetails,
                                        postingAreaAddress: postingArea
                                    });
                                    setPostingArea("");
                                }}
                            />
                        )}
                        <CustomInput
                            onChangeText={text =>
                                setVerificationDetails({ ...verificationDetails, policePost: text })
                            }
                            placeholder={`${t("police")} ${t("post")}`}
                        />
                        <CustomInput
                            onChangeText={text => {
                                setVerificationDetails({
                                    ...verificationDetails,
                                    dob: text
                                });
                            }}
                            placeholder={t("dob")}
                        />
                        <CustomInput
                            onChangeText={text =>
                                setVerificationDetails({ ...verificationDetails, city: text })
                            }
                            placeholder={t("city")}
                        />
                        <CustomInput
                            onChangeText={text =>
                                setVerificationDetails({ ...verificationDetails, address: text })
                            }
                            placeholder={`${t("prsnl")} ${t("add")}`}
                        />
                        <Text style={{ alignSelf: "center" }} weight="700" color="#FFF">
                            {t("verPaper")}
                        </Text>
                        <ImageInput
                            imageUri={imageUri}
                            onChangeImage={setImageUri}
                            style={{
                                borderRadius: 70,
                                marginVertical: 10,
                                alignSelf: "center"
                            }}
                        />
                        <Button
                            style={{ backgroundColor: "#281B89" }}
                            btnName={t("verify")}
                            weight="400"
                            onPress={SubmitForVerification}
                        />
                    </ScrollView>
                </View>
            </View>
        </Background>
    );
}
