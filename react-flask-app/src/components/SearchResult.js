import React from 'react';


 
//Component for displaying a search result.
class SearchResult extends React.Component{
    constructor(props) {
        super(props);

        this.prop = this.props.res;
        //Replace spaces in the name with '_' so we can use it in the URL.
        this.name = this.prop.Title.split(' ').join('_');
        this.id = this.prop.imdbID
        //URL for redirection.
        this.href = '/movie/' + this.name + '/' + this.id;
    }


    render () {
        return (
            <>
            <div>
                <a  href={this.href}>
                <img src={this.prop.Poster} alt={this.prop.Title} width="200" height="200"></img><br />
                Movie Name: {this.prop.Title}<br/>
                Year: {this.prop.Year}<br/>
                </a>
            </div>
            
        </>
        )
    }

}



export default SearchResult;
