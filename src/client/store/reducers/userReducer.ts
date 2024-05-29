import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState: initialState = {
  isLoading: false,
  currentUser: undefined, // update to userCreds or Id?
  error: null,
  success: false,
};

interface initialState {
  isLoading: boolean;
  currentUser: undefined | string;
  error: any; // update to specifc
  success: boolean;
}

export interface loginCreds {
  username: string;
  password: string;
}

export interface registerForm {
  username: string;
  password: string;
  email: string;
}

export const loginUser = createAsyncThunk(
  '/user/login',
  async (loginCreds: loginCreds, thunkAPI) => {
    try {
      const response = await axios.post(
        'http://localhost:3000/auth/login',
        { loginCreds: loginCreds },
        { withCredentials: true } // we haven't been assigned the cookie at this point
      );
      return response.data; // shouldn't we get an entire user obj from the DB
    } catch (error: any) {
      // fix type any :)
      return thunkAPI.rejectWithValue(error.response.data.errors);
    }
  }
);

export const registerUser = createAsyncThunk(
  '/user/register',
  async (registerForm: registerForm, thunkAPI) => {
    try {
      const response = await axios.post('http://localhost:3000/auth/register', {
        registerForm,
      });
      return response.data;
    } catch (error: any) {
      // fix type any
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data.errors);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state, _action) => {
      state.isLoading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.currentUser = action.payload;
      state.success = true;
      state.isLoading = false;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.error = action.payload;
    });
    builder.addCase(registerUser.pending, (state, _action) => {
      state.isLoading = true;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.currentUser = action.payload;
      state.success = true;
      state.isLoading = false;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.error = action.payload;
    });
  },
});

export default userSlice.reducer;
