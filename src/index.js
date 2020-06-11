import React from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay from './SeasonDisplay';
import Spinner from './Spinner';

class App extends React.Component {

    // constructor(props){
    //     super(props);
    // };

    state = {lat: null, errorMessage:''};

    componentDidMount() {
        window.navigator.geolocation.getCurrentPosition(
            (position) => this.setState({lat:position.coords.latitude}),
            (err) => this.setState({ errorMessage: err.message})
        );  
    }

    renderContent() {
        if (this.state.lat && !this.state.errorMessage){
            return <SeasonDisplay lat={this.state.lat}></SeasonDisplay> 
        }
        if (!this.state.lat && this.state.errorMessage){
            return <div>Error: {this.state.errorMessage}</div> 
        }
        return <Spinner message='Waiting for location request'></Spinner>
    }

    render() {
        return (
            <div>{this.renderContent()}</div>
        );
   } 
}

ReactDOM.render(<App></App>, document.querySelector("#root"))