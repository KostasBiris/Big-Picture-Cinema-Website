import React from 'react';


var publicIP = require('public-ip')


class CustomerAccountPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {data: [], auth: false}
        this.stepUp = this.stepUp.bind(this);
        this.stepUp();
    }

    stepUp = async () => {
        await (async () => {
            this.setState({IP: await publicIP.v4()})
        })();
        this.assertAuth();
        this.forceUpdate();

    }

    componentDidMount() {
        window.addEventListener('load', this.stepUp);
    }


    componentWillUnmount() {
        window.removeEventListener('load', this.stepUp)
    }

    assertAuth = () => {
        var go = '/insession/' + this.state.IP;
        fetch(go, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ data: this.IP })
        })
            .then(response => response.json()).then(data => {
                this.setState({ auth: true , data: data.response})})
    };



    render() {
        return (
            <div>
                id: {this.state.data.id} <br />
                Forename: {this.state.data.forename}<br />
                Surname: {this.state.data.surname}<br />
                Email: {this.state.data.email}<br />
                Phone Number: {this.state.data.phone}<br />
                DoB: {this.state.data.dob}<br />
            </div>
    );
    }
}


export default CustomerAccountPage;

