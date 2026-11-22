import { useEffect, useState } from 'react';
import type { Image } from './types'
import type { ImageData } from './types'
import MemoryCard from "./components/MemoryCard"
import './App.css'

function App() {
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [order, setOrder] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  const [images, setImages] = useState<Image[] | null>(null);
  const baseURL = "https://api.giphy.com/v1/gifs/";
  const key = "hVenCOkfAfw2LAQxxZBZKUDHaN0M1VDR";

  useEffect(() => {
    let ignore = false;

    async function loadImage(id: string)
    {
      try {
        let response = await fetch(`${baseURL}${id}?api_key=${key}`);
        if (!response.ok) throw new Error("Error loading images");
        const temp = await response.json();
        return temp.data.images.original_still.url;
      } catch (error) {
        console.log(error);
      }
    }
    
    async function loadImageData(){
      try {
        let response = await fetch("/images.json")
        if (!response.ok){
          throw new Error("Error loading data");
        }
        if (!ignore){
          const temp: ImageData = await response.json();
          console.log(temp);
          for (let i = 0; i < temp.images.length; i++){
            temp.images[i].url = await loadImage(temp.images[i].id);
            console.log("image url: " + temp.images[i].url);
          } 
          console.log(temp.images);
          setImages(temp.images);
        }
      } catch (error) {
        console.log(error);
      }
    }

    loadImageData();

    return () => { 
      ignore = true; 
    }

  }, []);

  // generates a new order and returns the array of the new order of indices
  function newRandomOrder(){
    let newArr: number[] = [];
    let i = 0;
    while (i < 10) {
      let num = Math.floor(Math.random() * 10);
      if (!newArr.includes(num)){
        newArr.push(num);
        i++;
      }
    }
    return newArr;
  }

  // when a memord is clicked, increase score or reset game and update highest score
  const handleClick = (image: Image) => {
    if (images){
      if (!image.wasClicked){
        setImages(images.map((img)=>{
            if (img.name === image.name){
              return {
                ...img,
                wasClicked: true
              }
            }
          return img; 
        }));
        setScore(score+1);
        setOrder(newRandomOrder());
        console.log(order);
        console.log("image wasn't clicked");
      }
      else {
        if (score > bestScore){
          setBestScore(score);
        }
        setScore(0);
        setOrder(newRandomOrder());
          let resetImages = images.map((image) => {
            return {
              ...image,
              wasClicked: false
            }
          })
          setImages(resetImages);
          console.log(order);
          console.log("image was clicked");
      }
    }
  };


  return (
    <>
    {!images ? <p>error loading</p> :
      <>
      <h3>Score: {score}</h3>
      <h3>Best Score: {bestScore}</h3>
      <div className='mem-card-container'>
        {order.map((index) =>  
            <MemoryCard key = {images[index].name} name = {images[index].name} url = {images[index].url} onClick={() => handleClick(images[index])} /> 
        )};
      </div>
      </>
    }
    </>
  )
}

export default App
