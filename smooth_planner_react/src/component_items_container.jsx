import React, { Component } from 'react';
import axios from 'axios';
import ItemsContainerA from './component_items_container_A';
import ItemsContainerE from './component_items_container_E';
import ItemsContainerT from './component_items_container_T';

// import the JS function to expand and collapse the cards to call it in the componentDidMount lifecycle
import exp_coll from './expand';


// this container will call the specific container (Accommodation, Event or Transportation)
// in order to mont the user's trip page
export default class ItemsContainer extends Component {

  constructor(props) {
    super(props);

    this.state = {
      currentUser: {name: "Bob"},
      cards: [], 
      tripID: props.match.params.id
    }
  }


  // delete method which connects to the database and runs destroy method on
  // items_controller to the specific item
  delete_item = (id) => {
    axios.delete(`http://localhost:3001/api/v1/items/${id}`)
    .then(response => {
      // filter the cards array in order to get rid of the deleted item and update the screen
      const temp_cards = this.state.cards.filter(card => card.id !== id);

      this.setState({
        cards: temp_cards
      });
    })
    .catch(error => console.log(error));
  }


  componentDidMount() {
    exp_coll();
    axios.get(`http://localhost:3001/api/v1/trips/${this.state.tripID}.json`)
    .then(response => {
      this.setState({cards: response.data});
    })
    .catch(error => console.log(error))
  }

  render() {
    const itineraries = this.state;

    let allCards = itineraries.cards.map((item) => {
      if (item.item_type === "A") {
        return <ItemsContainerA key={item.id} item={item} delete_item={this.delete_item}/>
      }
      else if (item.item_type === "E") {
        return <ItemsContainerE key={item.id} item={item} delete_item={this.delete_item}/>
      }
      else {
        return <ItemsContainerT key={item.id} item={item} delete_item={this.delete_item}/>
      }
    });

    return (
      <div className="items_container">
        {allCards}
      </div>
    )
  }
}



