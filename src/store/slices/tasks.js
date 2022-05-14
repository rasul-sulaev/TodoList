
const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    data: [], // массив данных
  },
  reducers: {
    setTasks: (state, action) => {
      //
    }
  }
})


export const {setTasks} = tasksSlice.actions;
export default tasksSlice.reducer;

export const selectTasks = (store => store.tasks);