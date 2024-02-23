import { useParams } from "react-router-dom";
import "./EventDetails.css";
import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import DeleteEvent from "../components/DeleteEvent";

const API_URL = import.meta.env.VITE_API_URL;

function EventDetails() {
  const [event, setEvent] = useState({});
  const [loading, setLoading] = useState(true)
  const { eventId } = useParams();

    useEffect(() => {
    axios
      .get(`${API_URL}/events/${eventId}`)
      .then((response) => {
        setEvent(response.data);
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
            The bride: {event.bride.brideFirstName}{" "}
            {event.bride.brideLastName}
          </p>
          <p>
            The groom: {event.groom.groomFirstName}{" "}
            {event.groom.groomLastName}
          </p>
        </div>

        <div className="date">
          <h1>Dates</h1>
          {event.date && <p>The day: {event.date.slice(0, 10)}</p>}
        </div>

        <div className="venue">
          <h1>Venues</h1>
          <ul>
            {event.venues.map((venue) => {
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
            {event.budget.amount} {event.budget.currency}
          </p>
        </div>

        <div className="vendors">
          <h1>Vendors</h1>
          <ul>
            {event.vendors.map((vendor) => {
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
          <p>Reception: {event.schedule.reception}</p>
          <p>Ceremony: {event.schedule.ceremony}</p>
          <p>Afterparty: {event.schedule.afterparty}</p>
        </div>

        <div className="guestList">
          <h1>Guest list</h1>
          <ul>
            {event.guestList.map((guest) => (
              <li key={guest.guestName}>
                {guest.guestName}, {guest.link}
              </li>
            ))}
          </ul>
        </div>
      <DeleteEvent eventId={eventId} />
      <button>
        <a href={`/events/${eventId}/edit`}> Edit Event</a>
      </button>
      </div>
              
    }
    </>
  );
}
export default EventDetails;
