import React, { Component } from 'react';

class ListItem extends Component {
  render() {
    return (
        <li onClick={this.props.setActive.bind(this,this.props.location.id)}>{this.props.location.properties.Name}</li>
    );
  }

}

export default ListItem;
