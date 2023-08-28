import Text from "../text/Text";
import React from "react";
import { colors } from "../../utils/colors/colors";
import { View, StyleSheet, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as ImagePicker from "expo-image-picker";
import Button from "../Button/Button";
import { uploadImage } from "../../contexts/api/client";
import { NavigationProps } from "@types";
import { getCredentials } from "@contexts/store/credentials";

type imageUploadProps = {
    token: string;
};

const ImageUpload = () => {
    const [profileImage, setProfileImage] = React.useState("");

    const openImageLibrary = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
            alert("Sorry we need camera roll premission to make this work!");
        }
        if (status === "granted") {
            try {
                const response = await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                    allowsEditing: true
                });
                if (!response.cancelled) {
                    setProfileImage(response.uri);
                }
            } catch (err) {
                console.log(err);
            }
        }
    };
    const uploadProfileImage = async () => {
        const formData = new FormData();
        formData.append(
            "profile",
            JSON.stringify({
                name: "image",
                uri: profileImage,
                type: "image/jpg"
            })
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
            const data = await res.json();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <View style={{ alignItems: "center" }}>
            <View style={styles.circle}>
                <TouchableOpacity onPress={openImageLibrary}>
                    <Image
                        style={styles.image}
                        source={
                            profileImage ? { uri: profileImage } : require("@assets/camera.png")
                        }
                    />
                </TouchableOpacity>
            </View>
            <Text style={{ color: colors.tertiary, fontSize: 20 }}>Change Profile Pic</Text>

            {profileImage ? (
                <Button
                    onPress={uploadProfileImage}
                    btnName="Upload"
                    weight="400"
                    style={{
                        backgroundColor: colors.tertiary,
                        paddingHorizontal: 10,
                        marginVertical: 10
                    }}
                />
            ) : null}
        </View>
    );
};

const styles = StyleSheet.create({
    image: {
        width: 60,
        height: 60
    },
    circle: {
        borderRadius: 75,
        overflow: "hidden"
    }
});

export default ImageUpload;
