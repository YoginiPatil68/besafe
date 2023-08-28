import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mslf: [],
    missingPerson: [],
    UnidentifiedPerson: [],
    mobApp: []
};

export const complaintsSlice = createSlice({
    name: "complaints",
    initialState,
    reducers: {
        userMslf: (state, action) => {
            const { myComplaints } = action.payload;
            state.mslf = myComplaints;
        },
        userMissingPerson: (state, action) => {
            const { myComplaints } = action.payload;
            state.missingPerson = myComplaints;
        },
        userUnidentifiedPerson: (state, action) => {
            const { myComplaints } = action.payload;
            state.UnidentifiedPerson = myComplaints;
        },
        userMobApp: (state, action) => {
            const { myComplaints } = action.payload;
            state.mobApp = myComplaints;
        }
    },
    extraReducers: {}
});

// Action creators are generated for each case reducer function
export const { userMslf, userMobApp, userMissingPerson, userUnidentifiedPerson } =
    complaintsSlice.actions;

export default complaintsSlice.reducer;
