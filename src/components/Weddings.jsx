import axios from "axios";
import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

function Weddings() {
    const [eventList, setEventList] = useState([])
    const [loading, setLoading] = useState(true)
  
   useEffect(() => {
    axios.get(`${API_URL}/events`)
    .then((response) => {
      setEventList(response.data)
      setLoading(false)
    })
    .catch((error) => console.log(error));
  }, []);
  
  return (
    <>
    {loading 
      ? <img src="/logoGif.gif" alt="animatedLogo" />
      :
        <div className="events">
          <ul>
          {eventList.map((elm) => {
            return (
              <li key={elm._id}> 
                <a href={`/events/${elm._id}`} >
                {elm.bride.brideFirstName} + {elm.groom.groomFirstName}
                </a>
                </li>
              )
          })}
          </ul>
          <div className="justify">
          <img src="/divider.png" alt="divider"/>
          <div className="newEvent">
              <a href="/events/new">New event</a>
            </div>
          </div>
        </div>
  }
      </>
    );
}

export default Weddings