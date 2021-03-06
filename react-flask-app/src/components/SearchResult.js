import React from 'react';


 
class SearchResult extends React.Component{
    constructor(props) {
        super(props);
        this.prop = this.props.res;
        this.name = this.prop.name.split(' ').join('_');
        this.href = '/movie/' + this.name;
    }
    render () {
        return (
            <>
            <div onClick={this.handleOnClick}>
                <a href={this.href}>Movie Name: {this.prop.name}<br/>
                Blurb: {this.prop.blurb}<br/>
                Director: {this.prop.director}<br/>
                Lead Actors: {this.prop.leadactors}<br/>
                Release Date: {this.prop.releasedate}<br/>
                Certificate: {this.prop.certificate}<br/>
                </a>
            </div>
        </>
        )
    }

}



export default SearchResult;
