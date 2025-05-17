import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUserInfo } from '../../service/opencagedataApi';
import { exchangeCurrency } from '../../service/exchangeAPI';

export const getBaseCurrency = createAsyncThunk(
  'currency/getBaseCurrency',
  async (body, thunkAPI) => {
    const state = thunkAPI.getState();
    const { baseCurrency } = state.currency;

    if (baseCurrency) {
      return baseCurrency;
    }

    try {
      const res = await getUserInfo(body);
      return res.results[0].annotations.currency.iso_code;
    } catch (error) {
      return thunkAPI.rejectWithValue('Not found currency! Try again later!');
    }
  },
);

export const getExchangeInfo = createAsyncThunk(
  'currency/getExchangeInfo',
  async (body, thunkAPI) => {
    try {
      const res = await exchangeCurrency(body);
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue('Try again later!');
    }
  },
);
