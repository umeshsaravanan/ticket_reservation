import React from 'react'
import SearchContainer from './SearchContainer'
import SortContainer from './SortContainer'

const FilterContainer = () => {
  return (
    <div className='max-w-screen-xl bg-gray-500 rounded-md w-[300px] sm:w-[80vw] mx-auto p-2 h-auto flex mt-4 gap-4 justify-between items-center flex-col sm:flex-row'>
      <SearchContainer/>
      <SortContainer/>
    </div>
  )
}

export default FilterContainer
