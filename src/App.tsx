import { useState } from 'react'
import type { Image } from './types'
import MemoryCard from "./components/MemoryCard"
import './App.css'

function App() {
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [order, setOrder] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  const [images, setImages] = useState([
    {name: "card0",
      wasClicked: false
    },
    {name: "card1",
      wasClicked: false
    },
    {name: "card2",
      wasClicked: false
    },
    {name: "card3",
      wasClicked: false
    },
    {name: "card4",
      wasClicked: false
    },
    {name: "card5",
      wasClicked: false
    },
    {name: "card6",
      wasClicked: false
    },
    {name: "card7",
      wasClicked: false
    },
    {name: "card8",
      wasClicked: false
    },
    {name: "card9",
      wasClicked: false
    },
    {name: "card10",
      wasClicked: false
    }
  ]);

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
    console.log("handleClick");
    if (!image.wasClicked){
      image.wasClicked = true;
      setScore(score+1);
      setOrder(newRandomOrder());
    }
    else {
      if (score > bestScore){
        setBestScore(score);
        setScore(0);
        setOrder(newRandomOrder());
        let resetImages = images.map((image) => {
          return {
            ...image,
            wasClicked: false
          }
        })
        setImages(resetImages);
      }
    }
  };


  return (
    <>
      <h3>Score: {score}</h3>
      <h3>Best Score: {bestScore}</h3>
      {order.map((index) => 
        <MemoryCard key = {images[index].name} name = {images[index].name} onClick={() => handleClick(images[index])} />
      )};
    </>
  )
}

export default App
