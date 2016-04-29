import React, {
  Component, Text, View, StyleSheet, TouchableHighlight, BackAndroid, InteractionManager
} from 'react-native';

import Calendar from './calendar/Calendar';

import Button from './common/button'

class DayPicker extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loadCalendar: false
    }
  }

  handleBackCalendar() {
    console.log('Going back')
    this.props.navigator.pop();
  }

  showCalendar() {
    if (this.state.loadCalendar) {
      var from = new Date();
      var to = new Date();
      to.setDate(to.getDate() + 2);

      return (
        <Calendar style={ styles.calendar }
            monthsCount={ 2 }
            startFormMonday={ true }
            selectFrom={ from }
            selectTo={ to }
            onSelectionChange={(current, previous) => {
                console.log(current, previous);
            }}
        />
      );
    }
    return (
      <Text style={ styles.calendar }>Cargando...</Text>
    );
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({
        loadCalendar: true
      })
    });

    BackAndroid.addEventListener('hardwareBackPress', () => {
      console.log('Back pressed');
      if (this.props.navigator.getCurrentRoutes().length === 1  ) {
         return false;
      }
      this.props.navigator.pop();
      return true;
    });
  }

  render() {
    return (
      <View style={ styles.container }>
        <Text style={ styles.text }>Calendar</Text>
        <Button text='Go Back'
          onPress={ this.handleBackCalendar.bind(this) } />
        { this.showCalendar() }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    margin: 10
  },
  calendar: {
    marginTop: 15
  },
  text: {
    fontSize: 20,
    textAlign: 'center'
  }
});

module.exports = DayPicker;
