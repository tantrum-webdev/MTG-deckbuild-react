import { Deck } from '@/types';

export const storage = {
  base_key: 'decks',

  /**
   * Returns all decks from storage, or empty array.
   */
  index() {
    return getDataOrNull(this.base_key) ?? [];
  },

  /**
   * Returns one deck from storage, or null
   */
  getOne(key: string) {
    const data = getDataOrNull(this.base_key) ?? [];

    return data.find(({ id }) => id === key) ?? null;
  },

  /**
   * Updates the stored deck list with a new one.
   */
  store(decks: Deck[]) {
    localStorage.setItem(this.base_key, JSON.stringify(decks));

    return decks;
  },

  /**
   * Modify one deck in the list.
   * Returns the modified deck or null if no such deck exists.
   */
  update(deck: Deck) {
    const data = getDataOrNull(this.base_key) ?? [];
    const index = data.findIndex(({ id }) => id === deck.id);

    if (index === -1) {
      return null;
    }

    const updatedData = [
      ...data.slice(0, index),
      deck,
      ...data.slice(index + 1),
    ];

    localStorage.setItem(this.base_key, JSON.stringify(updatedData));

    return deck;
  },

  /**
   * Removes one deck from the list.
   */
  deleteOne(key: string) {
    const data = getDataOrNull(this.base_key) ?? [];
    const updatedData = data.filter(({ id }) => id !== key);

    localStorage.setItem(this.base_key, JSON.stringify(updatedData));
  },

  /**
   * Clear the decks
   */
  clear() {
    localStorage.removeItem('decks');
  },
};

function getDataOrNull(key: string) {
  return JSON.parse(localStorage.getItem(key) ?? 'null') as Deck[] | null;
}
