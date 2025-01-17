import { Toaster } from 'react-hot-toast'
import LogsTable from './components/Logs'
import Navbar from './components/Navbar'
import './index.css'

export default function App() {
  return (<div>
    <Navbar/>
    <LogsTable/>
    <Toaster/>
  </div>)
}