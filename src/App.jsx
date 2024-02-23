import { Routes, Route } from 'react-router-dom'
import LoginPage from './Pages/LoginPage'
import HomePage from './Pages/HomePage'
import Events from "./Pages/Events"
import EventDetails from "./Pages/EventDetails"
import NewEvent from './Pages/NewEvent'
import SignupPage from './Pages/SignupPage'
import EditEvent from './Pages/EditEvent'
import Queries from './Pages/Queries'
import "./index.css"
import Navbar from './components/Navbar'

function App() {

  return (
    <>
    <Navbar/>
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/signup" element={<SignupPage/>}/>
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/events" element={<Events/>}/>
      <Route path="/queries" element={<Queries/>}/>
      <Route path="/events/:eventId" element={<EventDetails/>}/>
      <Route path="/events/:eventId/edit" element={<EditEvent/>}/>
      <Route path="/events/new" element={<NewEvent/>}/>
    </Routes>
    </>
  );
}

export default App;
