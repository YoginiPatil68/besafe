import { isTokenExpired, setCredentials } from "@contexts/store/credentials";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    lang: "en",
    role: null,
    token: "",
    name: "",
    email: "",
    user: "",
    _id: "",
    avatar: "",
    active: false,
    complaints: [],
    userDetails: undefined,
    notificationToken: "",
    history: []
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        signUp: (state, action) => {
            const { success, access_token, refresh_token } = action.payload;
            if (!isTokenExpired(access_token)) {
                const keys = {
                    access_token,
                    refresh_token
                };
                setCredentials(keys);
                state.token = access_token;
            }
        },
        getTokens: (state, action) => {
            const { access_token } = action.payload;
            state.token = access_token;
        },
        userData: (state, action) => {
            const user = action.payload;
            state.notificationToken = user.notificationToken;
            state._id = user._id;
            state.email = user.email;
            state.name = user.name;
            state.role = user.role;
            state.avatar = user.avatar;
            state.active = user.active;
            state.userDetails = user.userDetails && user.userDetails;
        },
        userComplaints: (state, action) => {
            const { myComplaints } = action.payload;
            state.complaints = myComplaints;
        },
        historyComplaints: (state, action) => {
            const { myComplaints } = action.payload;
            state.history = myComplaints;
        }
    },
    extraReducers: {}
});

// Action creators are generated for each case reducer function
export const { signUp, getTokens, userData, userComplaints, historyComplaints } = authSlice.actions;

export default authSlice.reducer;
