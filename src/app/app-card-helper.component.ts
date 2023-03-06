import { ICard } from './cards.interface';

export const checkForStraightFlush = (cards: ICard[]) => {
  //Check for 5 consecutive cards of the same suit
  if (cards.length < 5) return false;
  let cardValues = cards.map((card) => card.value);
  let cardSuits = cards.map((card) => card.suit);
  let isInOrder = checkIfInOrderAndIncrementalByOne(cardValues);
  let isSameSuit = checkIfSameSuit(cardSuits);
  return isInOrder && isSameSuit;
};

export const checkForFullHouse = (cards: ICard[]) => {
  if (cards.length < 5) return false;
  let evaluatedCards: ICard[] = [];
  let threeOfAKind: boolean = false;
  let twoOfAKind: boolean = false;

  // Iterate over each card and count the number of occurrences of each value
  cards.forEach((card) => {
    let cardCount = cards.filter((c) => c.value === card.value).length;
    if (cardCount === 3) {
      threeOfAKind = true;
    }
    if (cardCount === 2) {
      twoOfAKind = true;
    }
    evaluatedCards.push(card);
  });

  let uniqueCards = [...new Set(evaluatedCards.map((card) => card.value))];

  // If the count of unique cards is two, and both threeOfAKind and twoOfAKind are true, then it is a full house
  return uniqueCards.length === 2 && threeOfAKind && twoOfAKind;
};

export const checkForFlush = (cards: ICard[]) => {
  if (cards.length < 5) return false;
  //Check for 5 cards of the same suit
  let cardSuits = cards.map((card) => card.suit);
  let isFlush = checkIfSameSuit(cardSuits);

  return isFlush;
};

export const checkForStraight = (cards: ICard[]) => {
  if (cards.length < 5) return false;
  //Check for 5 consecutive cards
  let cardValues = cards.map((card) => card.value);
  let isInOrder = checkIfInOrderAndIncrementalByOne(cardValues);

  return isInOrder;
};

export const checkIfInOrderAndIncrementalByOne = (values: number[]) => {
  //Check if the cards are in order
  const sortedValues = values.sort((a, b) => a - b);
  let isInOrder = true;
  let isIncrementalByOne = true;
  //Check if the edge case of Ace being included
  if (
    (sortedValues[0] === 1 &&
      sortedValues[1] === 2 &&
      sortedValues[2] === 3 &&
      sortedValues[3] === 4 &&
      sortedValues[4] === 5) ||
    (sortedValues[0] === 1 &&
      sortedValues[1] === 10 &&
      sortedValues[2] === 11 &&
      sortedValues[3] === 12 &&
      sortedValues[4] === 13)
  ) {
    return true;
  }

  //Check if the cards are in order
  for (let i = 0; i < sortedValues.length - 1; i++) {
    if (sortedValues[i] + 1 !== sortedValues[i + 1]) {
      isInOrder = false;
    }
    if (sortedValues[i] + 1 !== sortedValues[i + 1]) {
      isIncrementalByOne = false;
    }
  }

  return isInOrder && isIncrementalByOne;
};

export const checkIfPair = (
  cards: ICard[],
  pairSize: number = 2,
  pairCount: number = 1
) => {
  let evaluatedCards: ICard[] = [];
  let pair: number[] = [];

  // Looping through the cards array
  cards.forEach((card) => {
    // Checking if the card is already evaluated
    if (!evaluatedCards.find((c) => c.value === card.value)) {
      // Filtering the cards to get all the cards with the same value
      let sameValueCards = cards.filter((c) => c.value === card.value);
      // If the length of sameValueCards is 2 it means that there are two of the same card and it is a pair
      if (sameValueCards.length === pairSize) {
        evaluatedCards.push(card);
        // Adding the pair to twoPairs array
        pair.push(card.value);
      }
    }
  });
  // Returning true if twoPairs array contains two elements, meaning two pairs
  return pair.length === pairCount ? true : false;
};

const checkIfSameSuit = (suits: string[]) => {
  //Check if the cards are in the same suit
  let isSameSuit = true;
  const firstSuit = suits[0];
  suits.forEach((suit) => {
    if (suit !== firstSuit) {
      isSameSuit = false;
    }
  });

  return isSameSuit;
};
