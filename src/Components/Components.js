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
  transform: translate(-50%);
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
