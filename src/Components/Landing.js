import React, { useState } from 'react'
import { Notif } from './Notif'
import { OverlayWrapper } from './Components'
import Hamber from './Hamber'
import Onborading from './Onboarding'
import FooterToggle from './FooterToggle'
import About from './about'
import "../App.css";


const MainPage = () => {
  const [showAbout, setShowAbout] = useState(false);
  const [animate, setAnimate] = useState(false)

  const handleButtonClick = () => {
    console.log("Button clicked");
    setShowAbout(!showAbout);
    setAnimate(!animate);
    console.log(showAbout);
  };
  

  return (
      <div className="parent-container">
        <div
        className={!animate ? 'test uncurve' : 'test curve'}
        onClick={handleButtonClick}
      >
        <Hamber animate={animate} />
      </div>
        <Landing visible={showAbout} />
        <div className={`about-info ${showAbout ? "slide-in" : ""}`}>
          <div>About info</div>
        </div>
      </div>
  );
}

const Landing =(props) =>{
  var {visible} = props
  return(
    <div className={`landing-page ${visible ? "slide-out" : ""}`}>
      <div className='landing-page-image'>

      </div>
      <div className='landing-page-text'>
            lorem ipsum dolor sit amet, consectetur adipiscing elit. In tincidunt tempor eros, 
            ut consectetur libero dictum eu. Maecenas lacinia gravida dolor vel venenatis. Morbi 
            volutpat pellentesque nisi quis placerat. Donec rutrum nulla ac lectus iaculis laoreet. 
            Proin viverra cursus ligula nec tristique. In porta sagittis porttitor. In consequat porta suscipit.
      </div>
    </div>
  )
}
// const Landing = (props) =>{
//   const {visible} = props
//   return(
//     <div className={`landing-page ${visible ? "slide-out" : ""}`}>
//       <div className='image-block'>

//       </div>
//       <div className='text-block'>

//       </div>
//     </div>
//   )
// }

// const About = (props) =>{
//   const {visible} = props
//   return (
//     <div className={`about-info ${visible ? "slide-in" : ""}`}>

//     </div>
//   )
// }

export default MainPage;

