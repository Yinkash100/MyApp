import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authObjReducer from '../reducers/authObjSlice';

export const store = configureStore({
    reducer: {
        authObj: authObjReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
    >;
