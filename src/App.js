import logo from './logo.svg';
import './App.css';
import { DatePicker } from 'antd';
import Header from './components/Header';
import { Outlet } from 'react-router-dom';
import Footer from './components/home/Footer';

function App() {
  return (
    <div className='home-container'>
      <div className='header'>
        <Header />
      </div>
      <div className='home-content'>
        <Outlet />
      </div>
      <div className='footer'>
        <Footer />
      </div>
    </div>
  );
}

export default App;
