import { createSlice } from "@reduxjs/toolkit";

const paginationSlice = createSlice({
    name: 'pagination',
    initialState: {pageNo: 1},
    reducers:{
        handleNext : (state) => {
            state.pageNo = state.pageNo + 1;
        },
        handlePrev : (state) => {
            if( state.pageNo === 1 ){
                return;
            }
            state.pageNo = state.pageNo - 1;
        }
    }
})

export const { handleNext, handlePrev } = paginationSlice.actions;
export default paginationSlice.reducer;