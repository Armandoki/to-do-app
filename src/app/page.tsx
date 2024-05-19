"use client"

import Header from "../components/header";
import AddButton from "../components/addButton";
import Task from "../components/task";
import NoTasks from "../components/noTasks";
import ModalTask from "../components/modalTask";
import { useEffect, useState } from "react";
import { createStorage, editStorage, readStorage } from "../utils/localStorage";
import { TaskInterface } from "../interfaces/TaskAppInterface";


export default function Home() {

  const [showModal, setShowModal] = useState(false);
  const [taskData, setTaskData] = useState<TaskInterface[]>([]);
  const [editDataTask, setEditDataTask] = useState({})
  const [optionModal, setOptionModal] = useState(1)

  const [tasksDone, setTasksDone] = useState<TaskInterface[]>([]);
  const [tasksNotDone, setTasksNotDone] = useState<TaskInterface[]>([]);

  //Load Data from LS
  useEffect(() => {
    if (localStorage.getItem('toDoApp') == null) {
      createStorage()
    }
    else {
      const lsData = readStorage()
      if (lsData !== null) {
        console.log('elpijita', lsData)
        setTaskData(lsData)
      }
    }
  }, [])

  //Sort Array by Date
  const sortByDate = () => {
    taskData.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateA.getTime() - dateB.getTime();
    })
  }

  //Edit a Task by ID
  const editTaskById = (taskId: string, updatedTask: any): void => {
    const updatedTasks = taskData.map(task => {
      if (task.id === taskId) {
        return { ...task, ...updatedTask };
      }
      return task;
    });

    setTaskData(updatedTasks);
    editStorage(updatedTasks)
  };

  //Delete a Task by ID
  const deleteTask = (taskId: string) => {
    const updatedTasks = taskData.filter(task => task.id !== taskId);
    setTaskData(updatedTasks);
    editStorage(updatedTasks)
  };

  //Update Done by ID
  const toggleTaskDone = (taskId: string): void => {
    const updatedTasks = taskData.map(task => {
      if (task.id === taskId) {
        return { ...task, done: !task.done };
      }
      return task;
    });
    setTaskData(updatedTasks);
    editStorage(updatedTasks)
  };

  //Order by Date
  useEffect(() => {
    sortByDate()
    const doneTasks = taskData.filter(task => task.done)
    const notDoneTasks = taskData.filter(task => !task.done);
    setTasksDone(doneTasks);
    setTasksNotDone(notDoneTasks);
  }, [taskData])

  return (
    <main>
      <Header />
      {showModal && <ModalTask setShowModal={setShowModal} setTaskData={setTaskData} optionModal={optionModal} editDataTask={editDataTask} editTaskById={editTaskById} taskData={taskData} />}
      <div className="container">
        {taskData.length > 0 ? (
          <>
            {tasksNotDone.length > 0 && <span className="span-taskNotDone">{`Tareas Incompletas (${tasksNotDone.length})`}</span>}
            {tasksNotDone.map((data: any) => (
              <div key={data.id}>
                <Task
                  setEditDataTask={setEditDataTask}
                  dataTask={data}
                  setOptionModal={setOptionModal}
                  setShowModal={setShowModal}
                  deleteTask={deleteTask}
                  toggleTaskDone={toggleTaskDone}
                />
              </div>
            ))}

            {tasksDone.length > 0 && <span className="span-taskDone">{`Tareas Completadas (${tasksDone.length})`}</span>}
            {tasksDone.map((data: any) => (
              <div key={data.id}>
                <Task
                  setEditDataTask={setEditDataTask}
                  dataTask={data}
                  setOptionModal={setOptionModal}
                  setShowModal={setShowModal}
                  deleteTask={deleteTask}
                  toggleTaskDone={toggleTaskDone}
                />
              </div>
            ))}
            <br />
            <br />
            <br />
            <br />
            <br />
          </>
        ) : (
          <NoTasks />
        )}
        <AddButton setOptionModal={setOptionModal} setShowModal={setShowModal} />
      </div>
    </main>
  );
}
