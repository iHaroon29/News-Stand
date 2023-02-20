import React from 'react'

class Timer extends React.Component {
  constructor(props) {
    super(props)
    this.state = { date: new Date(), isStopped: true }
  }
  tick() {
    this.setState({ date: new Date() })
  }
  componentDidMount() {
    if (this.props.continous) {
      this.setState((prevState) => ({ isStopped: !prevState.isStopped }))
      this.timeId = setInterval(() => {
        this.tick()
      }, 1000)
    }
  }
  componentWillUnmount() {
    this.setState((prevState) => ({ isStopped: !prevState.isStopped }))
    clearInterval(this.timeId)
  }

  render() {
    console.log(this.props)
    console.log(this.statemnṁ)
    return (
      <div className='timer'>
        <p>
          Current Time is{' '}
          <span className='timer-value-holder'>
            {this.state.date.toLocaleTimeString()}
          </span>
        </p>
      </div>
    )
  }
}

export default Timer
