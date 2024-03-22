import React from "react";
import PropTypes from 'prop-types';

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
        { 'id': 'counterSpan', "data-testid": "counterSpan", 'style': { color: '#fafafa', margin: '8px'} },
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

Counter.propTypes = {
  value: PropTypes.string
}

export default Counter;
