import React, { Component } from 'react';
import List from './components/List';
import Map from './components/Map';
import "./App.css";
//uses https://github.com/nicksenger/react-arcgis
class App extends Component {
  constructor(props) {
    super(props);
    this.setActive = this.setActive.bind(this);
    this.state = {
      locations: [],
      activeLocation: null
    };
  }

  componentDidMount() {
    this.fetchData()
      .then(res => this.setState({locations: res.features}))
      .catch(err => console.error(err))
  }

  fetchData = async () => {
    const response = await fetch('data/sampleData.json');
    const body = await response.json();
    if(response.status !== 200) throw Error(body);
    return body;
  }

  render() {

    return (
      <div id="container">
        <List locations={this.state.locations} setActive={this.setActive}/>
        <Map locations={this.state.locations} activeLocation={this.state.activeLocation}/>
      </div>
    );
  }

  setActive(target){
    this.setState({activeLocation: target});
  }


}

export default App;
