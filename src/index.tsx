import React, { ReactElement } from "react";
import { AppBootstrap, PostLoader, Normalloader } from "@components";
import Tabs from "@config/tabnavigator/Tab";
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigator from "@config/navigations/AuthNavigator";
import { store } from "@contexts/store/store";
import { Provider, RootStateOrAny, useSelector } from "react-redux";
import { getCredentials } from "@contexts/store/credentials";
import { useDispatch } from "react-redux";
import { getTokens, userData } from "@contexts/slice/authSlice";
import { expoTokens, myDetails } from "@contexts/api/client";
import PoliceNavigation from "@config/tabnavigator/PoliceNavigation";
import { registerForPushNotificationsAsync } from "./screens/profile/Exam";

function Navigation(): ReactElement {
    const [loading, setLoading] = React.useState(false);
    const dispatch = useDispatch();
    async function getData() {
        const creds = await getCredentials();
        if (creds) {
            const expo = await registerForPushNotificationsAsync();
            setLoading(true);
            if (expo) {
                try {
                    const token = await fetch(expoTokens, {
                        method: "PUT",
                        body: JSON.stringify({
                            notificationToken: expo
                        }),
                        headers: {
                            "Content-Type": "application/json",
                            Accept: "application/json",
                            authorization: `Bearer ${creds.access_token}`
                        }
                    });
                    const statusChange = await token.json();
                    const res = await fetch(myDetails, {
                        method: "GET",
                        headers: {
                            Accept: "application/json",
                            authorization: `Bearer ${creds.access_token}`
                        }
                    });
                    const data = await res.json();
                    if (data.success) {
                        dispatch(getTokens(creds));
                        dispatch(userData(data.user));
                    } else {
                        setLoading(false);
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        } else {
            setLoading(true);
        }
    }
    React.useEffect(() => {
        const ac = new AbortController();
        getData();
        return function cleanup() {
            ac.abort();
        };
    }, []);
    const user = useSelector((state: RootStateOrAny) => state.auth);
    return (
        <>
            {!loading ? (
                <Normalloader />
            ) : (
                <NavigationContainer>
                    {user.token ? (
                        user.active === false ? (
                            <PoliceNavigation />
                        ) : (
                            <Tabs />
                        )
                    ) : (
                        <AuthNavigator />
                    )}
                </NavigationContainer>
            )}
        </>
    );
}

export default function App(): ReactElement {
    return (
        <AppBootstrap>
            <Provider store={store}>
                <Navigation />
                {/* <Navigator /> */}
            </Provider>
        </AppBootstrap>
    );
}
