import { useParams } from "react-router-dom";
import "./WeddingDetails.css";
import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import DeleteWedding from "../components/DeleteWedding";

const API_URL = import.meta.env.VITE_API_URL;

function WeddingDetails() {
  const [wedding, setWedding] = useState({});
  const [loading, setLoading] = useState(true)
  const { weddingId } = useParams();

    useEffect(() => {
    axios
      .get(`${API_URL}/weddings/${weddingId}`)
      .then((response) => {
        setWedding(response.data);
        setLoading(false)
      })
      .catch((error) => console.log(error));
  }, [])


  return (
    <>
    {loading 
      ? <img src="/logoGif.gif" alt="animatedLogo" />
      :
        <div className="details">
        <div className="basicInfo">
          <h1>Basic info</h1>
          <p>
            The bride: {wedding.bride.brideFirstName}{" "}
            {wedding.bride.brideLastName}
          </p>
          <p>
            The groom: {wedding.groom.groomFirstName}{" "}
            {wedding.groom.groomLastName}
          </p>
        </div>

        <div className="date">
          <h1>Dates</h1>
          {wedding.date && <p>The day: {wedding.date.slice(0, 10)}</p>}
        </div>

        <div className="venue">
          <h1>Venues</h1>
          <ul>
            {wedding.venues.map((venue) => {
              return (
                <div key={venue.venueName}>
                  <li>Name: {venue.venueName}</li>
                  <li>Address: {venue.venueAddress}</li>
                  <li>Number: {venue.venueTel}</li>
                </div>
              );
            })}
          </ul>
        </div>

        <div className="budget">
          <h1>Budget</h1>
          <p>
            {wedding.budget.amount} {wedding.budget.currency}
          </p>
        </div>

        <div className="vendors">
          <h1>Vendors</h1>
          <ul>
            {wedding.vendors.map((vendor) => {
              return (
                <div key={vendor.vendorName}>
                  <li>Name: {vendor.vendorName}</li>
                  <li>Address: {vendor.vendorAddress}</li>
                  <li>Number: {vendor.vendorTel}</li>
                </div>
              );
            })}
          </ul>
        </div>

        <div className="schedule">
          <h1>Schedule</h1>
          <p>Reception: {wedding.schedule.reception}</p>
          <p>Ceremony: {wedding.schedule.ceremony}</p>
          <p>Afterparty: {wedding.schedule.afterparty}</p>
        </div>

        <div className="guestList">
          <h1>Guest list</h1>
          <ul>
            {wedding.guestList.map((guest) => (
              <li key={guest.guestName}>
                {guest.guestName}, {guest.link}
              </li>
            ))}
          </ul>
        </div>
      <DeleteWedding weddingId={weddingId} />
      <button>
        <a href={`/weddings/${weddingId}/edit`}> Edit Wedding</a>
      </button>
      </div>
              
    }
    </>
  );
}
export default WeddingDetails;
