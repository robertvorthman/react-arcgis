import React, { Component } from 'react';
import { Scene } from 'react-arcgis';

import AirportsLayer from './AirportsLayer';

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
        status: 'loading',
        map: null,
        view: null
    };

    this.handleFail = this.handleFail.bind(this); 
    this.handleMapLoad = this.handleMapLoad.bind(this);
    this.handleMapClick = this.handleMapClick.bind(this);
  }

  render() {
    return (
        <Scene 
          style={{ width: '100vw', height: '100vh' }}
          mapProperties={{ basemap: 'satellite' }}
          viewProperties={{
              center: [-77.45, 38.95],
              zoom: 0
          }}
          onFail={this.handleFail}
          onLoad={this.handleMapLoad}
        >
          <AirportsLayer locations={this.props.locations} activeLocation={this.props.activeLocation}/>
        </Scene>
    );
  }

  handleFail(e) {
      console.error(e);
      this.setState({ status: 'failed' });
  }

  handleMapLoad(map, view) {
    this.setState({ map, view });
    view.on('click', this.handleMapClick)
  }

  handleMapClick(event){
    this.state.view.hitTest(event)
      .then((hitTestResult)=>{
        if(hitTestResult.results.length){
          if(hitTestResult.results[0].graphic){
            console.log('clicked', hitTestResult.results[0].graphic.attributes)
          }
        }
      });
  }

}

export default Map;
