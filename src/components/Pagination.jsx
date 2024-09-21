import React from "react";

const Pagination = ({handleBack, handleNext, pageNo}) => {
  return (
    <div className="flex gap-2 p-4 justify-center w-full mt-6 mb-6 bg-gray-300">
        <div onClick={handleBack} className="mx-4">
            <i className="fa-solid fa-arrow-left"></i>
        </div>
        <div>{pageNo}</div>
        <div onClick={handleNext} className="mx-4">
            <i className="fa-solid fa-arrow-right"></i>
        </div>
    </div>
  )
}

export default Pagination;