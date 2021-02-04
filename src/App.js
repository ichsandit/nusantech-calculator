import React, { Component } from 'react';
import { connect } from 'react-redux';

import {setDimensions,setIsMobile} from "./redux/actions/env-actions";
import {Layout} from "antd";

import Routes from "./Routes";


class App extends Component {

    constructor(props) {
        super(props);
        this.props.setDimensions(window.innerWidth,window.innerHeight);
        if (window.innerWidth<480) this.props.setIsMobile(true);
        this.updateDimensions = this.updateDimensions.bind(this);
    };
    componentDidMount() {
        window.addEventListener("resize", this.updateDimensions);
    };
    updateDimensions() {
        this.props.setDimensions(window.innerWidth,window.innerHeight);
        if (window.innerWidth<480) this.props.setIsMobile(true);
        else this.props.setIsMobile(false);
    };

    render() {

        return (
            <div className="App">
                <Layout>
                    <Layout>
                        <Routes/>
                    </Layout>
                </Layout>
            </div>
        );
  }
}

const mapStateToProps = (state, props) => {
    return {...state,...props};
};

const mapDispatchToProps = {
    setDimensions,
    setIsMobile
};

export default connect(mapStateToProps,mapDispatchToProps)(App);
