import React, {Component} from 'react';
import { Route, Switch} from "react-router-dom";
// Pages
import HomePage from "./components/pages/HomePage";



class Routes extends Component {
    render() {
        return (
            <Switch>
                <Route path={"/"} exact /*strict*/ component={HomePage}/>
            </Switch>
        );
    }
}

export default Routes;
