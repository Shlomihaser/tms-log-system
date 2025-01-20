import Navbar from './components/Navbar';
import MainSection from './components/MainSection';
import { Toaster } from 'react-hot-toast';

import './index.css';

export default function App() {
  return (<div>
    <Navbar/>

    <MainSection/>

    <Toaster/> {/* Active Toasts */}
  </div>)
}