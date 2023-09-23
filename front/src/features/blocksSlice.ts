import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { IMessages } from "../interfaces/IBlock.ts";
import axiosInstanse from "../Api/axiosInstanse.ts";
import { IComments } from "../interfaces/IComments.ts";

interface State {
  messages: IMessages[];
  comments: IComments[]; 
  id:number;
  error: string | undefined | null;
  loading: boolean;
}





export const fetchComments = createAsyncThunk(
  "comments/fetchComments",
  async (newsId: number) => {
    try {
      const response = await axiosInstanse.get(`/news/${newsId}`);// в постмане все отрабатывает идеально а тут нет 
      
      console.log(response.data)
      return response.data.comments;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("An unknown error occurred.");
      }
    }
  }
);
//  для получения сообщений
export const fetchMessages = createAsyncThunk(
  "comments/fetchNews",
  async () => {
    try {
      const response = await axiosInstanse.get(`/news/`);
      console.log(response.data)
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
// для создания комментария , НЕДОДЕЛАНО
export const createComment = createAsyncThunk(
  "comments/createComment",
  async ({ newsId, comment }) => {
    try {
      const response = await axiosInstanse.post(`/comments`, { comment });
      return response.data;
    } catch (error: unknown) {
      // обработка ошибок
    }
  }
);

// для удаления комментария, НЕДОДЕЛАНО
export const deleteComment = createAsyncThunk(
  "comments/deleteComment",
  async ({  commentId }) => {
    try {
      const response = await axiosInstanse.delete(`/comments/${commentId}`);
      return response.data;
    } catch (error: unknown) {
      
    }
  }
);
  
//  для отправки сообщения
export const sendMessage = createAsyncThunk(
  "news/sendNews",
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
  "comments/remove",
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
  comments: [], 
  error: null,
  loading: false,
  id:1
};

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    deleteMessage: (state, action: PayloadAction<string>) => {
      state.messages = state.messages.filter(message => message.id !== action.payload)
    },// локальное удаление сообщения 
    changeId: (state, action: PayloadAction<number>) => {
      state.id = action.payload
    },
  },
  
  extraReducers: (builder) => {
    builder

      
      .addCase(fetchComments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload;
        state.messages.push(action.payload);
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
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


