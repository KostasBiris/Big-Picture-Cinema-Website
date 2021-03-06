import React from 'react'


class MoviePage extends React.Component {
    constructor(props) {
        super(props);
        this.title = props.match.params.title;
        
        //this.componentDidMount = this.componentDidMount.bind(this);
        this.getData = this.getData.bind(this);
        //this.getData();
        this.state = {data: []};
        this.getData();
    }

    getData = () => {
    var fet = '/movie/' + this.title + '/page';
    fetch (fet, {
        method: 'POST' ,
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({movie: this.title})})
        .then(response => response.json()).then(data => {
        this.setState({data :data})});
    }
    

    render() {
        return (
            
            <div>
                Movie Name: {this.state.data.name}<br/>
                Blurb: {this.state.data.blurb}<br/>
                Director: {this.state.data.director}<br/>
                Lead Actors: {this.state.data.leadactors}<br/>
                Release Date: {this.state.data.releasedate}<br/>
                Certificate: {this.state.data.certificate}<br/>    
                
            </div>
        )
    }
}



export default MoviePage;