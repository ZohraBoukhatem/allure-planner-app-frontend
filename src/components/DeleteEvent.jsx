import { useNavigate } from "react-router-dom";
import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL;


function DeleteEvent(props) {

    const navigate = useNavigate();

const handleDelete = (e) => {
       e.preventDefault()
console.log(props.eventId)
    axios.delete(`${API_URL}/events/${props.eventId}`)
    .then(() => {
        navigate("/events")
    })
    .catch((err) => console.log("This is the .catch()", err))
}

 return (
    <button onClick={handleDelete}>Delete event</button>
 )

}

export default DeleteEvent