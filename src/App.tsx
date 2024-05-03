import { useEffect, useState, useRef, KeyboardEvent, useMemo } from "react";
import Task from "./components/Task";
import data from "./data.json";
import { TodoTask } from "./types";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function App() {
  const [tasks, setTasks] = useState<TodoTask[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<TodoTask[]>([]);
  const [theme, setTheme] = useState("");
  const [filterCondition, setFilterCondition] = useState("all");

  const themeCheckBoxRef = useRef<HTMLInputElement>(null);
  const newTaskInputRef = useRef<HTMLInputElement>(null);
  const numActiveTasks = useMemo(() => {
    return tasks.filter((task) => !task.completed).length;
  }, [tasks]);

  const handleTaskCompletion = (id: string) => {
    setTasks((currentTasks) => {
      const updatedTasks = currentTasks.map((task) => {
        if (id === task.id) {
          return { ...task, completed: !task.completed };
        }
        return task;
      });

      return updatedTasks;
    });
  };

  const handleTaskEntry = (e: KeyboardEvent) => {
    if (e.code === "Enter") {
      console.log("Enter key pressed");
      console.log(newTaskInputRef.current?.value);

      if (newTaskInputRef.current?.value) {
        const newTask = {
          id: crypto.randomUUID(),
          task: newTaskInputRef.current?.value,
          completed: false,
        };

        setTasks((currentTasks) => [...currentTasks, newTask]);
        newTaskInputRef.current.value = "";
      }
    }
  };

  const handleDelete = (id: string) => {
    setTasks((currentTasks) => {
      const updatedTasks = currentTasks.filter((task) => task.id !== id);
      return updatedTasks;
    });
  };

  const reorder = (list: TodoTask[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    if (result.destination.index === result.source.index) return;
    const reorderedTasks = reorder(
      tasks,
      result.source.index,
      result.destination.index
    );

    setTasks(reorderedTasks);
  };

  useEffect(() => {
    setTasks(data.tasks);
    const repositionFilters = () => {
      const mq = window.matchMedia("(min-width: 1280px)");
      const radios = document.getElementById("filter-radios");
      const containerLg = document.getElementById("filters-container-lg");
      const containerSm = document.getElementById("filters-container-sm");
      if (mq.matches && radios && containerLg && containerSm) {
        containerLg.style.display = "block";
        containerLg.append(radios);
        containerSm.style.display = "none";
      } else if (radios && containerSm && containerLg) {
        containerSm.style.display = "block";
        containerSm.append(radios);
        containerLg.style.display = "none";
      }
    };
    repositionFilters();

    window.onresize = repositionFilters;
  }, []);

  useEffect(() => {
    const filterTasks = (condition: string) => {
      if (condition === "all") {
        setFilteredTasks(tasks);
      } else if (condition === "active") {
        setFilteredTasks(tasks.filter((task) => !task.completed));
      } else if (condition === "completed") {
        setFilteredTasks(tasks.filter((task) => task.completed));
      }
    };

    filterTasks(filterCondition);
  }, [filterCondition, tasks]);

  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
      setTheme("dark");
    } else {
      document.documentElement.classList.remove("dark");
      setTheme("light");
    }
  }, []);

  const handleThemeChange = () => {
    if (themeCheckBoxRef.current?.checked) {
      setTheme("dark");
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
    } else {
      setTheme("light");
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
    }
  };

  return (
    <div className="font-josefin-sans min-h-dvh dark:bg-gray-blue-800">
      <header className="px-[1.6rem] pt-[2.66rem] pb-[7.4rem] bg-mobile-light dark:bg-mobile-dark bg-cover bg-center bg-no-repeat md:pt-[4.3rem] md:pb-[10.88rem]">
        <div className="flex justify-between items-center md:justify-center md:gap-[21.2rem]">
          <a
            href=""
            className="uppercase text-white font-bold text-[1.65rem] tracking-[0.38em] md:text-[2.4rem] md:tracking-[0.43em]"
          >
            Todo
          </a>
          <input
            type="checkbox"
            name="theme"
            id="theme"
            className="hidden"
            onClick={handleThemeChange}
            ref={themeCheckBoxRef}
          />
          <label
            htmlFor="theme"
            className={`${
              theme === "dark" ? "bg-sun-icon" : "bg-moon-icon"
            } w-[19px] bg-center bg-contain bg-no-repeat cursor-pointer md:w-[24px] md:h-[24px]`}
          >
            <span className="sr-only">dark mode</span>
          </label>
        </div>
      </header>
      <main className="bg-gray-blue-50/40 dark:bg-transparent">
        <div className="relative top-[-5.7rem] text-center px-[1.5rem] md:top-[-8.9rem] md:w-[36.8rem] md:mx-auto">
          <div className="relative before:block before:absolute before:h-[1.3rem] before:w-[1.3rem] before:top-2/4 before:-translate-y-2/4 before:left-[1.2rem] before:rounded-full before:border-[1px] before:border-gray-blue-50 md:before:left-[1.49rem] md:before:h-[1.55rem] md:before:w-[1.55rem]">
            <input
              type="text"
              name="new-task"
              id="new-task"
              placeholder="Create a new todo..."
              onKeyDown={handleTaskEntry}
              ref={newTaskInputRef}
              className="w-full h-[3rem] rounded-[0.3rem] outline-none pl-[3.2rem] mx-auto placeholder:text-[0.8rem] placeholder:tracking-[-0.042em] bg-light-gray dark:bg-gray-blue-600 dark:text-gray-blue-50 md:text-[1.25rem] md:placeholder:text-[1.25rem] md:placeholder:tracking-[-0.06em] md:h-[4rem] md:pl-[4.45rem] "
            />
            <label htmlFor="new-task" className="sr-only">
              Enter new task
            </label>
          </div>

          <section>
            <div className="bg-gray-blue-50/40 mt-[1rem] overflow-hidden rounded-lg shadow-gray-blue-50 shadow-lg dark:bg-gray-blue-500 dark:shadow-none md:mt-[1.5rem]">
              <div className="flex flex-col gap-[2px]">
                <DragDropContext onDragEnd={onDragEnd}>
                  <Droppable droppableId="list">
                    {(provided) => (
                      <div ref={provided.innerRef} {...provided.droppableProps}>
                        {filteredTasks.map((task, index) => (
                          <Draggable
                            draggableId={task.id}
                            key={task.id}
                            index={index}
                          >
                            {(provided) => (
                              <ul
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <li>
                                  <Task
                                    onMark={() => handleTaskCompletion(task.id)}
                                    onDelete={() => handleDelete(task.id)}
                                    {...task}
                                  />
                                </li>
                              </ul>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>

                <div className="flex justify-between text-[0.7rem] px-[1.3rem] py-[1.1rem] bg-light-gray text-gray-blue-200 relative dark:bg-gray-blue-600 dark:text-gray-blue-400 md:px-[1.5rem] md:pb-[0.8rem]">
                  <p className="dark:hover:text-light-gray/70 md:text-[0.9rem] md:tracking-[-0.02em]">
                    {numActiveTasks > 1
                      ? `${numActiveTasks} items`
                      : `${numActiveTasks} item`}{" "}
                    left
                  </p>
                  <div id="filters-container-lg" className="hidden"></div>
                  <button className="tracking-wide hover:text-gray-blue-400 dark:hover:text-light-gray/70 md:text-[0.9rem] md:tracking-[-0.02em]">
                    Clear Completed
                  </button>
                </div>
              </div>
            </div>

            <div id="filters-container-sm">
              <div
                id="filter-radios"
                className="bg-light-gray py-[0.85rem] text-[0.88rem] text-gray-blue-400 font-bold flex justify-center gap-[1.15rem] mt-[1rem] shadow-gray-blue-50 shadow-xl dark:bg-gray-blue-600 dark:shadow-none md:mt-0 md:shadow-none md:py-0"
              >
                <input
                  type="radio"
                  name="filter"
                  id="all-tasks"
                  value="all"
                  defaultChecked={true}
                  onClick={() => setFilterCondition("all")}
                  className="peer/all hidden"
                />
                <label
                  htmlFor="all-tasks"
                  className="peer-checked/all:text-bright-blue cursor-pointer hover:text-gray-blue-500 dark:hover:text-light-gray"
                >
                  All
                </label>
                <input
                  type="radio"
                  name="filter"
                  id="active-tasks"
                  value="active"
                  onClick={() => setFilterCondition("active")}
                  className="peer/active hidden"
                />
                <label
                  htmlFor="active-tasks"
                  className="peer-checked/active:text-bright-blue cursor-pointer hover:text-gray-blue-500 dark:hover:text-light-gray"
                >
                  Active
                </label>
                <input
                  type="radio"
                  name="filter"
                  id="completed-tasks"
                  value="completed"
                  onClick={() => setFilterCondition("completed")}
                  className="peer/complete hidden"
                />
                <label
                  htmlFor="completed-tasks"
                  className="peer-checked/complete:text-bright-blue cursor-pointer hover:text-gray-blue-500 dark:hover:text-light-gray"
                >
                  Completed
                </label>
              </div>
            </div>
            <p className="text-[0.85rem] text-gray-blue-400 mt-[2.5rem] md:mt-[3.1rem]">
              Drag and drop to reorder list
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;
