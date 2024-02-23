import { useEffect, useState } from "react"
import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL;

function Queries() {
    const [queries, setQueries] = useState([])
    const [loading, setLoading] = useState(true)
    
    useEffect(() => {
        axios.get(`${API_URL}/queries`)
        .then((response) => {
            setQueries(response.data)
            setLoading(false)
        })
        .catch((error) => console.log("this is the error: ", error));
        
    }, []);
    
    
    
    
    const handleRead = (queryId) => {
        console.log("here")
        const read = true
        const requestBody = { queryId, read}
        axios.put(`${API_URL}/queries`, requestBody)
        .then(() => {
            console.log("marked as read")
        })
        .catch((err) => {
            console.log("This is the .catch()", err)
        }
        )
    }
    
    
    
    return (
        <>
        {loading
        ? <img src="/logoGif.gif" alt="animatedLogo" />
        : 
        <ul  className="queriesPage">
        {queries.map((query) => {
            return (
                <div key={query._id} className="query">
                <li>Name: {query.name}</li>
                <li>Email: {query.email}</li>
                <li>Subject: {query.subject}</li>
                {query.read == false 
                ? <button onClick={() => handleRead(query._id)}>Mark as read</button>
                : <p>Read</p>
                }
                </div>
                )
            }) }
            </ul>
        }
                </>
    )
    
}

export default Queries