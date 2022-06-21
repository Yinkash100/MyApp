import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store/store';


export interface authObjState {
    token: string;
    lastLogin: number;
}

const initialState: authObjState = {
    token: '',
    lastLogin: 0,
};


export const authObjSlice = createSlice({
    name: 'authObj',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        populateAuthObject: (state, action: PayloadAction<authObjState> ) => {
            state.token = action.payload.token;
            state.lastLogin = Date.now();
        },
        deleteAuthObject: (state) => {
            state.token = '';
            state.lastLogin = 0;
        },
    },

});

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectAuthObject = (state: RootState) => state.authObj;

export const { populateAuthObject, deleteAuthObject } = authObjSlice.actions;


export default authObjSlice.reducer;
