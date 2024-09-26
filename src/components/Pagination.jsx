import React from "react";

// || importing hooks and reducer functions to use reducer ||
import { handleNext, handlePrev } from "../redux/paginationSlice";
import { useSelector, useDispatch } from "react-redux";

const Pagination = () => {
  const {pageNo} = useSelector( (state) => state.pagination)
  const dispatch = useDispatch();

  return (
    <div className="flex gap-2 p-4 justify-center w-full mt-6 mb-6 bg-gray-300">
        <div onClick={()=> {dispatch(handlePrev())} } className="mx-4 cursor-pointer" >
            <i className="fa-solid fa-arrow-left"></i>
        </div>
        <div>{pageNo}</div>
        <div onClick={() => {dispatch(handleNext())}} className="mx-4 cursor-pointer">
            <i className="fa-solid fa-arrow-right"></i>
        </div>
    </div>
  )
}

export default Pagination;