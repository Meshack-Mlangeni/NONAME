import { Outlet } from 'react-router-dom';
import './App.css';
import NavigationBar from './app/navbar/NavigationBar';
import { Container } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    
    return (
        <>
            <NavigationBar />
            <ToastContainer position='bottom-right' hideProgressBar theme='colored' />
            <Container>
                <Outlet />
            </Container>
        </>
    )
}

export default App;