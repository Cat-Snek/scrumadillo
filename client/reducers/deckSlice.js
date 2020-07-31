import { createSlice } from '@reduxjs/toolkit';
import { getAll } from '../reducers/boardslice';
import { useDispatch, useSelector } from 'react-redux';

export const deckSlice = createSlice({
  name: 'stack',
  initialState: {
    stacks: [],
    targetStack: [],
  },

  reducers: {
    getStack: (state, action) => {
      // action payload is data returned from fetch request on mounting
      state.stacks = action.payload;
    },
    selectStack: (state, action) => {
      const { deckState, targetStack } = action.payload;
      const cards = deckState.deck.stacks[targetStack];
      state.targetStack = cards;
      console.log('in selectstack reducer', cards);
    },
  },
});

export const { getStack, selectStack } = deckSlice.actions;
export const selectDeck = (state) => state;
export default deckSlice.reducer;
