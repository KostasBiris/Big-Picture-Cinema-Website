import React from 'react';


 
//Component for displaying a search result.
class SearchResult extends React.Component{
    constructor(props) {
        super(props);

        this.prop = this.props.res;
        //Replace spaces in the name with '_' so we can use it in the URL.
        this.name = this.prop.original_title.split(' ').join('_');
        // get the ID of the movie
        this.id = this.prop.id
        this.image = 'https://image.tmdb.org/t/p/w500/' + this.prop.poster_path
        //URL for redirection.
        this.href = '/movie/' + this.name + '/' + this.id;
    }


    render () {
        return (
            <>
            <div>
                <a  href={this.href}>
                <img src={this.image} alt={this.prop.original_title} width="200" height="200"></img><br />
                Movie Name: {this.prop.Title}<br/>
                Year: {this.prop.Year}<br/>
                </a>
            </div>
            
        </>
        )
    }

}



export default SearchResult;
