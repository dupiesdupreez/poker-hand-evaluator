import { Component, OnInit } from '@angular/core';
import {
  checkForStraightFlush,
  checkIfPair,
  checkForFullHouse,
  checkForFlush,
  checkForStraight,
} from './app-card-helper.component';
import { ICard } from './cards.interface';
const cards_json = require('./cards.json');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  cards: ICard[] = [];
  highestHand: string = '';

  ngOnInit(): void {
    this.initCards();
  }

  initCards() {
    const cards = <any>cards_json;

    for (const _card of cards) {
      let card: ICard = _card as ICard;
      this.cards.push(card);
    }
  }

  linkedIn() {
    window.open('https://www.linkedin.com/in/ruan-du-preez-061a209b', '_blank');
  }

  selectCard(card: ICard) {
    if (this.getSelectedCardsCount() < 5) {
      card.selected = !card.selected;
    } else {
      card.selected = false;
    }

    if (this.getSelectedCardsCount() == 0) {
      this.highestHand = '';
    } else {
      this.evaluateHand();
    }
  }

  getSelectedCardsCount() {
    return this.cards.filter((x) => x.selected).length;
  }

  evaluateHand() {
    const selectedCards = this.cards.filter((x) => x.selected);

    //Check for straight flush
    let isStraightFlush = checkForStraightFlush(selectedCards);
    if (isStraightFlush) {
      this.highestHand = 'Straight flush';
      return;
    }

    //Check for four pair
    let isTFourPair = checkIfPair(selectedCards, 4);
    if (isTFourPair) {
      this.highestHand = 'Four of a Kind';
      return;
    }

    //Check for full house
    let isFullHouse = checkForFullHouse(selectedCards);
    if (isFullHouse) {
      this.highestHand = 'Full house';
      return;
    }

    //Check for flush
    let isFlush = checkForFlush(selectedCards);
    if (isFlush) {
      this.highestHand = 'Flush';
      return;
    }

    //Check for straight
    let isStraight = checkForStraight(selectedCards);
    if (isStraight) {
      this.highestHand = 'Straight';
      return;
    }

    //Check for three of a kind
    let isThreeOfAKind = checkIfPair(selectedCards, 3);
    if (isThreeOfAKind) {
      this.highestHand = 'Three of a kind';
      return;
    }

    //Check for two pair
    let isTwoPair = checkIfPair(selectedCards, 2, 2);
    if (isTwoPair) {
      this.highestHand = 'Two pair';
      return;
    }

    // //Check for one pair
    let isOnePair = checkIfPair(selectedCards);
    if (isOnePair) {
      this.highestHand = 'One pair';
      return;
    }

    //High card
    this.highestHand = 'High card';
  }

  clearSelection() {
    for (const card of this.cards) {
      card.selected = false;
    }
    window.scrollTo(0, 0);
    this.highestHand = '';
  }
}
