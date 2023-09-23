import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { IMessages } from "../interfaces/IBlock.ts";
import axiosInstanse from "../Api/axiosInstanse.ts";


interface State {
  messages: IMessages[];
  error: string | undefined | null;
  loading: boolean;
}


//  для получения сообщений
export const fetchMessages = createAsyncThunk(
  "messages/fetchMessages",
  async () => {
    try {
      const response = await axiosInstanse.get("/news");
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) { // нашел решение с типизацией для error но до конца не уверен, оптимальное это решение или костыль
        throw new Error(error.message);
      } else {
        throw new Error("An unknown error occurred.");
      }
    }
  }
);
  
//  для отправки сообщения
export const sendMessage = createAsyncThunk(
  "messages/sendMessage",
  async (message: IMessages) => {
    try {
      const response = await axiosInstanse.post("/news", message);
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) { // нашел решение с типизацией для error но до конца не уверен, оптимальное это решение или костыль
        throw new Error(error.message);
      } else {
        throw new Error("An unknown error occurred.");
      }
    }
  }
);
// для удаления сообщения
export const removeMessage = createAsyncThunk(
  "messages/removeMessage",
  async (id: string) => {
    try {
      const response = await axiosInstanse.delete(`/news/${id}`);
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) { // нашел решение с типизацией для error но до конца не уверен, оптимальное это решение или костыль
        throw new Error(error.message);
      } else {
        throw new Error("An unknown error occurred.");
      }
    }
  }
);

const initialState: State = {
  messages: [],
  error: null,
  loading: false,
};

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    deleteMessage: (state, action: PayloadAction<string>) => {
      state.messages = state.messages.filter(message => message.id !== action.payload)
    }// локальное удаление сообщения 
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.messages = action.payload;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(sendMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.loading = false;
        state.messages.push(action.payload);
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
export const {  deleteMessage } = messagesSlice.actions
export default messagesSlice.reducer;


