import React from 'react';
import './App.css';
import Nav from './Components/Nav/Nav';
import Routes from './Routes';
import {connect} from 'react-redux';

class App extends React.Component {
  render() {
    return (
    <div className="App">
              {
                this.props.user_id !== null ?

                <Nav/>
                : null
              }
      {Routes}
    </div>
  );
  }
}

const mapStateToProps = reduxState => {
  return {
      user_id: reduxState.UserReducer.user_id,
  }
}

export default connect(mapStateToProps)(App)