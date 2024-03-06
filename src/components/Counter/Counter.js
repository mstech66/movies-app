import React from "react";

class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { counter: parseInt(props.value) };
  }

  handlePlus() {
    this.setState((prevState) => {
      return { counter: prevState.counter + 1 };
    });
  }

  handleMinus() {
    this.setState((prevState) => {
      return { counter: prevState.counter - 1 };
    });
  }

  render() {
    return React.createElement(
      "div",
      {},
      React.createElement(
        "button",
        {
          'id': 'incButton',
          "data-testid": "incButton",
          onClick: this.handlePlus.bind(this),
        },
        "+"
      ),
      React.createElement(
        "span",
        { 'id': 'counterSpan', "data-testid": "counterSpan" },
        this.state.counter
      ),
      React.createElement(
        "button",
        {
          'id': 'decButton',
          "data-testid": "decButton",
          onClick: this.handleMinus.bind(this),
        },
        "-"
      )
    );
  }
}

export default Counter;
