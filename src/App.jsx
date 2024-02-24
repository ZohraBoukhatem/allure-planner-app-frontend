import { Routes, Route } from 'react-router-dom'
import LoginPage from './Pages/LoginPage'
import HomePage from './Pages/HomePage'
import Events from "./Pages/Events"
import WeddingDetails from "./Pages/WeddingDetails"
import SignupPage from './Pages/SignupPage'
import EditWedding from './Pages/EditWedding'
import Queries from './Pages/Queries'
import "./index.css"
import Navbar from './components/Navbar'
import NewWedding from './Pages/NewWedding'

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
      <Route path="/weddings/:weddingId" element={<WeddingDetails/>}/>
      <Route path="/weddings/:weddingId/edit" element={<EditWedding/>}/>
      <Route path="/weddings/new" element={<NewWedding/>}/>
    </Routes>
    </>
  );
}

export default App;
