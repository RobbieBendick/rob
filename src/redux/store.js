import { configureStore } from "@reduxjs/toolkit";
import fetchAllData  from "./arenaData";



export default configureStore({
    reducer: {
        fetchData: fetchAllData
    }
})