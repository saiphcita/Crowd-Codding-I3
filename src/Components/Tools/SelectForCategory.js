import React, { Component } from 'react';

class SelectForCategory extends Component {
  render() {
    return (
        <select id={this.props.id} value={this.props.categoryValue} onChange={this.props.handleChange}>
          {this.props.listCategory.map((val, i) => {
            return <option key={i} value={i}>
              {val}
            </option>
          })}
        </select>
    );
  }
}

export default SelectForCategory;