import { saveAs } from 'file-saver'
import { useState, useEffect } from 'react'
import memesData from "../data/memesData"
// import { saveAs } from 'file-saver'
import {toBlob} from 'html-to-image'




function Meme () {
    const [meme, setMeme] = useState({
        topText: "",
        bottomText: "",
        randomImage: "http://i.imgflip.com/1bij.jpg"
    })

    
    const [allMemes, setAllMemes] = useState([])

    // get image from api and set state to the data
    useEffect(() => {
        fetch('https://api.imgflip.com/get_memes')
            .then(res => res.json())
            .then(data => setAllMemes(data.data.memes))
    }, [])

    
    function getMemeImage () {
        const randomIndex = Math.floor(Math.random() * allMemes.length);
        const url = allMemes[randomIndex].url

        setMeme(prevMeme => ({
            ...prevMeme,
            randomImage: url
        }))
    }

    function handleChange(event) {
        const {name, value} = event.target
        setMeme(prevMeme => ({
            ...prevMeme,
            [name]: value
        }))
    }

    const handleSave = async()=> {
        // const memeContainer = document.getElementById('meme-container');
        // const dataUrl = await toBlob(memeContainer);
        // const blob = await fetch(dataUrl).then((res) => res.blob());
        // saveAs(blob, "meme.png");
        const canvas = document.createElement("canvas");
        canvas.width = 500;
        canvas.height = 500;
        const ctx = canvas.getContext("2d");
        const img = new Image();
        img.crossOrigin = "anonymous"; // Required for CORS policy
        img.src = meme.randomImage;
        img.onload = function () {
          ctx.drawImage(img, 0, 0, 500, 500);
          ctx.font = "36px Impact";
          ctx.textAlign = "center";
          ctx.fillStyle = "white";
          ctx.strokeStyle = "black";
          ctx.lineWidth = 2;
          ctx.fillText(meme.topText, 250, 50);
          ctx.strokeText(meme.topText, 250, 50);
          ctx.fillText(meme.bottomText, 250, 450);
          ctx.strokeText(meme.bottomText, 250, 450);
      
          // Convert canvas to a data URL
          const dataURL = canvas.toDataURL("image/png");
      
          // Save the meme to local storage
          const newMeme = {
            topText: meme.topText,
            bottomText: meme.bottomText,
            image: dataURL,
          };
          const savedMemes = JSON.parse(localStorage.getItem("savedMemes")) || [];
          savedMemes.push(newMeme);
          localStorage.setItem("savedMemes", JSON.stringify(savedMemes));
      
          // Prompt user to download the image file
          const link = document.createElement("a");
          link.download = "meme.png";
          link.href = dataURL;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
    }
}
    return (
        <main>
            <section>
                <label>
                    <input 
                        type="text" 
                        placeholder="Top text"
                        name='topText'
                        onChange={handleChange}
                    />
                    <input 
                        type="text" 
                        placeholder="Bottom text"
                        name='bottomText'
                        onChange={handleChange}
                    />
                </label>
                <button 
                    onClick={getMemeImage} 
                    type="submit"
                >
                    Get a new meme image 🖼
                </button>
            </section>

            <div className='meme' id='meme-container'>
                <img src={meme.randomImage}/>
                <h2 className='top meme-text'>{meme.topText}</h2>
                <h2 className='bottom meme-text'>{meme.bottomText}</h2>
            </div>
            <button onClick={handleSave}>Save</button>
        </main>
    )
}

export default Meme;