import { createSlice } from "@reduxjs/toolkit";

const connection=createSlice({
    name:"connection",
    initialState:null,
    reducers:{
        addConnection:(_,action)=>{
            return action.payload;
        },
        removeConnection:()=>{
            return null;
        }

    }
})
export const {addConnection , removeConnection}=connection.actions;
export default connection.reducer;