

import troll from '../images/Troll-Face.svg'


function Navbar () {
    return (
        <nav className='navbar'>
            <div className='logo'>
                <img src={troll}/>
                <h3>Meme Generator</h3>
            </div>
            
            <h3>Mesho254 Memes Project</h3>
        </nav>
    )
}

export default Navbar