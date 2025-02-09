import axios from 'axios';
import React, { useState } from 'react'
import { useAllContext } from '../context/AllContext';

const SearchContainer = () => {
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const { setBusCallback, setLoaderCallback } = useAllContext();

    const handleSearch = async () => {
        setLoaderCallback(true);

        const searchParams = {
            from,
            to
        }
        const response = await axios.post(`${process.env.REACT_APP_BASE_URI}/search`, searchParams);
        setBusCallback(response.data.array);
        setLoaderCallback(false);
    }

    const handleFromChange = (e) => {
        setFrom(e.target.value);
    }

    const handleToChange = (e) => {
        setTo(e.target.value);
    }

    return (
        <div className='sm:w-[70%] w-[300px] p-2'>
            <form className='flex gap-4 flex-col sm:flex-row'>

                <div className='flex gap-2 items-center justify-between'>
                    <label htmlFor="from">From</label>
                    <input
                        value={from}
                        type="text"
                        name="from"
                        className="border border-gray-300 rounded-lg px-4 py-1 focus:outline-none w-full"
                        onChange={(e) => { handleFromChange(e) }}
                    />
                </div>

                <div className='flex gap-2 items-center justify-between'>
                    <label htmlFor="to">To</label>
                    <input
                        value={to}
                        type="text"
                        name="to"
                        className="border border-gray-300 rounded-lg px-4 py-1 focus:outline-none w-full"
                        onChange={(e) => { handleToChange(e) }}
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
