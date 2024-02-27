import React from "react";

class SearchForm extends React.Component {
  render() {
    return (
      <>
        <input
          defaultValue={this.props.initValue}
          onFocus={this.props.onSearch}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
                this.props.onSearch();
            }
          }}
        />
        <button onClick={this.props.onSearch}>Search</button>
      </>
    );
  }
}

export default SearchForm;
