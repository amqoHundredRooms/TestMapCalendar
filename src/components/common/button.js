import React, { Component, Text, StyleSheet, TouchableHighlight } from 'react-native';

class Button extends Component {
  render() {
    var buttonStyle = styles.button;
    if (this.props.addStyle) {
      buttonStyle = StyleSheet.flatten([styles.button, this.props.addStyle]);
    }
    return (
      <TouchableHighlight
        style={ buttonStyle }
        underlayColor={ 'gray' }
        onPress={ this.props.onPress } >
        <Text style={ styles.buttonText }>{ this.props.text }</Text>
      </TouchableHighlight>
    );
  }
}

var styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    borderColor: 'black',
    margin: 10
  },
  buttonText: {
    flex: 1,
    alignSelf: 'center',
    fontSize: 20
  }
});

module.exports = Button;
