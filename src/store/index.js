import {configureStore} from "@reduxjs/toolkit";
import tasksReducer from "./slices/tasks";

export const store = configureStore({
  reducer: {
    tasks: tasksReducer
  }
})