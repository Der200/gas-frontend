import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Work with actual API url
const API = 'url';

export const sendMessage = createAsyncThunk('order/sendMessage', async (data) => {
  try {
    const orderApiUrl = API + 'orders/'
    const res = await fetch(orderApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });
    
    if(!res.ok) {
      throw new Error('сервер не смог обработать наш запрос')
    }

    const orderData = await res.json();
    return orderData
        
  } catch(error) {
    console.log(`Что-то пошло не так. Ошибка: ${error}`)
  }
})

const initialState = {
  messageStatus: 'idle'
}

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(sendMessage.pending, (state) => {
      state.messageStatus = 'loading';
    })
    builder.addCase(sendMessage.fulfilled, (state, { payload }) => {
      state.messageStatus = 'succeeded';
      if (payload !== undefined) {
        state.message = payload;
      }
    })
    builder.addCase(sendMessage.rejected, (state) => {
      state.messageStatus = 'failed';
    })
  }
})

export const visibleColumns = (state) => state.order.visibleColumns;
export default orderSlice.reducer