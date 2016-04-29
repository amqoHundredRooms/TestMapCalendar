import React, { View, Navigator, StyleSheet, Component } from 'react-native';

import DayPicker from './components/calendar';
import App from './components/app';

var ROUTES = {
  calendar: DayPicker,
  app: App
};

class Main extends Component {

  render() {
    return (
      <View style={ styles.container }>
        <Navigator
          initialRoute={{ name: 'app' }}
          renderScene={ this.renderScene }
          onDidFocus={ (info) => { console.log('ON DID FOCUS', info) } }
          configureScene={() => {
            return Navigator.SceneConfigs.FadeAndroid;
          }} />
      </View>
    );
  }

  renderScene(route, navigator) {
    var Component = ROUTES[route.name];
    return <Component route={ route } navigator={ navigator } />
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

module.exports = Main;
