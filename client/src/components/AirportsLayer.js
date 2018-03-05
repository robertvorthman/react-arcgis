import * as React from 'react';
import { esriPromise } from 'react-arcgis';

export default class AirportsLayer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            layer: null
        };
    }

    render() {
        return null;
    }

    componentWillMount() {

        esriPromise([
            "esri/layers/FeatureLayer",
            'esri/geometry/Point',
            "esri/renderers/SimpleRenderer",
            "esri/symbols/SimpleMarkerSymbol"
        ]).then(([
            FeatureLayer,
            Point,
            SimpleRenderer,
            SimpleMarkerSymbol,
            esriQuery
        ]) => {
            
            const graphics = this.props.locations.map((location) => {

                location.properties.ObjectID = location.id;

                return {
                    geometry: new Point({
                        x: location.geometry.coordinates[0],
                        y: location.geometry.coordinates[1]
                    }),
                    attributes: location.properties
                }
            });

            const renderer = new SimpleRenderer({
                symbol: new SimpleMarkerSymbol({
                    color: [255,0,0]
                })
            });

            const layer = new FeatureLayer({
                fields: [
                {
                  name: "ObjectID",
                  alias: "ObjectID",
                  type: "oid"
                }, {
                  name: "name",
                  alias: "Name",
                  type: "string"
                }],
                objectIdField: "ObjectID",
                geometryType: "point",
                spatialReference: { wkid: 4326 },
                source: graphics,
                renderer: renderer
             });
            
            this.setState({ layer });
            this.props.map.add(layer);
        }).catch((err) => console.error(err));
    }

    componentWillUnmount() {
        this.props.map.remove(this.state.layer);
    }

    componentWillReceiveProps(newProps){

        const component = this;
        if(newProps.activeLocation != null){

            //use whenLayerView() to get FeatureLayer's LayerView
            this.props.view.whenLayerView(this.state.layer)
                .then((layerView)=>{
                    //get all layer's features
                    layerView.queryFeatures().then(function(results){
                        //filter on feature matching activeLocation
                        let match = results.filter((result) => result.attributes.ObjectID === newProps.activeLocation);
                        console.log('match', match);
                        if(match.length){
                            component.props.view.goTo(match);
                        }else{
                            console.error('Could not find location', newProps.activeLocation, 'in', results);
                        }
                      }).otherwise((err)=> console.log(err));
                });
        }
    }

}