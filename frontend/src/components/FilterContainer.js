import React from 'react'
import SearchContainer from './SearchContainer'
import SortContainer from './SortContainer'

const FilterContainer = () => {
  return (
    <div className='max-w-screen-xl bg-gray-500 rounded-md w-[80vw] mx-auto px-2 h-16 flex mt-4 gap-4 justify-between items-center '>
      <SearchContainer/>
      <SortContainer/>
    </div>
  )
}

export default FilterContainer
