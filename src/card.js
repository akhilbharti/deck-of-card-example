import React, { Component } from "react";
import "./card.css";
class Card extends Component {
  constructor(props) {
    super(props);
    let angle = Math.random() * 90 - 45;
    let x = Math.random() * 40 - 20;
    let y = Math.random() * 40 - 20;
    this._transform = `translate(${x}px,${y}px) rotate(${angle}deg)`;
  }
  render() {
    //transform :translate(10px,20px) rotate(20deg)

    return (
      <img
        className="Card"
        src={this.props.image}
        alt={this.props.name}
        style={{ transform: this._transform }}
      />
    );
  }
}

export default Card;
