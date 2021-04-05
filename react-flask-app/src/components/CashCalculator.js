import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// loadStripe is initialized with your real test publishable API key.
const promise = loadStripe("pk_test_51ISQ7OC2YcxFx25TvsWtOhWiQkKfYOA0dawMWGSqF7xKTiFz3lnHp1Q34Ike3DUP4JUUg14Bzn3MxUtl1CIcSjpa00SZjsWNg9");
var publicIP = require('public-ip')

let interval;
class KeyPad extends React.Component {

    constructor(props) {
        super(props);
    }


    render() {
       // console.log(this.state)
        return (

            <Container>
                <Row>
                    <Col><Button name="7" className="btn-block" onClick={e => this.props.onClick(e.target.name)}>7</Button></Col>
                    <Col><Button name="8" className="btn-block" onClick={e => this.props.onClick(e.target.name)}>8</Button></Col>
                    <Col><Button name="9" className="btn-block" onClick={e => this.props.onClick(e.target.name)}>9</Button></Col>
                </Row>
                <Row>
                    <Col><Button name="4" className="btn-block" onClick={e => this.props.onClick(e.target.name)} >4</Button></Col>
                    <Col><Button name="5" className="btn-block" onClick={e => this.props.onClick(e.target.name)}>5</Button></Col>
                    <Col><Button name="6" className="btn-block" onClick={e => this.props.onClick(e.target.name)}>6</Button></Col>
                </Row>
                <Row>
                    <Col><Button name="1" className="btn-block" onClick={e => this.props.onClick(e.target.name)}>1</Button></Col>
                    <Col><Button name="2" className="btn-block" onClick={e => this.props.onClick(e.target.name)}>2</Button></Col>
                    <Col><Button name="3" className="btn-block" onClick={e => this.props.onClick(e.target.name)}>3</Button></Col>
                </Row>
                <Row>
                    <Col></Col>
                    <Col><Button name="0" className="btn-block" onClick={e => this.props.onClick(e.target.name)}>0</Button></Col>
                    <Col></Col>
                </Row>
                <Row>
                    <Col><Button name="Delete" className="btn-block" onClick={e => this.props.onClick(e.target.name)}>Delete</Button></Col>
                    <Col><Button name="." className="btn-block" onClick={e => this.props.onClick(e.target.name)}>.</Button></Col>
                    <Col><Button name="Enter" className="btn-block" onClick={e => this.props.onClick(e.target.name)}>Enter</Button></Col>
                </Row>
            </Container>


        );

    }
    }

export default KeyPad;
