import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { ReactNode } from "react";
import {
    View,
    Image,
    TouchableOpacity,
    TouchableOpacityProps,
    Keyboard,
    TouchableWithoutFeedback
} from "react-native";
import { colors } from "@utils";
import AuthNavigator from "./AuthNavigator";
import ComplaintNavigator from "./ComplaintNavigator";
import PostNavigator from "./PostNavigator";

type CustomTabBarButtonprops = {
    children: ReactNode;
} & TouchableOpacityProps;

const Tab = createBottomTabNavigator();

const CustomTabBarButton = ({ children, onPress }: CustomTabBarButtonprops) => (
    <TouchableWithoutFeedback
        onPress={onPress}
        style={{ top: -10, justifyContent: "center", alignItems: "center" }}
    >
        <View
            style={{
                width: 50,
                height: 50,
                borderRadius: 15,
                backgroundColor: colors.tertiary,
                shadowColor: colors.black,
                shadowOffset: { width: 6, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 4,
                elevation: 4,
                marginTop: 4
            }}
        >
            {children}
        </View>
    </TouchableWithoutFeedback>
);

const Tabs = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    height: 60,
                    backgroundColor: "#130e5c",
                    borderTopColor: "#130e5c"
                }
            }}
        >
            <Tab.Screen
                name="Home"
                component={ComplaintNavigator}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: "center", justifyContent: "center" }}>
                            <Image
                                source={require("@assets/homeicon.png")}
                                resizeMode="contain"
                                style={{
                                    height: 20,
                                    width: 20,
                                    marginBottom: 5,
                                    tintColor: focused ? "#1C32F3" : "#FFF"
                                }}
                            />
                        </View>
                    )
                }}
            />
            <Tab.Screen
                name="ComplaintTypes"
                component={PostNavigator}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={require("@assets/plus.png")}
                            resizeMode="contain"
                            style={{
                                height: 20,
                                width: 20,
                                tintColor: focused ? "#1C32F3" : "#FFF",
                                transform: focused ? [{ rotate: "45deg" }] : [{ rotate: "0deg" }]
                            }}
                        />
                    ),
                    tabBarButton: props => <CustomTabBarButton {...props} />
                }}
            />
            <Tab.Screen
                name="Profile"
                component={AuthNavigator}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: "center", justifyContent: "center" }}>
                            <Image
                                source={require("@assets/profileicon.png")}
                                resizeMode="contain"
                                style={{
                                    height: 20,
                                    width: 20,
                                    marginBottom: 5,
                                    tintColor: focused ? "#1C32F3" : "#FFF"
                                }}
                            />
                        </View>
                    )
                }}
            />
        </Tab.Navigator>
    );
};
export default Tabs;
