import axios from "axios";
import { useEffect, useState } from "react";
import "./Weddings.css";

const API_URL = import.meta.env.VITE_API_URL;

function Weddings() {
  const [weddingsList, setWeddingsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${API_URL}/weddings`)
      .then((response) => {
        setWeddingsList(response.data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      {weddingsList 
      ? <>
      {loading ? (
        <img src="/logoGif.gif" alt="animatedLogo" />
        ) : (
          <div className="weddings">
          {weddingsList.map((elm) => {
            return (
              <div class="stack">
                      <a key={elm._id} href={`/weddings/${elm._id}`}>
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
                <a href="/weddings/new">
            <div class="card">
            <div class="wedding">
                  New wedding
              </div>
            </div>
                  </a>
          </div>
        </div>
      )}
      </>
    :
          <p>no weddings</p>
}
    </>
  );
}

export default Weddings;
