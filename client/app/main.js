import React from 'react';
import ReactDOM from 'react-dom';

import {browserHistory, Router, Route, IndexRoute} from 'react-router';

import {Lokka} from 'lokka';
import {Transport} from 'lokka-transport-http';

let client = new Lokka({
    transport: new Transport('http://localhost:3000/graphql')
});

import './style.css'

class App extends React.Component {

    // Component Lifecycle
    //
    render() {

        return (
            <div id='outer-container'> 

                <main id="page-wrap">
                    {this.props.children}
                </main>

            </div>
        ); 
    }
};

class Index extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            data: {
                user: {
                    name: 'NULL'
                }
            }
        };
    }

    componentDidMount() {
        client.query(`
                     {
                         user(id:"1"){
                            name
                         }
                     }
                     `).then(result => {
                        console.log(result);
                        this.setState({ data: result });
                     });
    }

    render() {
    
        return (
            <div>
                index page
                <br/>
                {this.state.data.user.name}
            </div>
        );
    }
}

let rootComponent = 
    <Router history={browserHistory}>
        <Route path="/" 
            component={App}>
            <IndexRoute 
                component={Index}/>
        </Route>
    </Router>;

ReactDOM.render(
    rootComponent, 
    document.getElementById('container')
);
