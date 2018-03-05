import React, { Component } from 'react';
import ListItem from './ListItem';

class List extends Component {

  render() {

    this.listItems = this.props.locations.map((location)=> {
      return <ListItem
        key={location.id}
        location={location}
        setActive={this.props.setActive}
      />
    });

    return (
        <ul>{this.listItems}</ul>
    );
  }

}

export default List;
