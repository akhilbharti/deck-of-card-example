import React, { Component } from "react";
import axios from "axios";
import Card from "./card";
import "./deck.css";

// import { async } from "q";
const API_URL = "https://deckofcardsapi.com/api/deck/";
// https://deckofcardsapi.com/api/deck/<<deck_id>>/draw/?

class Deck extends Component {
  constructor(props) {
    super(props);
    this.state = { deck: null, drawn: [] };
  }
  async componentDidMount() {
    let response = await axios.get(`${API_URL}/new/shuffle/`);
    console.log(response);
    this.setState({ deck: response.data });
  }

  getCard = async () => {
    let deck_id = this.state.deck.deck_id;
    //make req using deck id
    //set state using new card info from api
    try {
      let res = await axios.get(`${API_URL}/${deck_id}/draw/`);
      if (!res.data.success) {
        throw new Error("no card left");
      }
      let card = res.data.cards[0];

      this.setState(st => ({
        drawn: [
          ...st.drawn,
          {
            id: card.code,
            image: card.images.png,
            name: `${card.suit} of ${card.value}`
          }
        ]
      }));
    } catch (err) {
      alert(err);
    }

    // console.log(res.data);
  };

  render() {
    const Cards = this.state.drawn.map(card => {
      return <Card name={card.name} image={card.image} key={card.id} />;
    });
    return (
      <div>
        <h1 className="deck-title">Deck Cards</h1>
        <h2 className="deck-title subtitle">Demo!</h2>
        <button className="deck-btn" onClick={this.getCard}>
          Get Card!
        </button>
        <div className="deck-card-pitch">
          <div className="Deck-cardarea">{Cards}</div>
        </div>
      </div>
    );
  }
}

export default Deck;
