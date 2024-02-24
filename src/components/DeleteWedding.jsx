import { useNavigate } from "react-router-dom";
import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL;


function DeleteWedding(props) {

    const navigate = useNavigate();

const handleDelete = (e) => {
       e.preventDefault()
    axios.delete(`${API_URL}/weddings/${props.weddingId}`)
    .then(() => {
        navigate("/events")
    })
    .catch((err) => console.log("This is the .catch()", err))
}

 return (
    <button onClick={handleDelete}>Delete wedding</button>
 )

}

export default DeleteWedding