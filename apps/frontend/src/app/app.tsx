import HotelTable from './components/HotelTables/HotelTable';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function App() {
  return (
    <>
      <HotelTable />
      <ToastContainer />
    </>
  );
}
