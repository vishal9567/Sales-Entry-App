import { configureStore } from "@reduxjs/toolkit";
import salesEntry from '../utils/salesSlice.js'

export const store=configureStore({
    reducer:{
        sales:salesEntry
    }
})