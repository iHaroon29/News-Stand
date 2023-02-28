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
