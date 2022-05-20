import "./TodoView.sass";
import {AddTaskForm} from "./AddTaskForm/AddTaskForm";
import {TasksList} from "./TasksList/TasksList";
import {useDispatch, useSelector} from "react-redux";
import {fetchTodos, selectTasks} from "../../store/slices/tasks";
import {useEffect} from "react";
import {Preloader} from "../Preloader/Preloader";

export const TodoView = () => {
  const dispatch = useDispatch();
  const {data: tasks, isLoading, error, isFetching} = useSelector(selectTasks);

  useEffect(() => {
    dispatch(fetchTodos())
  }, [dispatch])


  /** Если возникнет Ошибка **/
  if (error) return <h1>Ошибка. {error?.message}</h1>

  return (
    <Preloader isLoading={isLoading}>
      <section className="todo">
        <h2 className="title">Список задач</h2>
        <AddTaskForm tasks={tasks} isFetching={isFetching} />
        <TasksList tasks={tasks} isFetching={isFetching} />
      </section>
    </Preloader>
  )
}