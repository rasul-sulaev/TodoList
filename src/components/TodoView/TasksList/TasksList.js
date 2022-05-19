import React from "react";
import {Button, Checkbox, Divider, List, Modal, Spin} from "antd";
import {ReactComponent as IconEmptyData} from "../../../assets/img/icon/empty-data.svg";
import {DeleteFilled} from "@ant-design/icons";
import {useReducer} from "react";
import {multipleDeleteTasks, deleteTask} from "../../../store/slices/tasks";
import {useDispatch} from "react-redux";

export const TasksList = ({tasks, secondLoading}) => {
  const dispatch = useDispatch();

  const [checkedData, setCheckedData] = useReducer((checkedData, newCheckedData) => {
    return  {...checkedData, ...newCheckedData}
  }, {
    checkedList: [],
    indeterminate: false,
    checkAll: false,
  })


  /** Выбрать задачу **/
  const handleCheck = (checkedList) => {
    setCheckedData({
      checkedList,
      indeterminate: !!checkedList.length && checkedList.length < tasks.length,
      checkAll: checkedList.length === tasks.length,
    });
  };

  /** Выбрать все **/
  const handleCheckAll = (e) => {
    setCheckedData({
      checkedList: e.target.checked ? tasks : [],
      indeterminate: false,
      checkAll: e.target.checked,
    });
  };

  /** Удалнить задачу **/
  const handleDeleteTask = (task) => {
    Modal.confirm({
      title: <p style={{fontWeight: 400}}>Вы точно хотите удалить задачу: <strong>{task.title}</strong>?</p>,
      okText: 'Удалить',
      okType: 'danger',
      cancelText: 'Отмена',
      onOk() {
        dispatch(deleteTask(task))
          .finally(() => {
            setCheckedData({
              checkedList: checkedData.checkedList.filter(checkedTask => checkedTask !== task)
            })
          })
      },
    });
  }

  /** Удалнить выбранные задачи **/
  const handleMultipleDeleteTasks = () => {
    Modal.confirm({
      title: <p style={{fontWeight: 400}}>Вы точно хотите удалить выбранные задачи?</p>,
      okText: 'Удалить',
      okType: 'danger',
      cancelText: 'Отмена',
      onOk() {
        dispatch(multipleDeleteTasks(checkedData.checkedList))
          .finally( () => setCheckedData({checkedList: []}) )
      },
    });
  }

  return (
    <>
      <Divider className="todo-divider" orientation="left">Задачи</Divider>
      {!!tasks.length && (
        <Checkbox
          style={{ marginBottom: 12 }}
          indeterminate={(tasks.length > checkedData.checkedList.length) && checkedData.checkedList.length > 0}
          checked={tasks.length === checkedData.checkedList.length}
          onChange={handleCheckAll}
        >Выбрать все</Checkbox>
      )}
      <Spin spinning={secondLoading === 'pending-deleteTask' || secondLoading === 'pending-multipleDeleteTasks'}>
        <List
          className="todo-list"
          size="small"
          bordered
          locale={{emptyText: <>
              <div className="ant-empty ant-empty-normal">
                <IconEmptyData/>
                <p className="ant-empty-description">Список задач пуст!</p>
              </div>
            </>}}
        >
          {!!tasks.length && (
            <Checkbox.Group
              value={checkedData.checkedList}
              onChange={handleCheck}
            >
              {tasks?.map((task) =>
                <List.Item key={task.title}>
                  <Checkbox value={task}>{task.title}</Checkbox>
                  <DeleteFilled
                    color={'danger'}
                    onClick={() => handleDeleteTask(task)}
                    style={{ color: '#ff4d4f' }}
                  />
                </List.Item>
              )}
            </Checkbox.Group>
          )}
        </List>
      </Spin>
      {!!checkedData.checkedList.length && (
        <Button
          type="danger"
          style={{ marginTop: 20 }}
          onClick={handleMultipleDeleteTasks}
        >Удалить выбранные задачи</Button>
      )}
    </>
  )
}