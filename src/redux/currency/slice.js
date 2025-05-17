import { createSlice } from '@reduxjs/toolkit';
import { getBaseCurrency, getExchangeInfo } from './operations';

export const currencySlice = createSlice({
  initialState: { baseCurrency: '', exchangeInfo: null },
  name: 'currency',

  selectors: {
    selectBaseCurrency: state => state.baseCurrency,
    selectExchangeInfo: state => state.exchangeInfo,
  },
  reducers: {
    setDefaultCurrency: (state, action) => {
      state.baseCurrency = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getBaseCurrency.fulfilled, (state, action) => {
        state.baseCurrency = action.payload;
      })
      .addCase(getExchangeInfo.fulfilled, (state, action) => {
        state.exchangeInfo = action.payload;
      });
  },
});

export const { selectBaseCurrency, selectExchangeInfo } =
  currencySlice.selectors;
export const { setDefaultCurrency } = currencySlice.actions;
