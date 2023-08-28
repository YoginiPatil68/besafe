import React, { ReactElement } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
    AllComplaints,
    Post,
    MissingPerson,
    MSLF,
    Wanted,
    UnidPerson,
    Bank,
    MobileApp,
    NearbyPolice
} from "@screens";

import { StackNavigatorParams } from "@types";

const Stack = createStackNavigator<StackNavigatorParams>();

export default function PostNavigator(): ReactElement {
    return (
        <Stack.Navigator
            screenOptions={{
                headerMode: "screen",
                headerShown: false
            }}
        >
            <Stack.Screen name="AllComplaints" component={AllComplaints} />
            <Stack.Screen name="Post" component={Post} />
            <Stack.Screen name="MissingPerson" component={MissingPerson} />
            <Stack.Screen name="MSLF" component={MSLF} />
            <Stack.Screen name="Wanted" component={Wanted} />
            <Stack.Screen name="UnidPerson" component={UnidPerson} />
            <Stack.Screen name="Bank" component={Bank} />
            <Stack.Screen name="MobileApp" component={MobileApp} />
            <Stack.Screen name="NearbyPolice" component={NearbyPolice} />
        </Stack.Navigator>
    );
}
