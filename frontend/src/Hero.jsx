import React from 'react'
import { Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const Hero = () => {
  return (
    <>
    <LinkContainer to='/trackYourWorkout'>
    <Button>Track Your workout</Button>
    </LinkContainer>
    </>
  )
}

export default Hero