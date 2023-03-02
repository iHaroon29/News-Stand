import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import image from '../Assets/6325257.jpg'
import { TypeWriter, Button } from './Components'
import audioPath from '../Assets/test.mp3'
import gifPath from '../Assets/cast.gif'
const PageWrapper = styled.div`
  width: 100%;
  height: 100vh;
  background: #81b29a;
  display: flex;
  .card-holder {
    width: 75%;
    height: 75%;
    background: white;
    margin: auto;
    display: flex;
    padding: 10px;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 4px 2px 0px;
    justify-content: space-evenly;
  }
  .page-image-holder {
    width: 40%;
    height: 70%;
    background: url(${image});
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
    margin: auto;
  }
  .page-content-holder {
    text-align: center;
    width: 40%;
    height: 70%;
    margin: auto;
    padding: 20px;
    box-shadow: 0px 2px 4px 1px #0000004b;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    .landing-heading {
      border-bottom: 3px solid #282828;
      font-family: 'Roboto';
      font-style: normal;
      font-weight: 700;
      font-size: 50px;
      line-height: 59px;
      margin: 30px auto;
      margin-bottom: 10px;
    }
    .landing-p1 {
      margin: 20px auto;
      margin-bottom: 10px;
    }
    .landing-p2 {
      margin: 20px auto;
      margin-bottom: 10px;
      .landing-p2-value {
        font-weight: 1000;
      }
    }
  }
`
const Page = () => {
  const [cheat, setCheat] = useState([])
  const [showCheat, setShowCheat] = useState(false)
  const [audio] = useState(new Audio(audioPath))
  if (showCheat) {
    setTimeout(() => {
      setShowCheat(false)
    }, 11500)
  }
  useEffect(() => {
    const sequence = [
      'ArrowUp',
      'ArrowUp',
      'ArrowDown',
      'ArrowDown',
      'ArrowLeft',
      'ArrowRight',
      'ArrowLeft',
      'ArrowRight',
      'b',
      'a',
    ]
    const test = (e) => {
      if (cheat.length < sequence.length) {
        setCheat((prev) => [...prev, e.key])
      } else {
        const test = cheat.every((node, index) => sequence[index] === node)
        if (test) {
          setShowCheat(true)
        }
        setCheat([])
      }
    }
    if (showCheat) {
      audio.play()
    } else {
      audio.pause()
      audio.currentTime = 0
    }
    document.addEventListener('keydown', test)
    return () => {
      document.removeEventListener('keydown', test)
    }
  }, [cheat, audio, showCheat])
  return (
    <PageWrapper>
      <div className='card-holder'>
        <div className='page-image-holder'></div>
        <div className='page-content-holder'>
          <h2 className='landing-heading'>Uh ohh!</h2>
          <p className='landing-p1'>
            We couldn't find the page you were looking for :(
          </p>
          <p className='landing-p2'>
            But <span className='landing-p2-value'>did you know?</span>
          </p>
          <TypeWriter
            width='100%'
            height='110px'
            text={[
              '"Pac-Man was invented by the designer Toru Iwatani while he was eating pizza."',
              '"Try Up Up Down Down Left Right Left Right b a enter"',
              '"If you play Rise of the Tomb Raider on February 14, a special message pops up."',
            ]}
            loop={true}
            duration={100}
            size='25px'
            underline={true}
          />
          <Button primary={true}>Back Home?</Button>
        </div>
      </div>
    </PageWrapper>
  )
}

export default Page
