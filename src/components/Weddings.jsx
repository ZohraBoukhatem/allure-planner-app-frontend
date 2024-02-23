import axios from "axios";
import { useEffect, useState } from "react";
import "./Weddings.css";

const API_URL = import.meta.env.VITE_API_URL;

function Weddings() {
  const [eventList, setEventList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${API_URL}/events`)
      .then((response) => {
        setEventList(response.data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      {loading ? (
        <img src="/logoGif.gif" alt="animatedLogo" />
      ) : (
        <div className="weddings">
          {eventList.map((elm) => {
            return (
              <div class="stack">
                      <a key={elm._id} href={`/events/${elm._id}`}>
                <div class="card">
                  <div class="wedding">
                        {elm.bride.brideFirstName} + {elm.groom.groomFirstName}
                 
                  </div>
                </div>
                      </a>
              </div>
            );
          })}
          <div class="stack">
                <a href="/events/new">
            <div class="card">
              <div class="wedding">
                  New event
              </div>
            </div>
                  </a>
          </div>
        </div>
      )}
    </>
  );
}

export default Weddings;
