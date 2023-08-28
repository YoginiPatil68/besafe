import React, { ReactElement } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { PoliceDetail, DetailFilled } from "@screens";

import { StackNavigatorParams } from "@types";
import { RootStateOrAny, useSelector } from "react-redux";

const Stack = createStackNavigator<StackNavigatorParams>();

export default function PoliceNavigation(): ReactElement {
    const user = useSelector((state: RootStateOrAny) => state.auth);
    return (
        <Stack.Navigator
            initialRouteName="PoliceDetail"
            screenOptions={{
                headerMode: "screen",
                headerShown: false
            }}
        >
            {user.userDetails !== undefined ? (
                <Stack.Screen name="DetailFilled" component={DetailFilled} />
            ) : (
                <Stack.Screen name="PoliceDetail" component={PoliceDetail} />
            )}
        </Stack.Navigator>
    );
}
