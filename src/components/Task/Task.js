import "./Task.sass";
import {AddTaskForm} from "./AddTaskForm/AddTaskForm";
import {TasksList} from "./TasksList/TasksList";
import {useDispatch, useSelector} from "react-redux";
import {fetchTodos, selectTasks} from "../../store/slices/tasks";
import {useEffect} from "react";
import {Preloader} from "../Preloader/Preloader";

export const Task = () => {
  const dispatch = useDispatch();
  const {data: tasks, isLoading, error, secondLoading} = useSelector(selectTasks);

  useEffect(() => {
    dispatch(fetchTodos())
  }, [dispatch])


  /** Если возникнет Ошибка **/
  if (error !== null) return <h1>Ошибка. {error?.message}</h1>

  return (
    <Preloader isLoading={isLoading}>
      <section className="todo">
        <h2 className="title">Список задач</h2>
        <AddTaskForm tasks={tasks} secondLoading={secondLoading} />
        <TasksList tasks={tasks} secondLoading={secondLoading} />
      </section>
    </Preloader>
  )
}