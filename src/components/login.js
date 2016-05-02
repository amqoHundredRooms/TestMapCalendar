import React, { Component, StyleSheet, Text, NativeModules, View, TouchableHighlight, BackAndroid } from 'react-native';

import Button from './common/button'

import FBLogin, { FBLoginManager } from 'react-native-facebook-login';
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: null
    }
  }

  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', () => {
      console.log('Back pressed');
      if (this.props.navigator.getCurrentRoutes().length === 1  ) {
         return false;
      }
      this.props.navigator.pop();
      return true;
    });

    let currentUser = GoogleSignin.currentUser();
    console.log('CURRENT USER', currentUser);

    this.setState({
      user: currentUser
    });

    GoogleSignin.configure({
      // scopes: ["https://www.googleapis.com/auth/drive.readonly"], // what API you want to access on behalf of the user, default is email and profile
      // // iosClientId: <FROM DEVELOPPER CONSOLE>, // only for iOS
      webClientId: '133847784988-dlj1b38spu5v9995q2e1rulhfcilhs5i.apps.googleusercontent.com',
      offlineAccess: false // Depending on this we will get idToken or serverAuthCode
      // Check https://github.com/apptailor/react-native-google-signin
    });
  }

  handleBackCalendar() {
    this.props.navigator.pop();
  }

  onHandleGoogleSignIn() {
    GoogleSignin.signIn().then((user) => {
        console.log(user);
        this.setState({
          user: user
        });
      }).catch((err) => {
        console.log('WRONG SIGNIN', err);
      }).done();
  }

  onHandleGoogleSignOut() {
    GoogleSignin.signOut()
    .then(() => {
      console.log('out');
      this.setState({
        user: null
      });
    })
    .catch((err) => {
      console.log('WRONG SIGNOUT', err);
    });
  }

  getGoogleLogoutButton() {
    if(this.state.user == null) {
      return <View></View>
    }
    return (
      <Button text='Google Logout' addStyle={ styles.google }
          onPress={ this.onHandleGoogleSignOut.bind(this) } />
    );
  }

  getGoogleSignInButton() {
    if(this.state.user != null) {
      return <View></View>
    }
    return (
      <GoogleSigninButton
        style={ styles.google }
        size={ GoogleSigninButton.Size.Icon }
        color={ GoogleSigninButton.Color.Dark }
        onPress={
          this.onHandleGoogleSignIn.bind(this)
        }/>
    );
  }

  render() {
    return (
      <View style={ styles.container }>
        <Text style={ styles.text }>Login</Text>
        <Button text='Go Back'
          onPress={ this.handleBackCalendar.bind(this) } />
        <View style={ styles.login }>
          <FBLogin style={ styles.login }
            onLogin={function(e){console.log(e)}}
            onLogout={function(e){console.log(e)}}
            onCancel={function(e){console.log(e)}}
            onPermissionsMissing={function(e){console.log(e)}} />

          { this.getGoogleSignInButton() }
          { this.getGoogleLogoutButton() }

        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    margin: 10
  },
  google: {
    width: 230,
    height: 48,
    marginTop: 20,
    marginRight: 0,
    marginLeft: 0,
    paddingTop: 10
  },
  login: {
    marginTop: 15
  },
  text: {
    fontSize: 20,
    textAlign: 'center'
  }
});

module.exports = Login;
