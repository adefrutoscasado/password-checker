import React, { Component } from 'react'

export default class StrengthVisualizator extends Component {
  constructor() {
    super()
    this.state = { width: 0, height: 0 }
  }

  componentDidMount() {
    const canvas = this.refs.canvas
    const ctx = canvas.getContext("2d")
    const img = this.refs.image
    img.onload = () => {
      this.setState({ width: img.width, height: img.height })
      ctx.drawImage(img, 0, 0)
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.strength !== this.props.strength) {
      this.updateCanvas();
    }
  }

  updateCanvas() {
    const img = this.refs.image
    const canvas = this.refs.canvas
    const ctx = canvas.getContext('2d');

    let { width, height } = this.state

    ctx.webkitImageSmoothingEnabled = false;
    ctx.mozImageSmoothingEnabled = false;
    ctx.msImageSmoothingEnabled = false;
    ctx.imageSmoothingEnabled = false;

    let percent = (0.05 * (5 - this.props.strength)) + 0.05

    // Calculate the scaled dimensions.
    var scaledWidth = width * percent;
    var scaledHeight = height * percent;

    ctx.clearRect(0, 0, width, height);

    if (this.props.strength > 0) {
      // Render image smaller.
      ctx.drawImage(img, 0, 0, scaledWidth, scaledHeight);

      // Stretch the smaller image onto larger context.
      ctx.drawImage(canvas, 0, 0, scaledWidth, scaledHeight, 0, 0, width, height);
    } else {
      ctx.drawImage(img, 0, 0, width, height);
    }
  }

  render() {
    let styleNone = { display: 'none' }
    let style = { display: 'flex', flexDirection: 'row', justifyContent: 'center'}
    return (
      <div style={style} ref="canvasWrapper" width={this.state.width} height={this.state.height}>
        <canvas ref="canvas" width={this.state.width} height={this.state.height} />
        <img style={styleNone} alt="img-visualizator" ref="image" src={this.props.imageUrl} />
      </div>
    )
  }
}
