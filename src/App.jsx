import './App.css'
import CapaMain from './components/CapaMain/CapaMain'
import Lancamento from './components/Lancamento/Lancamento'
import Agenda from './components/Agenda/Agenda'
import Footer from './components/Footer/Footer'



function App() {

  return (
    
    <div className='md:px-28 font-Roboto '>
      <CapaMain />
      <Lancamento />
      <Agenda />
     
      <Footer />
    
     </div>
  )
}

export default App
