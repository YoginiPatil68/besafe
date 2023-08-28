import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mslf: [],
    missingPerson: [],
    UnidentifiedPerson: []
};

export const historySlice = createSlice({
    name: "history",
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
        }
    },
    extraReducers: {}
});

// Action creators are generated for each case reducer function
export const { userMslf, userMissingPerson, userUnidentifiedPerson } = historySlice.actions;

export default historySlice.reducer;
