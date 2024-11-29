import './App.css'
import Agenda from './components/Agenda/Agenda'
import CapaMain from './components/CapaMain/CapaMain'
import Footer from './components/Footer/Footer'
import Lancamento from './components/Lancamento/Lancamento'

function App() {

  return (
    <div className='md:px-28 font-Roboto overflow-hidden'>
      <CapaMain />
      <Lancamento />
      <Agenda />
      <Footer />
      
     </div>
  )
}

export default App
