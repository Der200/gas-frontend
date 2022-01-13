import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// work with actual API url
const API = 'url';

export const register = createAsyncThunk('authorization/register', async (data) => {
  try {
    const registerApiUrl = API + 'users/'
    const res = await fetch(registerApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });
    
    if(!res.ok) {
      throw new Error('сервер не смог обработать наш запрос')
    }

    const registerData = await res.json();
    return registerData
        
  } catch(error) {
    console.log(`Что-то пошло не так. Ошибка: ${error}`)
  }
})

export const login = createAsyncThunk('authorization/login', async (data) => {
  const loginApiUrl = API + 'auth/';
  const res = await fetch(loginApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: data
    });
    
    if(!res.ok) {
      console.log(`Email or password incorrect`)
      throw new Error('сервер не смог обработать наш запрос')
    }

    const loginData = await res.json();
    return loginData
})

export const getUserData = createAsyncThunk('authorization/getUserData', async (data) => {
  try {
    const res = await fetch(API + "users/me", {
      headers: {
        'Accept': "application/json",
        'Authorization': data,
      },
    });
    
    if(!res.ok) {
      throw new Error('сервер не смог обработать наш запрос')
    }

    return await res.json();
            
  } catch(e) {
      alert(`Что-то пошло не так. Ошибка: ${e}`)
  }
})

export const updateUserData = createAsyncThunk('authorization/updateUserData', async (data) => {
  const updateApiUrl = API + 'users/me';
  const res = await fetch(updateApiUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': data.token,
      },
      body: JSON.stringify(data.user)
    });
    
    if(!res.ok) {
      throw new Error('сервер не смог обработать наш запрос')
    }

    const userData = await res.json();
    return userData
})

const initialState = {
  user: {},
  loginStatus: false,
  totalUsers: [],
  token: null,
  registerStatus: 'idle',
  authorizationStatus: 'idle',
  otherRequestsStatus: 'idle',
  updateRequestStatus: 'idle',
  recoveryCodeSent: false,
}

export const authorizationSlice = createSlice({
  name: 'authorization',
  initialState,
  reducers: {
    logout: (state) => {
      state.authorizationStatus = `idle`;
      state.otherRequestsStatus = 'idle';

      state.user = {};

      localStorage.clear();
      
      state.loginStatus = false;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(register.pending, (state) => {
      state.registerStatus = 'loading';
    })
    builder.addCase(register.fulfilled, (state, { payload }) => {
      state.registerStatus = 'succeeded';
      if (payload !== undefined) {
        state.user = payload;
        localStorage.currensUser = JSON.stringify({
          email: payload.email,
          first_name: payload.person.first_name,
          last_name: payload.person.last_name,
          second_name: payload.person.second_name,
          address: payload.person.address,
          offer_id: payload.person.offer_id,
          phone: payload.person.phone
        });
      }
    })
    builder.addCase(register.rejected, (state) => {
      state.registerStatus = 'failed';
    })
    builder.addCase(login.pending, (state) => {
      state.authorizationStatus = 'loading';
    })
    builder.addCase(login.fulfilled, (state, { payload }) => {
      state.authorizationStatus = 'succeeded';
      if (payload !== undefined) {
        const accessToken = payload.token_type + ' ' + payload.access_token;
        state.token = accessToken;
        localStorage.setItem('accessToken', accessToken);
        state.loginStatus = true;
      }
    })
    builder.addCase(login.rejected, (state, action) => {
      state.authorizationStatus = 'failed';
      state.error = action.payload;
    })
    builder.addCase(getUserData.pending, (state) => {
      state.otherRequestsStatus = 'loading';
    })
    builder.addCase(getUserData.fulfilled, (state, { payload }) => {
      state.otherRequestsStatus = 'succeeded';
      state.user = payload;
      localStorage.currentUser = JSON.stringify({
        email: payload.email,
        first_name: payload.person.first_name,
        last_name: payload.person.last_name,
        second_name: payload.person.second_name,
        address: payload.person.address,
        offer_id: payload.person.offer_id,
        phone: payload.person.phone
      });
    })
    builder.addCase(getUserData.rejected, (state) => {
      state.otherRequestsStatus = 'failed';
    })
    builder.addCase(updateUserData.pending, (state) => {
      state.updateRequestStatus = 'loading';
    })
    builder.addCase(updateUserData.fulfilled, (state, { payload }) => {
      state.updateRequestStatus = 'succeeded';
      state.user = payload;
      localStorage.currentUser = JSON.stringify({
        email: payload.email,
        first_name: payload.person.first_name,
        last_name: payload.person.last_name,
        second_name: payload.person.second_name,
        address: payload.person.address,
        offer_id: payload.person.offer_id,
        phone: payload.person.phone
      });
    })
    builder.addCase(updateUserData.rejected, (state) => {
      state.updateRequestStatus = 'failed';
    })
  },
})

export const recoveryCodeStatus = (state) => state.authorization.recoveryCodeSent;
export const registerStatus = (state) => state.authorization.registerStatus;
export const authorizationStatus = (state) => state.authorization.authorizationStatus;
export const otherRequestsStatus = (state) => state.authorization.otherRequestsStatus;
export const loginStatus = (state) => state.authorization.loginStatus;
export const user = (state) => state.authorization.user;
export const { logout } = authorizationSlice.actions
export default authorizationSlice.reducer