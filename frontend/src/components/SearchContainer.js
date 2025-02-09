import React, { useState } from 'react'

const SearchContainer = () => {
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");

    const handleSearch = () => {
        alert(from + " " + to);
    }

    const handleFromChange = (e) => {
        setFrom(e.target.value);
    }
    
    const handleToChange = (e) => {
        setTo(e.target.value);
    }

    return (
        <div>
            <form className='flex gap-4 flex-col sm:flex-row'>

                <div className='flex gap-2 items-center justify-between'>
                    <label htmlFor="from">From</label>
                    <input
                    value={from}
                        type="text"
                        name="from"
                        class="border border-gray-300 rounded-lg px-4 py-1 focus:outline-none"
                        onChange={(e) =>{handleFromChange(e)}}
                    />
                </div>

                <div className='flex gap-2 items-center justify-between'>
                    <label htmlFor="to">To</label>
                    <input
                    value={to}
                        type="text"
                        name="to"
                        class="border border-gray-300 rounded-lg px-4 py-1 focus:outline-none"
                        onChange={(e) =>{handleToChange(e)}}
                    />
                </div>

                <input
                    type="button"
                    value="Search"
                    class="bg-blue-500 text-white font-semibold px-4 py-1 rounded-lg hover:bg-blue-600 transition duration-300 cursor-pointer"
                    onClick={handleSearch}
                />
            </form>
        </div>
    )
}

export default SearchContainer
