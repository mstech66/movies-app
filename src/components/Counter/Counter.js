import React from "react";

class Counter extends React.Component {

    constructor(props){
        super(props);
        this.state = { counter: parseInt(props.value) }
    }

    handlePlus(){
        this.setState((prevState) => {
            return { counter : prevState.counter + 1}
        })
    }

    handleMinus(){
        this.setState((prevState) => {
            return { counter : prevState.counter - 1}
        })
    }

  render() {
    return React.createElement(
      "div",
      {"style": {padding: 8}},
      React.createElement('button', {
        onClick: this.handlePlus.bind(this)
      }, "+"),
      React.createElement('button', {
        onClick: this.handleMinus.bind(this)
      }, "-"),
      React.createElement("span", {}, this.state.counter)
    );
  }
}

export default Counter;
