import React, { Component } from "react";
import Demo from './osEditor'
export default class OSRenderer extends Component {
    // constructor(props) {
    //   super(props);
    // }

    componentWillMount() {
        this.setOS(this.props.value)
    }

    refresh(params) {
        this.setOS(params.value);
    }

    setOS(os) {
        this.setState({
            imgForOS: os === 'windows' ? 'windows' : os === 'apple' ? 'apple' : 'linux'
        })
    };

    render() {
        return ( <div ref="container" tabIndex={1}><Demo /></div>
        
        );
    }
}

//<i class="fab fa-microsoft"></i>
//<i class="fab fa-windows"></i>
//<i class="fab fa-linux"></i>
//<i class="fab fa-apple"></i>