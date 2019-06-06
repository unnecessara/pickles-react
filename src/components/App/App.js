import {Container, Row} from 'react-bootstrap';
import React from 'react';
import './App.css';
import Pickles from '../Pickles/Pickles'

function App() {
	return (
        <div className="app">
            <Container>
                <Row className="app-header" />
                    <Pickles />
                <Row className="app-footer" />
            </Container>
        </div>
    );
}

export default App;
