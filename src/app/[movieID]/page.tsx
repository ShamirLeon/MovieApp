export default function name({params}:any) {
    const {movieID} = params;

    return(
        <h2 style={{marginLeft:'220px'}}>Movie id {movieID}</h2>
    )
}

// TODO: get data from these endpoints 1. movies/details 2. movies/credits 3. movies/images 4. movies/similar
