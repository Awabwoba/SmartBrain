import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';

import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import './App.css';

const app = new Clarifai.App({
  apiKey: 'b8fea21c70854ff3bd8b188d34376cb9'
});


const parcticlesOpions = {
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
        value_area: 800
      }
    },
  }
}
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      imageUrl: ''
    };

    // bind the class methods
    this.onInputChange = this.onInputChange.bind(this);
    this.onButtonSubmit = this.onButtonSubmit.bind(this);

  }

  onInputChange(event) {
    this.setState({ input: event.target.value });
  }

  onButtonSubmit() {
    this.setState({ imageUrl: this.state.input });

    app.models.predict(
      Clarifai.FACE_DETECT_MODEL, 
      this.state.input)
      .then(
        function (response) {
          // do something with response
          console.log(response);

        },
        function (err) {
          // there was an error
          console.log(err);

        }
      );

  }

  render() {
    return (
      <div className="App">
        <Particles className='particles'
          params={parcticlesOpions}
        />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm
          onInputChange={this.onInputChange}
          onButtonSubmit={this.onButtonSubmit}
        />
        <FaceRecognition imageUrl={this.state.imageUrl} />
      </div>
    );
  }
}

export default App;
