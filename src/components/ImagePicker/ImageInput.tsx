import { colors } from "@utils";
import React from "react";
import {
    View,
    StyleSheet,
    Image,
    ImageSourcePropType,
    Alert,
    TouchableWithoutFeedback,
    ViewProps
} from "react-native";
import * as ImagePicker from "expo-image-picker";

type Props = {
    imageUri?: string;
    onChangeImage?: any;
} & ViewProps;

const ImageInput = ({ imageUri, onChangeImage, style }: Props) => {
    const handlePress = () => {
        if (!imageUri) selectImage();
        else
            Alert.alert("Delete", "Are you sure you dont want this image?", [
                {
                    text: "Yes",
                    onPress: () => onChangeImage(null)
                },
                {
                    text: "No"
                }
            ]);
    };

    const selectImage = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                quality: 0.5
            });
            if (!result.cancelled) {
                onChangeImage(result.uri);
            }
        } catch (error) {
            console.log("Error Reading an Image", error);
        }
    };

    return (
        <TouchableWithoutFeedback onPress={handlePress}>
            <View style={[styles.container, style]}>
                {!imageUri && (
                    <Image
                        source={require("@assets/camera.png")}
                        resizeMode="contain"
                        style={{
                            height: 60,
                            width: 60
                        }}
                    />
                )}
                {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        backgroundColor: colors.white,
        borderRadius: 15,
        justifyContent: "center",
        height: 120,
        width: 120,
        overflow: "hidden"
    },
    image: {
        height: "100%",
        width: "100%"
    }
});

export default ImageInput;
