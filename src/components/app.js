import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View
} from 'react-native';

import Dimensions from 'Dimensions';
import MapView from 'react-native-maps';

import Button from './common/button';

const REGION_LOAD = {
  longitudeDelta: 0.21173257380723953,
  latitudeDelta: 0.2327080490821487,
  longitude: 2.149681895971298,
  latitude: 41.37246834429643
}

class App extends Component {

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

  handleGoCalendar() {
    this.props.navigator.push({
      name: 'calendar'
    });
  }

  render() {
    return (
      <View style={ styles.container }>
        <View
          onLayout={ (event) => this.updateMapHeight(event) }
          style={ styles.header }>
          <Text style={ styles.welcome }>
            Maps on Android!
          </Text>
          <Button text='Go Calendar' onPress={ this.handleGoCalendar.bind(this) } />
        </View>
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
    marginRight: 20
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    padding: 20,
  }
});

module.exports = App;
