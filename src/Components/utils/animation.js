import ReactCSSTransitionGroup from 'react-transition-group'

export const FadeIn = ({ children }) => {
  const translateStyle = {
    entering: { opacity: 1 },
    entered: { opacity: 1 },
    exiting: { opacity: 0 },
    exited: { opacity: 0 },
  }
  return <ReactCSSTransitionGroup>{children}</ReactCSSTransitionGroup>
}

export const FadeOut = ({ children }) => {
  return <ReactCSSTransitionGroup>{children}</ReactCSSTransitionGroup>
}
export const TranslateLeft = ({ children }) => {
  return <ReactCSSTransitionGroup>{children}</ReactCSSTransitionGroup>
}
export const TranslateRight = ({ children }) => {
  return <ReactCSSTransitionGroup>{children}</ReactCSSTransitionGroup>
}
