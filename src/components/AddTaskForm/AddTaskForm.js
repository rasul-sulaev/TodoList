import {Button, Form, Input, message} from "antd";
import {useState} from "react";
import {createTask} from "../../store/slices/tasks";
import {useDispatch} from "react-redux";

export const AddTaskForm = ({tasks}) => {
  const dispatch = useDispatch();


  /** Добавление задачи **/
  const [inputValue, setInputValue] = useState('');

  const handleAddTask = () => {
    const newTask = {
      title: inputValue
    }

    if (newTask.title === '') {
      message.warning('Введите название задачи!');
    } else if (tasks.some(task => task.title === newTask.title)) {
      message.error('Такая задача уже сущесвует!');
    } else {
      dispatch(createTask(newTask));

      setInputValue('');
    }
  }

  return (
    <Form className="todo-form">
      <Input value={inputValue} onChange={e => setInputValue(e.target.value)} placeholder="Новая задача" />
      <Button type="primary" htmlType="submit" onClick={handleAddTask}>Добавить</Button>
    </Form>
  )
}