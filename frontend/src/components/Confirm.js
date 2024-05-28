import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Confirm = () => {

    const [waitingList, setWaitingList] = useState([]);

    useEffect(() => {
        async function getWaitingList() {
            try {
                const data = await axios.get('http://localhost:5001/admin/getwaitinglist');

                setWaitingList(data.data.bus)
                console.log(waitingList)
            } catch (err) {
                console.log(err)
            }
        }
        getWaitingList();
    }, [waitingList])

    return (
        <div>
            {
                waitingList ? (
                    waitingList.map((list, index) => (
                        <h1 key={index}>{list.username}</h1>
                    ))
                ) : null
            }
        </div>
    )
}

export default Confirm
