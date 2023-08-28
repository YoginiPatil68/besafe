import React, { ReactElement } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
    Bank,
    ComplaintGroup,
    ComplaintsLayout,
    Getstarted,
    ViewAllComplaints,
    ViewBank,
    ViewMissingPerson,
    ViewMobApp,
    ViewMSLF,
    ViewUnidentifiedPerson,
    ViewWanted
} from "@screens";

import { StackNavigatorParams } from "@types";

const Stack = createStackNavigator<StackNavigatorParams>();

export default function ComplaintNavigator(): ReactElement {
    return (
        <Stack.Navigator
            screenOptions={{
                headerMode: "screen",
                headerShown: false
            }}
        >
            <Stack.Screen name="ViewAllComplaints" component={ViewAllComplaints} />
            <Stack.Screen name="ViewPost" component={ComplaintGroup} />
            <Stack.Screen name="ComplaintsLayout" component={ComplaintsLayout} />
            <Stack.Screen name="ViewMSLF" component={ViewMSLF} />
            <Stack.Screen name="ViewUnidentifiedPerson" component={ViewUnidentifiedPerson} />
            <Stack.Screen name="ViewMissingPerson" component={ViewMissingPerson} />
            <Stack.Screen name="ViewWanted" component={ViewWanted} />
            <Stack.Screen name="ViewMobApp" component={ViewMobApp} />
            <Stack.Screen name="ViewBank" component={ViewBank} />
        </Stack.Navigator>
    );
}
