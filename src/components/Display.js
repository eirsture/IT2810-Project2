import React from 'react'
import './Display.css'
import CustomSvg from './CustomSvg.js'
import CustomText from './CustomText.js'
import CustomSound from './CustomSound.js'

class Display extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      text: '',
      image: '',
      audio: ''
    }
  }

  componentDidMount() {
    this.fetchText(this.props.textIndex, this.props.textCategory)
    this.fetchSVG(this.props.SVGIndex, this.props.SVGCategory)
    this.fetchAudio(this.props.audioIndex, this.props.audioCategory)
  }
  
  componentDidUpdate(prevProps) {
    if (prevProps.tabId !== this.props.tabId) {
      // Switched tabs
      const response = this.retrieveFromStorage()
      console.log(response)
      if (response) {
        this.setState({text: response.text, image: response.image, audio: response.audio})
      } else {
        if (prevProps.textIndex !== this.props.textIndex || prevProps.textCategory !== this.props.textCategory) {
          this.fetchText(this.props.textIndex, this.props.textCategory)
        }
        if (prevProps.SVGIndex !== this.props.SVGIndex || prevProps.SVGCategory !== this.props.SVGCategory) {
          this.fetchSVG(this.props.SVGIndex, this.props.SVGCategory)
        }
        if (prevProps.audioIndex !== this.props.audioIndex || prevProps.audioCategory !== this.props.audioCategory) {
          this.fetchAudio(this.props.audioIndex, this.props.audioCategory)
        }
        this.saveToStorage()
      }
    } else {
      if (prevProps.textIndex !== this.props.textIndex || prevProps.textCategory !== this.props.textCategory) {
        this.fetchText(this.props.textIndex, this.props.textCategory)
      }
      if (prevProps.SVGIndex !== this.props.SVGIndex || prevProps.SVGCategory !== this.props.SVGCategory) {
        this.fetchSVG(this.props.SVGIndex, this.props.SVGCategory)
      }
      if (prevProps.audioIndex !== this.props.audioIndex || prevProps.audioCategory !== this.props.audioCategory) {
        this.fetchAudio(this.props.audioIndex, this.props.audioCategory)
      }
      this.saveToStorage()
    }
  }

  fetchText(index, category) {
    if (category) {
      fetch(`/assets/text/${category.toLowerCase()}/text.json`)
      .then(function(response) {
        return response.json()
      })
      .then(jsonData => {
        this.setState({ text: jsonData[index].text })
      })
    }
  }

  fetchSVG(index, category) {
    fetch(`/assets/image/${category.toLowerCase()}/${index + 1}.svg`)
      .then(response => response.text())
      .then(xmlData => this.setState({ image: xmlData }))
  }

  fetchAudio(index, category) {
    this.setState({ audio: `/assets/audio/${category.toLowerCase()}/${index + 1}.mp3` })
  }

  saveToStorage() {
    let data = {
      text: this.state.text,
      image: this.state.image,
      audio: this.state.audio
    }
    sessionStorage.setItem(this.props.tabId.toString(), JSON.stringify(data))
  }

  retrieveFromStorage() {
    const response_str = sessionStorage.getItem(this.props.tabId)
    const response = JSON.parse(response_str)
    return response
  }

  render() {
    return (
      <div className="display">
        <div className="svg-section">
          <CustomSvg image={this.state.image} />
        </div>
        <div className="text-section">
          <h2>Text</h2>
          <CustomText text={this.state.text} />
        </div>
        <div className="sound-section">
          <h2>Sound</h2>
          <CustomSound sound={this.state.audio} />
        </div>
      </div>
    )
  }
}

export default Display
