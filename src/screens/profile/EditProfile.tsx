import React, { useState } from "react";
import { Background, CustomInput, Button, ImageInput } from "@components";
import { View, ScrollView } from "react-native";
import { colors } from "@utils";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { NavigationProps } from "@types";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { citizenDetails, uploadImage } from "@contexts/api/client";
import { getCredentials, isTokenExpired } from "@contexts/store/credentials";
import { userData } from "@contexts/slice/authSlice";
import { useTranslation } from "react-i18next";

export function EditProfile({ navigation, route }: NavigationProps<"EditProfile">) {
    const { t } = useTranslation();
    const [imageUri, setImageUri] = React.useState<string>();
    const [details, setDetails] = React.useState({
        dob: `${t("dob")}(MM-DD-YYYY)`,
        adhaarCard: "",
        panCard: "",
        address: "",
        occupation: ""
    });
    const dispatch = useDispatch();
    const uploadProfileImage = async () => {
        const formData = new FormData();
        formData.append(
            "profile",
            JSON.parse(
                JSON.stringify({
                    name: "image",
                    uri: imageUri,
                    type: "image/jpg"
                })
            )
        );
        try {
            const tokens = await getCredentials();
            const res = await fetch(uploadImage, {
                method: "POST",
                body: formData,
                headers: {
                    Accept: "application/json",
                    "Content-Type": "multipart/form-data",
                    authorization: `Bearer ${tokens.access_token}`
                }
            });
            return await res.json();
        } catch (error) {
            console.log(error);
        }
    };

    async function SubmitEditProfile() {
        try {
            if (imageUri) uploadProfileImage();
            const tokens = await getCredentials();
            try {
                const res = await fetch(citizenDetails, {
                    method: "PUT",
                    body: JSON.stringify(details),
                    headers: {
                        "Content-Type": "application/json",
                        authorization: `Bearer ${tokens.access_token}`
                    }
                });
                const user = await res.json();
                console.log(user);
                if (user.success) {
                    dispatch(userData(user));
                }
            } catch (error) {
                console.log(error);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date: any) => {
        setDetails({ ...details, dob: date.toLocaleDateString("en-IN") });
        hideDatePicker();
    };

    return (
        <Background>
            <View
                style={{
                    height: "100%",
                    width: "100%",
                    alignItems: "center",
                    padding: 20,
                    justifyContent: "center"
                }}
            >
                <Button weight="400" btnName={t("editProfile")} />
                <View
                    style={{
                        marginTop: 25,
                        alignItems: "center",
                        width: "100%",
                        height: "80%",
                        justifyContent: "center"
                    }}
                >
                    <ScrollView style={{ width: "100%", paddingHorizontal: 10 }}>
                        <ImageInput
                            imageUri={imageUri}
                            onChangeImage={setImageUri}
                            style={{
                                borderRadius: 70,
                                marginBottom: 15,
                                alignSelf: "center"
                            }}
                        />
                        {/* <ImageUpload /> */}
                        <Button
                            btnName={details.dob}
                            weight="400"
                            numberOfLines={1}
                            onPress={showDatePicker}
                            bgColor="#FFF"
                            textColor={colors.quatnary}
                        />
                        <CustomInput
                            onChangeText={text => setDetails({ ...details, adhaarCard: text })}
                            placeholder={t("adhar")}
                        />
                        <CustomInput
                            onChangeText={text => setDetails({ ...details, panCard: text })}
                            placeholder={t("pan")}
                        />
                        <CustomInput
                            onChangeText={text => setDetails({ ...details, address: text })}
                            placeholder={t("add")}
                        />
                        <CustomInput
                            onChangeText={text => setDetails({ ...details, occupation: text })}
                            placeholder={t("occupation")}
                        />
                        <Button btnName={t("Save")} onPress={SubmitEditProfile} />
                    </ScrollView>
                </View>
                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                />
            </View>
        </Background>
    );
}
