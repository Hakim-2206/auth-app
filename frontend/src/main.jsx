import {StrictMode} from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from "react-router";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


ReactDOM.createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <App/>
            <ToastContainer autoClose={2000}/>
        </BrowserRouter>
    </StrictMode>,
)
