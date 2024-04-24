import Form from "./Components/Form";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Toaster } from 'react-hot-toast';

function App({ children }) {
  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        {children}
        <Form />
        <Toaster />
      </LocalizationProvider>
      
    </div>
  );
}

export default App;
