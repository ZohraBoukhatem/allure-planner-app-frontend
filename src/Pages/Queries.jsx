import { useEffect, useState } from "react";
import axios from "axios";
import "./Queries.css";

const API_URL = import.meta.env.VITE_API_URL;

function Queries() {
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showMore, setShowMore] = useState(false);
  const [read, setRead] = useState(false)

  useEffect(() => {
    axios
      .get(`${API_URL}/queries`)
      .then((response) => {
        setQueries(response.data);
        setLoading(false);
        setRead(false)
      })
      .catch((error) => console.log("this is the error: ", error));
  }, [read]);

  const handleRead = (queryId) => {
    console.log("here");
    const read = true;
    const requestBody = { queryId, read };
    axios
      .put(`${API_URL}/queries`, requestBody)
      .then(() => {
        console.log("marked as read");
        setRead(true)
      })
      .catch((err) => {
        console.log("This is the .catch()", err);
      });
  };

  return (
    <>
      {loading ? (
        <img src="/logoGif.gif" alt="animatedLogo" />
      ) : (
        <ul id="queriesPage">
          {queries.map((query) => {
            return (
              <div key={query._id} className="query">
                {query.read == false ? (
                  <button onClick={() => handleRead(query._id)}>
                    Mark as read
                  </button>
                ) : (
                  <p>Read</p>
                )}
                <div className="info">
                  <li>Name: {query.name}</li>
                  <li>Email: {query.email}</li>
                  <li>Subject:</li>
                </div>

                <div className="subject">
                  {query.subject}
               
                 
                </div>
              </div>
            );
          })}
        </ul>
      )}
    </>
  );
}

export default Queries;
