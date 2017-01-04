import React from 'react';
import AboutMe from './aboutMe.jsx'
import RainyDay from '../utils/rainyday';
import './style.scss';

export default class CanvasPanel extends React.Component {

  constructor(props) {
    super(props)
    this.init = this.init.bind(this)
  }

  componentDidMount() {
    this.init()
  }

  init() {
    let imageEle = document.getElementById('background'),
      parentEle = document.getElementById('container')

    imageEle.onload = () => {
      let engine = new RainyDay({
        image: imageEle,
        parentElement: parentEle,
        opacity: 1
      });

      engine.rain([[3, 2, 2]], 100);
    };
  }

  render() {
    return (
      <div>
        <div id='container'>
          <img id="background" alt="background" src={'./dist/city.jpg'} />
        </div>
        <AboutMe></AboutMe>
      </div>
    )
  }
}
