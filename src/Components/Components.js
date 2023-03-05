import { useEffect, useState } from 'react'
import styled from 'styled-components'

export const Button = styled.button`
  background-color: ${(props) => (props.primary ? '#5da83a' : 'white')};
  color: ${(props) => (props.primary ? 'white' : '#282828')};
  width: ${(props) => (props.primary ? '30%' : '100%')};
  padding: ${(props) => (props.primary ? '10px' : '5px')};
  margin: ${(props) => (props.primary ? '10px auto 0px auto' : '')};
  border-radius: 2px;
  transition: 0.5s ease;
  &:hover {
    box-shadow: 0px 0px 1px grey;
    background: white;
    color: #282828;
  }
`
export const OverlayWrapper = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  background-color: rgba(0, 0, 0, ${(props) => props.saturation});
  position: absolute;
  z-index: ${(props) => props.zIndex};
`

const LoadingWrapper = styled.div`
  width: 200px;
  height: 200px;
  position: absolute;
  z-index: 4;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  background-color: white;
  .loading-span {
    display: block;
    width: 30px;
    height: 30px;
    transition: 0.5s ease;
    animation: rotate 1s infinite;
    align-self: center;
    margin: 10px;
  }
  .cross-span > span {
    display: block;
    width: 3px;
    height: 100%;
    background: green;
  }
  .cross-left {
    transform-origin: top left;
    transform: rotate(-45deg);
    translate: 3px 5px;
  }
  .cross-right {
    transform-origin: top left;
    transform: rotate(-135deg);
    translate: 5px -3px;
  }
  .square-span {
    background: red;
  }
  .triangle-span {
    background: blue;
    clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
  }
  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(359deg);
    }
  }
`
export const Loading = () => {
  return (
    <LoadingWrapper>
      <div className='cross-span loading-span'>
        <span className='cross-left'></span>
        <span className='cross-right'></span>
      </div>
      <span className='square-span loading-span'></span>
      <span className='triangle-span loading-span'></span>
    </LoadingWrapper>
  )
}

const TypeWriterWrapper = styled.div`
  width: ${(props) => props.width};
  min-height: ${(props) => props.height};
  color: ${(props) => props.color};

  p {
    font-size: ${(props) => props.size};
    font-family: 'Playfair', serif;
    font-style: ${(props) => (props.italics ? 'italic' : '')};
    text-decoration: ${(props) => (props.underline ? 'underline' : 'none')};
  }
`

export const TypeWriter = (props) => {
  const {
    text,
    width,
    height,
    color,
    size,
    family,
    loop,
    duration,
    italics,
    underline,
    background,
  } = props
  const [blink, setBlink] = useState(true)
  const [reverse, setReverse] = useState(false)
  const [index, setIndex] = useState(0)
  const [subIndex, setSubIndex] = useState(0)

  useEffect(() => {
    if (subIndex === text[index].length + 1 && !reverse) {
      setReverse(true)
      return
    }
    if (reverse && subIndex === 0 && index !== text.length - 1) {
      setReverse(false)
      setIndex((prev) => prev + 1)
      return
    }
    if (!loop) {
      if (index === text.length - 1 && subIndex === text[index].length) {
        return
      }
    } else {
      if (index === text.length - 1 && reverse && subIndex === 0) {
        setIndex(0)
        setReverse(false)
      }
    }
    const test = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1))
    }, Math.max(reverse ? duration : subIndex === text[index].length ? 500 : 10, parseInt(Math.random() * 70)))
    return () => clearInterval(test)
  }, [subIndex, text, reverse, index, loop, duration])

  useEffect(() => {
    const timeout2 = setTimeout(() => {
      setBlink((prev) => !prev)
    }, 500)
    return () => clearTimeout(timeout2)
  }, [blink])
  return (
    <TypeWriterWrapper
      width={width}
      height={height}
      color={color}
      family={family}
      size={size}
      italics={italics}
      underline={underline}
      background={background}
    >
      <p>
        {text[index].substring(0, subIndex)}
        {blink ? '|' : ''}
      </p>
    </TypeWriterWrapper>
  )
}
