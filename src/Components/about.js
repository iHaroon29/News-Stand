import React, { useState } from 'react'
import { Button } from './Components'
import styled from 'styled-components'
import image from '../Assets/3125988.jpg'
const Container = styled.div`
display: flex;
justify-content: center;
align-items: center;
`
const AboutBox = styled.div`
width: 48%;
height: 200px;
overflow:hidden;
`
const About = (props) =>{
    const { visible } = props
    return(
        <div className={
            visible ? 'visible onboarding-wrapper' : 'no-visible onboarding-wrapper'
          }>
            <Content className=''/>
        </div>
    )
}
const Content = ()=>{
    return(
        <Container>
            <AboutBox className='left'> Image goes here</AboutBox>
            <AboutBox className='right'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tincidunt tempor eros, 
            ut consectetur libero dictum eu. Maecenas lacinia gravida dolor vel venenatis. Morbi 
            volutpat pellentesque nisi quis placerat. Donec rutrum nulla ac lectus iaculis laoreet. 
            Proin viverra cursus ligula nec tristique. In porta sagittis porttitor. In consequat porta suscipit.
            </AboutBox>
        </Container>
    )
}
export default About