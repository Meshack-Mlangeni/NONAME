import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Button } from 'react-bootstrap';

function App() {
    return (
        <>
            <h1>Hello world</h1>
            <Button>This is react-bootstrap button</Button>
            <Button variant='danger'>Testing name change</Button>
        </>
    )
}

export default App;