import "./Events.css";
import Weddings from "../components/Weddings";
import WorkShop from "../components/WorkShop";
import OtherEvents from "../components/OtherEvents";
import { useState } from "react";

function Events() {
  const [content, setContent] = useState("weddings")
  
  
  return (
    <>
    <button onClick={() => {setContent("weddings")}}>Weddings</button>
    <button onClick={() => {setContent("workshop")}}>Workshop</button>
    <button onClick={() => {setContent("other")}}>OtherEvents</button>
  {content === "weddings" && <Weddings/>}
  {content === "workshop" && <WorkShop />}
  {content === "other" && <OtherEvents />}
    </>
  )
}
export default Events;
