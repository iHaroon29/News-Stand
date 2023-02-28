import React, { useState } from 'react'
import styled from 'styled-components'
import { Button } from '../../Components'
import placeholderImage from '../../../Assets/placeholderprofile.jpg'
import { FaArrowDown, FaArrowUp } from 'react-icons/fa'
const content =
  'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolores quam, modi eveniet unde odio pariatur impedit blanditiis esse hic, dignissimos quisquam deserunt ex minima facilis dolorem sint accusantium tenetur fugiat.'
const CardWrapper = styled.div`
  width: ${(props) => props.width};
  min-height: 80%;
  height: 1px;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  background-color: white;
  position: absolute;
  box-shadow: 0px 0px 8px 1px #8080806f;
  top: 5%;
  left: 5%;

  .user-card-child {
    width: 100%;
    align-self: center;
    border-radius: 5px;
  }
  .show {
    height: 25%;
  }
  .hide {
    height: 0%;
  }
  .profile-holder {
    height: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .img-holder {
      background-image: url(${placeholderImage});
      background-repeat: no-repeat;
      background-size: cover;
      width: 100%;
      height: 100%;
      margin: auto;
    }
  }
  .profile-info-holder {
    height: 50%;
    padding: 10px;
  }
`
export const UserCard = (props) => {
  const [updateToggle, setUpdateToggle] = useState(false)
  return (
    <CardWrapper width='33.3%'>
      <div className='profile-holder user-card-child'>
        <div className='img-holder' style={{ backgroundImage: `` }}></div>
      </div>
      <div
        className={
          updateToggle
            ? 'profile-info-holder user-card-child'
            : 'profile-info-holder user-card-child'
        }
      >
        <h3>About</h3>
        <p>{updateToggle ? content.slice(0, 80) + '...' : content}</p>
        <Button onClick={(e) => setUpdateToggle((prev) => !prev)}>
          {updateToggle ? 'Expand' : 'Close'}
          <span>{updateToggle ? <FaArrowDown /> : <FaArrowUp />}</span>
        </Button>
      </div>
    </CardWrapper>
  )
}
