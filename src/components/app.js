import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View
} from 'react-native';

import Dimensions from 'Dimensions';
import MapView from 'react-native-maps';

const REGION_LOAD = {
  longitudeDelta: 0.21173257380723953,
  latitudeDelta: 0.2327080490821487,
  longitude: 2.149681895971298,
  latitude: 41.37246834429643
}

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state= {
      titleHeight: 0,
      region: REGION_LOAD
    }
  }

  mapStyle() {
    let height = this.state.titleHeight;
    return {
      position: 'absolute',
      top: height,
      left: 0,
      right: 0,
      bottom: 0,
    }
  }

  updateMapHeight(event) {
    let height  = event.nativeEvent.layout.height;
    this.setState({
      titleHeight: height
    });
  }

  onRegionChange(region) {
    this.setState({
      region
    });
  }

  render() {
    return (
      <View style={ styles.container }>
        <Text
          onLayout={ (event) => this.updateMapHeight(event) }
          style={ styles.welcome }>
          React Native Maps on Android!
        </Text>
        <MapView
          initialRegion= { REGION_LOAD }
          region={ this.state.region }
          onRegionChange={ (region) => this.onRegionChange(region) }
          style={ this.mapStyle() } >
          <MapView.Marker
            coordinate={{
              longitude: 2.149681895971298,
              latitude: 41.37246834429643
            }}
            title="Marker Title"
            description="Description"
          />
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 10,
    padding: 20,
  }
});
