import { myDetails, refresh } from "@contexts/api/client";
import AsyncStorage from "@react-native-async-storage/async-storage";

var jwt_decode = require("jwt-decode");

export async function userDetails(token: string) {
    const data = await fetch(myDetails, {
        method: "GET",
        headers: {
            Accept: "application/json",
            authorization: `Bearer ${token}`
        }
    });
    return data;
}

export async function getAccessUsingRefresh(refreshToken: string) {
    const tokens = await fetch(refresh, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            refresh: refreshToken
        })
    });
    return await tokens.json();
}

async function getVerifiedKeys(keys: setCredProps) {
    console.log("Loading keys from storage");
    if (keys) {
        console.log("checking access");
        if (!isTokenExpired(keys.access_token)) {
            console.log("returning access");
            return keys;
        } else {
            console.log("access expired");
            console.log("checking refresh expiry");
            if (!isTokenExpired(keys.refresh_token)) {
                console.log("fetching access using refresh");
                const response = await getAccessUsingRefresh(keys.refresh_token);
                if (response.success === true) {
                    await AsyncStorage.setItem("keys", JSON.stringify(response));
                    console.log("UPDATED ONE");
                    return response;
                } else {
                    console.log("ACCESS EXPIRED");
                }
            } else {
                console.log("refresh expired, please login");
                return null;
            }
        }
    } else {
        console.log("access not available please login");
        return null;
    }
}

export function isTokenExpired(token: string) {
    var decoded = jwt_decode(token);
    const now = Math.floor(Date.now() / 1000);
    if (decoded.exp < now) {
        return true;
    } else {
        return false;
    }
}

interface setCredProps {
    refresh_token: string;
    access_token: string;
}

export const setCredentials = async (keys: setCredProps) => {
    try {
        await AsyncStorage.setItem("keys", JSON.stringify(keys));
    } catch (e) {
        console.log(e);
    }
};

export const getCredentials = async () => {
    try {
        let credentials = await AsyncStorage.getItem("keys");
        let cred = await getVerifiedKeys(JSON.parse(credentials!));
        if (credentials != null && cred != null) {
            return cred;
        } else {
            return null;
        }
    } catch (e) {
        console.log(e);
    }
    return null;
};
