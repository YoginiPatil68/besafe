import React, { ReactElement } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
    Getstarted,
    Language,
    Register,
    SignIn,
    SignUp,
    PoliceDetail,
    DetailFilled,
    forgotPass
} from "@screens";

import { StackNavigatorParams } from "@types";

const Stack = createStackNavigator<StackNavigatorParams>();

export default function AuthNavigator(): ReactElement {
    return (
        <Stack.Navigator
            // initialRouteName="PoliceDetail"
            screenOptions={{
                headerMode: "screen",
                headerShown: false
            }}
        >
            <Stack.Screen name="Getstarted" component={Getstarted} />
            <Stack.Screen name="Language" component={Language} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="forgotPass" component={forgotPass} />
        </Stack.Navigator>
    );
}
