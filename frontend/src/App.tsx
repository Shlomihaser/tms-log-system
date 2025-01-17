import { Toaster } from 'react-hot-toast'
import LogsTable from './components/Logs'
import Navbar from './components/Navbar'
import './index.css'
import MainSection from './components/MainSection'

export default function App() {
  return (<div>
    <Navbar/>

    <MainSection/>

    <Toaster/> {/* Active Toasts */}
  </div>)
}