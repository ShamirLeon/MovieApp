import Link from 'next/link'

const imgURL = 'https://www.hollywoodreporter.com/wp-content/uploads/2014/09/interstellar_poster_0.jpg?w=3000';
const img2 = 'https://i.ytimg.com/vi/V_PBWtV1kRI/maxresdefault.jpg';
const img3 = 'https://akns-images.eonline.com/eol_images/Entire_Site/2015617/rs_1024x759-150717071700-1024-leonardo-dicaprio-Revenant_.ls.71715_copy.jpg?fit=around%7C1024:759&output-quality=90&crop=1024:759;center,top';

export default function MainContent() {
    return (
        <div className='MainContent'>
            <div className='MainContent__Section MainContent__Section--First' >
                <img src={imgURL} alt="" className='MainContent__Image' />
                <Link href={'/'}>Insterstellar</Link>
                <p>
                &quot Interstellar &quot is a science fiction movie that follows a group of astronauts on a desperate mission to find a new home for humanity in space due to Earth&aposs environmental crisis.
                </p>
                <div className='MainContent__Categories'>
                    <span>Sci-Fi</span>
                    <span>Drama</span>
                    <span>Adventure</span>
                </div>
                <div className='superposition'></div>
            </div>
            <div className='MainContent__Section MainContent__Section--Second SecondSection'>
            <img src={img2} alt="" className='MainContent__Image' />
                <Link href={'/'} >Oblivion</Link>
                <p>2013, Adventure</p>
                <div className='superposition'></div>
            </div>
            <div className='MainContent__Section MainContent__Section--Third SecondSection'>
            <img src={img3} alt="" className='MainContent__Image' />
                <Link href={'/'} >Revenant</Link>
                <p>2013, Adventure</p>
                <div className='superposition'></div>
            </div>
        </div>
    )
}