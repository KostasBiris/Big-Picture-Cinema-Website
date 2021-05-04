import { useState } from 'react' 


//Functional component
const SearchForm = ({onGetMovie}) => {
    const [movie, setMovie] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();

        if(!movie) {
            alert('Please add movie')
        }

        onGetMovie(movie)

        setMovie('')
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <label>
                    Name: 
                    <input type="text" placeholder="Movie Name" value={movie} 
                    onChange={(e) => setMovie(e.target.value)} />
                    <input type="submit" value='Search'></input>
                </label>
            </form>
        </div>
    )
}

export default SearchForm
