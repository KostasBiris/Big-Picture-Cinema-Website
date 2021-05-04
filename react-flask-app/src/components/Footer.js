import React, { Component } from 'react';



//Modular footer component
class Footer extends Component {
    render() {
        return (
            <div>
                <footer className="bg-light text-center">
                    <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
                        All rights reserved. © 2021 Copyright:
                            <a className="text-dark" >The Big Picture</a>
                    </div>
                </footer>
            </div>
        );
    }
}

export default Footer;



