import { CSSTransition } from 'react-transition-group'

export const FadeIn = ({ children, state, timeout, className, nodeRef }) => {
  const translateStyle = {
    entering: { opacity: 1 },
    entered: { opacity: 1 },
    exiting: { opacity: 0 },
    exited: { opacity: 0 },
  }
  return (
    <CSSTransition
      in={state}
      timeout={timeout}
      classNames={className}
      nodeRef={nodeRef}
    >
      {children}
    </CSSTransition>
  )
}

// export const FadeOut = ({ children }) => {
//   return <ReactCSSTransitionGroup>{children}</ReactCSSTransitionGroup>
// }
// export const TranslateLeft = ({ children }) => {
//   return <ReactCSSTransitionGroup>{children}</ReactCSSTransitionGroup>
// }
// export const TranslateRight = ({ children }) => {
//   return <ReactCSSTransitionGroup>{children}</ReactCSSTransitionGroup>
// }
