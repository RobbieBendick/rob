import { createSlice } from "@reduxjs/toolkit";




const initialState = {
    value: []
}


export const arenaDataSlice = createSlice({
    name: "arenaData",
    initialState,
    reducers: {
        fetchAllData: (state, action) => {
            let a = `https://us.api.blizzard.com/data/wow/pvp-region/1/pvp-season/1/pvp-leaderboard/2v2?namespace=dynamic-classic-us&locale=en_US&access_token=${process.env.REACT_APP_TOKEN}`
            let d = `https://us.api.blizzard.com/data/wow/pvp-region/1/pvp-season/1/pvp-leaderboard/3v3?namespace=dynamic-classic-us&locale=en_US&access_token=${process.env.REACT_APP_TOKEN}`
            let k = `https://us.api.blizzard.com/data/wow/pvp-region/1/pvp-season/1/pvp-leaderboard/5v5?namespace=dynamic-classic-us&locale=en_US&access_token=${process.env.REACT_APP_TOKEN}`
      
            async function fetchArenaData(twos, threes, fives) {
              const response = await Promise.all([
                fetch(twos).then(val => val.json()),
                fetch(threes).then(val => val.json()),
                fetch(fives).then(val => val.json())
              ]).then(([twosData, threesData, fivesData]) => {
                    state.value.push(action.payload)
              })
              return response;
            }
            fetchArenaData(a, d, k).then(() => {
                console.log(state);
            });
        }
    }
})

export const { fetchAllData } = arenaDataSlice.actions;

export default arenaDataSlice.reducer;