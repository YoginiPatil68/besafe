import React, { useRef } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import ImageInput from "./ImageInput";

interface Props {
    imageUri?: string[];
    onAddImage: (uri: string) => void;
    onRemoveImage: (uri: string) => void;
}

const ImageInputList = ({ imageUri = [], onAddImage, onRemoveImage }: Props) => {
    const scrollView = useRef<ScrollView>(null);
    return (
        <View>
            <ScrollView
                horizontal={true}
                ref={scrollView}
                onContentSizeChange={() => scrollView?.current?.scrollToEnd()}
            >
                <View style={styles.container}>
                    {imageUri.map((uri, index) => (
                        <View key={index} style={styles.image}>
                            <ImageInput imageUri={uri} onChangeImage={() => onRemoveImage(uri)} />
                        </View>
                    ))}
                    <ImageInput onChangeImage={(uri: string) => onAddImage(uri)} />
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row"
    },
    image: {
        marginRight: 10
    }
});

export default ImageInputList;
