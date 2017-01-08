import React from 'react';
import AboutMe from './aboutMe.jsx'
import RainyDay from '../../utils/rainyday';
import './style.scss';
import Parallax from '../../utils/parallax.js';

export default class CanvasPanel extends React.Component {

  constructor(props) {
    super(props)
    this.init = this.init.bind(this)
  }

  componentDidMount() {
    // this.init()
    var scene = document.getElementById('scene');
    var parallax = new Parallax(scene);
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
          <ul id="scene" className="scene">
            <li className="layer" data-depth="0.30"><img id="background" alt="background" src={'./dist/city1.jpg'} /></li>
          </ul>
        </div>
        <AboutMe></AboutMe>
      </div>
    )
  }
}
