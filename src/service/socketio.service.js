import { getCredentials } from "@contexts/store/credentials";
import { io } from "socket.io-client";
import AsyncStorage from "@react-native-async-storage/async-storage";

let socket;

export const initiateSocketConnection = async cb => {
    const cred = await getCredentials();

    if (cred) {
        socket = io("https://besafebackend-production-1132.up.railway.app");
    }
    // socket = io("https://besaferestapi.herokuapp.com");
    socket.on("connect", () => {
        console.log(`Connecting socket...`);
        return cb(socket.connected);
    });
};

export const disconnectSocket = async () => {
    console.log("Disconnecting socket...");
    if (socket) socket.disconnect();
};
export const closeSocket = async () => {
    console.log("close socket...");
    const { access_token } = JSON.parse(await AsyncStorage.getItem("keys"));
    socket.removeListener(`${access_token}sendMSLF`);
    if (socket) socket.close();
};

export const subscribeToChat = cb => {
    socket.on("statusUpdated", msg => {
        return cb(null, msg);
    });
};
export const AllComplaints = cb => {
    socket.on("getComplaints", msg => {
        return cb(null, msg);
    });
};
export const AllMSLF = async cb => {
    // var real = socket.connect();
    const { access_token } = JSON.parse(await AsyncStorage.getItem("keys"));
    socket.emit("g", { token: access_token });
    socket.once(access_token, msg => {
        console.log(msg);
        return cb(null, msg);
    });
};
export const AllMissingPerson = cb => {
    socket.on("getMissingPerson", msg => {
        return cb(null, msg);
    });
};
export const AllUnIdPerson = cb => {
    socket.on("getUnIdPerson", msg => {
        return cb(null, msg);
    });
};
export const ComplaintsHistory = cb => {
    socket.on("ComplaintsHistory", msg => {
        return cb(null, msg);
    });
};
export const MISSINGPersonHistory = cb => {
    console.log("fetching");
    socket.on("missingPersonHistory", msg => {
        return cb(null, msg);
    });
};
export const MSLFHistory = cb => {
    socket.on("mslfHistory", msg => {
        return cb(null, msg);
    });
};
export const UnIdPersonHistory = cb => {
    socket.on("UnIdPersonHistory", msg => {
        return cb(null, msg);
    });
};
