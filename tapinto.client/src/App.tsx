import { Outlet } from 'react-router-dom';
import './App.css';
import NavigationBar from './app/navbar/NavigationBar';
import { Container } from 'react-bootstrap';

function App() {
    return (
        <>
            <NavigationBar />
            <Container >
                <Outlet />
            </Container>
        </>
    )
}

export default App;