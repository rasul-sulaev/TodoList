import './App.sass';
import {useDispatch, useSelector} from "react-redux";
import {deleteTask, fetchTodos, selectTasks} from "./store/slices/tasks";
import {useEffect, useRef, useState} from "react";
import {Task} from "./components/Task/Task";
import {Divider, List, Checkbox} from "antd";
import {DeleteFilled} from "@ant-design/icons";
import {ReactComponent as IconEmptyData} from "./assets/img/icon/empty-data.svg";
import {AddTaskForm} from "./components/AddTaskForm/AddTaskForm";

function App() {
  const dispatch = useDispatch();
  const {data: tasks, error} = useSelector(selectTasks);


  const CheckboxGroup = Checkbox.Group;


  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch ])


  /** Удалние задачи **/
  const handleDeleteTask = (task) => {
    dispatch(deleteTask(task));
  }

  if (error !== null) return <h1>Ошибка. {error?.message}</h1>

  return (
    <div className="App">
      <section className="todo">
        <h2 className="title">Список задач</h2>
        <AddTaskForm tasks={tasks} />
        <Divider className="todo-divider" orientation="left">Задачи</Divider>
        <List
          className="todo-list"
          size="small"
          bordered
          locale={{emptyText: <>
              <div className="ant-empty ant-empty-normal">
                <IconEmptyData/>
                <p className="ant-empty-description">Нет задач</p>
              </div>
            </>}}
          dataSource={tasks}
          renderItem={task => (
            <List.Item>
              <Checkbox>{task.title}</Checkbox>
              {/*<CheckboxGroup*/}
              {/*  options={tasks}*/}
              {/*  value={task.title}*/}
              {/*  onChange={this.onChange}*/}
              {/*/>*/}
              <DeleteFilled
                color={'danger'}
                onClick={() => handleDeleteTask(task)}
                style={{ color: '#ff4d4f' }}
              />
            </List.Item>
          )}
        />
      </section>
    </div>
  );
}

export default App;
