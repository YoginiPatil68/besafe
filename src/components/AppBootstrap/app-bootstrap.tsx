import React, { ReactElement, ReactNode, useEffect } from "react";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import * as ImagePicker from "expo-image-picker";

type AppBootstrapProps = {
    children: ReactNode;
};

export default function AppBootstrap({ children }: AppBootstrapProps): ReactElement {
    async function requestPermission() {
        const result = await ImagePicker.requestCameraPermissionsAsync();
        if (!result.granted) alert("You need Permission to access the Library");
    }
    useEffect(() => {
        requestPermission();
    }, []);

    const [loaded] = useFonts({
        "Chillax-Medium": require("@assets/fonts/Chillax-Medium.ttf"),
        "Chillax-Regular": require("@assets/fonts/Chillax-Regular.ttf"),
        "Chillax-Bold": require("@assets/fonts/Chillax-Bold.ttf"),
        "Chillax-Light": require("@assets/fonts/Chillax-Light.ttf")
    });
    return loaded ? <>{children}</> : <AppLoading />;
}
