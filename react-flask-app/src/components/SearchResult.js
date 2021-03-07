import React from 'react';


 
//Component for displaying a search result.
class SearchResult extends React.Component{
    constructor(props) {
        super(props);

        this.prop = this.props.res;
        //Replace spaces in the name with '_' so we can use it in the URL.
        this.name = this.prop.name.split(' ').join('_');
        //URL for redirection.
        this.href = '/movie/' + this.name;
    }
    render () {
        return (
            <>
            <div>
                <a href={this.href}>
                Movie Name: {this.prop.name}<br/>
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
