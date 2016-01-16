import React from 'react';
import ReactDOM from 'react-dom';

import {browserHistory, Router, Route, IndexRoute} from 'react-router';

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

    render() {
    
        let item = { url: 'the url', title: 'the title' };

        return (
            <div>
                index page
                <br/>
                <a href={item.url}>{item.title}</a>
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
