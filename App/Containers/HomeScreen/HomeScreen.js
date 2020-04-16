import React from 'react'
import { Text, View, Button } from 'react-native'
import { connect } from 'react-redux'
import AuthActionTypes from 'App/Stores/Authentication/Actions'
import styles from './HomeScreenStyle.js'
import { PropTypes } from 'prop-types'
import AuthenticationServices from 'App/Services/AuthenticationServices'

class HomeScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userInfo: null,
    }
  }

  componentDidMount() {
    this.setState({ userInfo: this._getUserInfo() })
  }

  render() {
    return (
      <View style={styles.view}>
        <Text style={styles.text}>HomeScreen</Text>
        <Button title="Sign Out" onPress={this.props.signout} />
      </View>
    )
  }
  _getUserInfo = async () => {
    try {
      const userInfo = AuthenticationServices.trySilentSignin()
      return userInfo
    } catch (err) {
      console.log(err)
    }
  }
}

HomeScreen.propTypes = {
  token: PropTypes.string,
  signin: PropTypes.func,
}

const mapStateToProps = (state) => ({
  token: state.authentication.token,
})

const mapDispatchToProps = (dispatch) => ({
  signout: () => dispatch(AuthActionTypes.signoutUser()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen)
