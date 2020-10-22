import React, { Component } from 'react'
import ImagePicker from 'react-image-picker'
import 'react-image-picker/dist/index.css'
import img_1 from '../static/images/avatar/img_1.png'
import img_2 from '../static/images/avatar/img_2.png'
import img_3 from '../static/images/avatar/img_3.png'
import img_4 from '../static/images/avatar/img_4.png'
import img_5 from '../static/images/avatar/img_5.png'
import img_6 from '../static/images/avatar/img_6.png'
import img_7 from '../static/images/avatar/img_7.png'
import img_8 from '../static/images/avatar/img_8.png'

const imageList = [img_1, img_2, img_3, img_4, img_5, img_6, img_7, img_8]

class ImageSelection extends Component {
  render() {
    return (
      <div style={{
        display: 'flex',
        width: '700px',
        margin: '30px',
        overflow: 'scroll',
        justifyContent: 'center'
      }}>
        <ImagePicker 
          images={imageList.map((image, i) => ({src: image, value: i}))}
          onPick={(e)=>this.props.onPick(e)}
        />
      </div>
    )
  }
}

export default ImageSelection