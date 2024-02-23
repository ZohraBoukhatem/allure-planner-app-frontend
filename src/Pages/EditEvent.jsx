import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

function EditEvent() {
  const {eventId} = useParams()
  
  const [loading, setLoading] = useState(true)

  const navigate = useNavigate();

  const [brideFirstName, setBrideFirstName] = useState("");
  const [brideLastName, setBrideLastName] = useState("");
  const bride = { brideFirstName, brideLastName };



  const [groomFirstName, setGroomFirstName] = useState("");
  const [groomLastName, setGroomLastName] = useState("");
  const groom = { groomFirstName, groomLastName };
  


  const [date, setDate] = useState("");



  const [venues, setVenues] = useState([])
  const [venueName, setVenueName] = useState("");
  const [venueAddress, setVenueAddress] = useState("");
  const [venueTel, setVenueTel] = useState();
  const venue = {venueName, venueAddress, venueTel}
  

  
  const [amount, setAmount] = useState();
  const [currency, setCurrency] = useState("EUR");
  const budget = { amount, currency }
  
  

  const [vendors, setVendors] = useState([]);
  const [vendorName, setVendorName] = useState("")
  const [vendorAddress, setVendorAddress] = useState("")
  const [vendorTel, setVendorTel] = useState()
  const vendor = {vendorName, vendorAddress, vendorTel}



  const [reception, setReception] = useState("")
  const [ceremony, setCeremony] = useState("")
  const [afterparty, setAfterparty] = useState("")
  const schedule = { reception, ceremony, afterparty}
  


  const [guestName, setGuestName] = useState("");
  const [link, setLink] = useState("bride's");
  const [guestList, setGuestList] = useState([]);
  const guestObject = { guestName, link };


useEffect(() => {
  axios
  .get(`${API_URL}/events/${eventId}`)
  .then((response) => {
    setBrideFirstName(response.data.bride.brideFirstName)
    setBrideLastName(response.data.bride.brideLastName)
    setGroomFirstName(response.data.groom.groomFirstName)
    setGroomLastName(response.data.groom.groomLastName)
    setDate(response.data.date)
    setVenues(response.data.venues)
    setAmount(response.data.budget.amount)
    setCurrency(response.data.budget.currency)
    setVendors(response.data.vendors)
    setReception(response.data.schedule.reception)
    setCeremony(response.data.schedule.ceremony)
    setAfterparty(response.data.schedule.afterparty)
    setGuestList(response.data.guestList)
    setLoading(false)
  })
  .catch((error) => console.log("this is the error: ", error));
}, [])

  

  const addVendor = (e) => {
    e.preventDefault();
    setVendors((vendors) => [...vendors, vendor]);
    setVendorName("");
    setVendorAddress("");
    setVendorTel(0);
  };

  const addVenue = (e) => {
    e.preventDefault();
    setVenues((venues) => [...venues, venue]);
    setVenueName("");
    setVenueAddress("");
    setVenueTel(0);
  };

  const addGuest = (e) => {
    e.preventDefault();
    setGuestList((guestList) => [...guestList, guestObject]);
    setGuestName("");
    setLink("bride's");
  };

  const handleEdit = (e) => {
    e.preventDefault();
    const updatedEvent = {
      bride,
      groom,
      date,
      venues,
      budget,
      vendors,
      schedule,
      guestList,
    };

  
    axios
      .put(`${API_URL}/events/${eventId}`, updatedEvent)
      .then(() => navigate(`/events/${eventId}`))
      .catch((error) => console.log(error));
  };


  const venueDelete = (e, venueName) => {
    e.preventDefault();
    setVenues(venues.filter((elm) => elm.venueName !== venueName));
    console.log(venues)
  };

  const vendorDelete = (e, vendorName) => {
    e.preventDefault();
    setVendors(vendors.filter((elm) => elm.vendorName !== vendorName));
  };
  const guestDelete = (e, guestName) => {
    e.preventDefault();
    setGuestList(guestList.filter((elm) => elm.guestName !== guestName));
  };


  
  return (
    <>
    {loading 
      ? <img src="/logoGif.gif" alt="animatedLogo" />
      :
      <div className="justify">
        <form>
          <label>The bride: </label>
          <input
            type="text"
            placeholder="First name..."
            name="brideFirstName"
            value={brideFirstName}
            onChange={(e) => setBrideFirstName(e.target.value)}
          />

          <input
            type="text"
            placeholder="Last name..."
            name="brideLastName"
            value={brideLastName}
            onChange={(e) => setBrideLastName(e.target.value)}
          />

          <label>The groom: </label>
          <input
            type="text"
            placeholder="First name..."
            name="groomFirstName"
            value={groomFirstName}
            onChange={(e) => setGroomFirstName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Last name..."
            name="groomLastName"
            value={groomLastName}
            onChange={(e) => setGroomLastName(e.target.value)}
          />

          <label>The date: </label>
          <input
            type="text"
            placeholder="yyyy-mm-dd"
            name="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <label>The venues: </label>
          <div className="">
            <input
              type="text"
              placeholder="Venue Name..."
              name="venueName"
              value={venueName}
              onChange={(e) => setVenueName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Venue address..."
              name="venueAddress"
              value={venueAddress}
              onChange={(e) => setVenueAddress(e.target.value)}
            />
            <input
              type="text"
              placeholder="Venue number..."
              name="venueTel"
              value={venueTel}
              onChange={(e) => setVenueTel(e.target.value)}
            />
            <button onClick={addVenue}>Add venue</button>
          </div>
          <div className="guestAdd">
            <div>
              <h5>Venues</h5>
              <ul>
                {venues.map((elm) => {
                  return (
                    <>
                      <li key={elm.venueName}>{elm.venueName}</li>
                      <button onClick={(e) => venueDelete(e, elm.venueName)}>
                        x
                      </button>
                    </>
                  );
                })}
              </ul>
            </div>
          </div>

          <label>The budget: </label>
          <div className="guest">
            <input
              type="text"
              placeholder="Budget..."
              name="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <select
              name="currency"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <option>EUR</option>
              <option>USD</option>
              <option>KN</option>
            </select>
          </div>

          <label>Vendors: </label>
          <div className="">
            <input
              type="text"
              placeholder="Vendor name..."
              name="vendorName"
              value={vendorName}
              onChange={(e) => setVendorName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Vendor address..."
              name="vendorAddress"
              value={vendorAddress}
              onChange={(e) => setVendorAddress(e.target.value)}
            />
            <input
              type="text"
              placeholder="Vendor number..."
              name="vendorTel"
              value={vendorTel}
              onChange={(e) => setVendorTel(e.target.value)}
            />
            <button onClick={addVendor}>Add vendor</button>
          </div>
          <div className="guestAdd">
            <div>
              <h5>Vendors</h5>
              <ul>
                {vendors.map((elm) => {
                  return (
                    <>
                      <li key={elm.vendorName}>{elm.vendorName}</li>
                      <button onClick={(e) => vendorDelete(e, elm.vendorName)}>
                        x
                      </button>
                    </>
                  );
                })}
              </ul>
            </div>
          </div>

          <label>The schedule: </label>
          <div className="schedule">
            <label>Reception: </label>
            <input
              type="time"
              placeholder="h"
              name="reception"
              value={reception}
              onChange={(e) => setReception(e.target.value)}
            />
            <label>Ceremony: </label>
            <input
              type="time"
              placeholder="h"
              name="ceremony"
              value={ceremony}
              onChange={(e) => setCeremony(e.target.value)}
            />
            <label>Afterparty: </label>
            <input
              type="time"
              placeholder="h"
              name="afterparty"
              value={afterparty}
              onChange={(e) => setAfterparty(e.target.value)}
            />
          </div>

          <label>The guests: </label>
          <div className="guest">
            <input
              type="text"
              placeholder="Name"
              name="guestName"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
            />
            <select
              name="link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            >
              <option>bride's</option>
              <option>groom's</option>
            </select>
            <button type="submit" onClick={addGuest}>
              Add guest
            </button>
          </div>
          <div className="guestAdd">
            <div>
              <h5>Bride's</h5>
              <ul>
                {guestList.map((elm) => {
                  if (elm.link === "bride's") {
                    return (
                      <>
                        <li key={elm.guestName}> {elm.guestName}</li>
                        <button onClick={(e) => guestDelete(e, elm.guestName)}>
                          x
                        </button>
                      </>
                    );
                  }
                })}
              </ul>
            </div>
            <div>
              <h5>Groom's</h5>
              <ul>
                {guestList.map((elm) => {
                  if (elm.link === "groom's") {
                    return (
                      <>
                        <li key={elm.guestName}> {elm.guestName}</li>
                        <button onClick={(e) => guestDelete(e, elm.guestName)}>
                          x
                        </button>
                      </>
                    );
                  }
                })}
              </ul>
            </div>
          </div>
          <button type="submit" onClick={handleEdit}>
            Edit event
          </button>
        </form>
      </div>
}
    </>
  );
}

export default EditEvent;
