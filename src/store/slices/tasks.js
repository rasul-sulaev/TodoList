import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {TODOS_URL} from "../../utils/constants";

export const fetchTodos = createAsyncThunk(
  'todos/fetchTodos',
  async () => {
    const response = await fetch(TODOS_URL);

    if (response.ok) {
      return await response.json();
    } else {
      throw new Error(`${response.status} - ${response.statusText}`);
    }
  }
)

export const createTask = createAsyncThunk(
  'tasks/createTask',
  async (task) => {
    const response = await fetch(TODOS_URL, {
      method: 'POST',
      headers: {
        'Content-type' : 'application/json'
      },
      body: JSON.stringify(task)
    });

    if (response.ok) {
      return await response.json();
    } else {
      throw new Error(`${response.status} - ${response.statusText}`);
    }
  }
)

export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async (task) => {
    const response = await fetch(TODOS_URL + task.id, {
      method: 'DELETE',
    });

    if (response.ok) {
      return task
    } else {
      throw new Error(`${response.status} - ${response.statusText}`);
    }
  }
)

export const multipleDeleteTasks = createAsyncThunk(
  'tasks/multipleDeleteTasks',
  async (multipleTasksList) => {
    const deletedTasksList = [];

    for (const task of multipleTasksList) {
      const response = await fetch(TODOS_URL + task.id, {
        method: 'DELETE',
      });

      deletedTasksList.push(task);

      if (response.ok && multipleTasksList.length === deletedTasksList.length) {
        return multipleTasksList
      }
      else if (!response.ok) {
        throw new Error(`${response.status} - ${response.statusText}`);
      }
    }
  }
)

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    data: [], // массив данных
    isLoading: false, // Статус загрузки поступления постов
    error: null, // Ошибка при API запросах
    isFetching: '' // Допольнительный статус выполенения запросов
  },
  extraReducers: builder => {
    builder
      // Вывод списка задач
      .addCase(fetchTodos.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.error = action.error;
        state.isLoading = false;
      })

      // Дабавление новой задачи
      .addCase(createTask.pending, (state, action) => {
        state.isFetching = 'pending-createTask'
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.data = [...state.data, action.payload]
        state.isFetching = 'fulfilled-createTask'
      })
      .addCase(createTask.rejected, (state, action) => {
        state.error = action.error;
        state.isFetching = 'rejected-createTask'
      })

      // Удалеине задачи
      .addCase(deleteTask.pending, (state, action) => {
        state.isFetching = 'pending-deleteTask';
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.data = state.data.filter(task => task.id !== action.payload.id);
        state.isFetching = 'fulfilled-deleteTask';
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.error = action.error;
        state.isFetching = 'rejected-deleteTask';
      })

      // Множественное удаление задач
      .addCase(multipleDeleteTasks.pending, (state, action) => {
        state.isFetching = 'pending-multipleDeleteTasks';
      })
      .addCase(multipleDeleteTasks.fulfilled, (state, action) => {
        for (const payloadTask of action.payload) {
          state.data = state.data.filter(task => task.id !== payloadTask.id)
        }
        state.isFetching = 'fulfilled-multipleDeleteTasks';
      })
      .addCase(multipleDeleteTasks.rejected, (state, action) => {
        state.error = action.error;
        state.isFetching = 'rejected-multipleDeleteTasks';
      })
  }
})


export default tasksSlice.reducer;
export const selectTasks = (store => store.tasks);