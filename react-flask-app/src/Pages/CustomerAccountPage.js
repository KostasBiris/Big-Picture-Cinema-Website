import React from 'react';


var publicIP = require('public-ip')


class CustomerAccountPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {data: [], auth: false}
        this.stepUp = this.stepUp.bind(this);
    }



    stepUp = async () => {
        await (async () => {
            this.setState({IP: await publicIP.v4()})
        })();
        this.assertAuth();
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
                this.setState({ auth: true , data: data})})
    };



    render() {
        return (
            <div>STUB!</div>
    );
    }
}


export default CustomerAccountPage;

