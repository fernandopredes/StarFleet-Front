import styled from 'styled-components';
import bg from '../assets/full.jpg'

const Space = styled.div`


body:before{
  content: "";
  display: inline-block;
  height: 100%;
  vertical-align: middle;
}
.container{
  position: absolute;
    top: 50%;
    left: 50%;
  display: inline-block;
  vertical-align: middle;
  perspective: 5px;
  perspective-origin: 50% 50%;
}

.wrapper{
  position: absolute;
  width: 1000px;
  height: 1000px;
  top: -500px;
  left: -500px;
  transform-style: preserve-3d;
  animation-fill-mode: forwards;
  animation: move 12s infinite linear;
}

.wrapper:nth-child(2){
  animation: move 12s infinite linear;
  animation-delay: 6s;
}

.side{
  background-image: url(${bg});
  background-size: cover;
}
.side{
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
  animation-delay: 0;
  animation: fade 12s infinite linear;
}

.wrapper:nth-child(2) .side{
  animation-delay: 6s;
}

.side-right{
  transform: rotateY(90deg) translateZ(500px);
}

.side-left{
  transform: rotateY(-90deg) translateZ(500px);
}

.side-top{
  transform: rotateX(90deg) translateZ(500px);
}

.side-bottom{
  transform: rotateX(-90deg) translateZ(500px);
}
.side-back{
  transform: rotateX(180deg) translateZ(500px);
}

@keyframes move{
  0%{
    transform: translateZ(-500px) rotate(0deg) ;
  }
  100%{
    transform: translateZ(500px) rotate(0deg) ;
  }
}
@keyframes fade{
  0%{
    opacity: 0;
  }
  25%{
    opacity: 1;
  }
  50%{
    opacity: 1;
  }
  100%{
    opacity: 0;
  }
}
`

const SpaceJump = () => {
  return (
    <Space>
      <div className="container">
        <div className="wrapper">
          <div className="side side-right"></div>
          <div className="side side-left"></div>
          <div className="side side-top"></div>
          <div className="side side-bottom"></div>
          <div className="side side-back"></div>
        </div>

        <div className="wrapper">
          <div className="side side-right"></div>
          <div className="side side-left"></div>
          <div className="side side-top"></div>
          <div className="side side-bottom"></div>
          <div className="side side-back"></div>
        </div>
      </div>
    </Space>
  )
}

export default SpaceJump
