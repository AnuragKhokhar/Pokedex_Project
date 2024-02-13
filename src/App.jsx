import './App.css'
import Pokedex from './components/Pokedex/Pokedex'
import CustomRoutes from './routes/CustomRoutes'
import { Link } from 'react-router-dom'

function App() {
  return (
    <>
    <div className='outer-pokedex'>
      <Link to="./" >
        <div className='pokwrp'>
         <img className='pokeball' src="./pokeball.png" alt='Pokemon'/>  <h1 id="pokedex-heading" >Pokedex</h1>
         </div>
      </Link>
      <CustomRoutes/>
    </div>
    </>
  )
}

export default App
