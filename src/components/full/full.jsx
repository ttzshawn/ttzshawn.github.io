import React from 'react';
import './style.scss';

export default class Full extends React.Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
  }

  render() {
    return (
      <div>
        <div className='full-container'>
          <img className='full-image' src={'./dist/city2.jpg'} alt="" />
        </div>
      </div>
    )
  }
}
