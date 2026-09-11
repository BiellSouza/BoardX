// import SidebarComponent from "../components/Sidebar";
import { useState } from "react";
import fotoUser from "../assets/MinhaFoto.jpeg";
import logoLight from "../assets/logoDesktopLight.png";

import {
  Calendar,
  ChartNoAxesColumn,
  ChevronDown,
  Filter,
  Flame,
  Grid2X2,
  LogOut,
  Menu,
  Plus,
  Search,
  Settings,
  Users,
  X,
} from "lucide-react";

function Dashboard() {
  const tables = [
    {
      id: "todo",
      label: "Todas",
      numb: 4,
      icon: <Filter className="size-4" />,
    },
    {
      id: "alta",
      label: "Em Alta",
      numb: 3,
      icon: <Flame className="size-4" />,
    },
    {
      id: "urgency",
      label: "Com Prazo",
      numb: 3,
      icon: <Calendar className="size-4" />,
    },
    {
      id: "myCards",
      label: "Meus Cards",
      numb: 2,
      icon: <Calendar className="size-4" />,
    },
  ];

  // Estado do Modal
  const [modalOpen, setModalOpen] = useState(false);

  const [selectButton, setSelectButton] = useState("todo");

  const links = [
    {
      id: "1",
      icon: <Grid2X2 />,
      label: "Quadros",
    },
    {
      id: "2",
      icon: <Grid2X2 />,
      label: "Minhas Tarefas",
    },
    {
      id: "3",
      icon: <Calendar />,
      label: "Calendário",
    },
    {
      id: "4",
      icon: <ChartNoAxesColumn />,
      label: "Relatórios",
    },
    {
      id: "5",
      icon: <Search />,
      label: "Pesquisar",
    },
  ];

  const [linkActive, setLinkActive] = useState("");

  const boards = [
    {
      id: "1",
      color: "#1A47FA",
      label: "Projeto Website",
    },
    {
      id: "2",
      color: "#52C79B",
      label: "App Mobile",
    },
    {
      id: "3",
      color: "#BF7338",
      label: "Marketing",
    },
    {
      id: "4",
      color: "#F676A3",
      label: "Estudos",
    },
  ];
  const [boardActive, setBoardActive] = useState("");

  const [buttonInteractiveactive, setButtonInteractiveActive] = useState("");

  const buttonsInteractives = [
    {
      id: "1",
      label: "Membros",
      icon: <Users className="size-4" />,
    },
    {
      id: "2",
      label: "Configurações",
      icon: <Users className="size-4" />,
    },
  ];

  const columns = [
    {
      id: 1,
      title: "Backlog",
      column: "backlog" as const,
    },
    { id: 2, title: "Em Andamento", column: "doing" as const },
    { id: 3, title: "Concluído", column: "done" as const },
  ];

  type Task = {
    id: number;
    label: string;
    date: string;
    priority: string;
    color: string;
    textColor: string;
    column: "backlog" | "doing" | "done";
  };

  const initialTasks: Task[] = [];

  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  // Guarda o valor do que está sendo arrastado
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);

  const handleDrop = (column: Task["column"]) => {
    if (!draggedTask) return;

    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === draggedTask.id ? { ...task, column } : task,
      ),
    );

    setDraggedTask(null);
  };

  // Estados do formulário
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [dateTask, setDateTask] = useState("");
  const [priorityTask, setPriorityTask] = useState("medium");
  const [column, setColumn] = useState<"backlog" | "doing" | "done">("backlog");

  function Teste() {
    if (taskName === "" || description === "" || priorityTask === "" || dateTask === "") {
      alert("Defina os valores corretamente");
      return;
    }
    // 1. Definir as cores
    let color = "";
    let textColor = "";

    // 2. Verificar a prioridade
    if (priorityTask === "alta") {
      color = "#FEE2E2";
      textColor = "#DC2626";
    }

    if (priorityTask === "medium") {
      color = "#DBEAFE";
      textColor = "#2563EB";
    }

    if (priorityTask === "baixa") {
      color = "#DCFCE7";
      textColor = "#16A34A";
    }

    // depois vamos criar o newTask aqui
    const newTask = {
      id: Date.now(),
      label: taskName,
      description: description,
      date: dateTask,
      priority: priorityTask,
      color: color,
      textColor: textColor,
      column: column,
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);
    setModalOpen(false);

    // Reseta estados
    setTaskName("");
    setDescription("");
    setDateTask("");
    setPriorityTask("");
  }

  return (
    <div className="bg-dark h-screen font-primary">
      <div className="lg:flex justify-between overflow-y-hidden">
        <div className="flex justify-between p-4 lg:hidden">
          <Menu className="text-light" />
          <img
            src={fotoUser}
            alt="foto ilustrativa de usuário"
            className="w-8 h-8 object-cover object-top rounded-full border-2 border-light"
          />
        </div>

        <div className="bg-dark w-82 h-screen p-4 hidden justify-between lg:flex lg:flex-col">
          <img
            src={logoLight}
            alt="logo versãi=o clara do BoardX"
            className="max-w-52"
          />

          <div className="flex flex-col gap-4 mt-6">
            {links.map((link) => (
              <div key={link.id}>
                <button
                  onClick={() => setLinkActive(link.id)}
                  className={`text-light flex items-center gap-3 py-3 w-full rounded-xl px-4 ${linkActive === link.id ? "bg-primary" : "bg-transparent"}`}
                >
                  <span>{link.icon}</span> <p>{link.label}</p>
                </button>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between mt-12">
            <h1 className="text-light text-[14px]">Meus Boards</h1>
            <button className="flex items-center gap-2 text-light bg-primary p-2 rounded-md text-[12px]">
              <span>
                <Plus className="size-4" />
              </span>
              Novo Board
            </button>
          </div>

          <div className="flex flex-col gap-4 mt-4">
            {boards.map((board) => (
              <button
                key={board.id}
                onClick={() => setBoardActive(board.id)}
                className={`text-light flex gap-3 items-center p-3 rounded-xl ${boardActive === board.id ? "bg-primary" : "bg-transparent"}`}
              >
                <div
                  className="w-6 h-6 rounded-full"
                  style={{ backgroundColor: board.color }}
                />
                <p>{board.label}</p>
              </button>
            ))}
          </div>

          <div className="flex justify-between mt-4">
            {" "}
            <div className="flex items-center gap-2">
              <img
                src={fotoUser}
                alt="imagem ilustrativa do usuário"
                className="w-14 h-14 rounded-full object-cover object-top border-2 border-light"
              />

              <div>
                <h1 className="text-light truncate">Gabriel Souza</h1>
                <p className="text-light text-[12px]">Desenvolvedor</p>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <Settings className="text-light" />
              <LogOut className="text-light" />
            </div>
          </div>
        </div>

        <div className="bg-[#F3F6FD] h-screen rounded-tr-2xl rounded-tl-2xl p-4 lg:rounded-tl-none lg:rounded-tr-none w-full">
          <div className="hidden lg:flex justify-between items-center mb-10 pb-4 border-b border-gray-300 bg-white">
            <div className="w-82 rounded-full px-4 py-2 flex items-center gap-3 text-sm bg-primary/5">
              <Search className="text-secondary size-5" />
              <input
                type="text"
                placeholder="Buscar tarefas..."
                className="outline-none"
              />
            </div>{" "}
            <div className="flex justify-between mt-4">
              {" "}
              <div className="flex items-center gap-2">
                <img
                  src={fotoUser}
                  alt="imagem ilustrativa do usuário"
                  className="w-10 h-10 rounded-full object-cover object-top border-2 border-light"
                />

                <div>
                  <h1 className="text-black truncate">Gabriel Souza</h1>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <p className="text-secondary text-[12px]">Online</p>
                  </div>{" "}
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <button className="text-secondary">
                  <ChevronDown />
                </button>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3 w-full justify-between">
              <div className="flex items-center gap-3">
                {" "}
                <div className="w-5 h-5 bg-primary rounded-full" />{" "}
                <div>
                  <h1 className="font-medium lg:text-xl">Projeto Website</h1>
                  <p className="text-sm text-secondary hidden sm:flex lg:text-[12px]">
                    Kanban para organizar suas tarefas e projetos
                  </p>
                </div>
              </div>
              <div className="hidden lg:flex gap-2">
                {buttonsInteractives.map((button) => (
                  <button
                    key={button.id}
                    onClick={() => setButtonInteractiveActive(button.id)}
                    className={`flex cursor-pointer items-center gap-2 text-sm p-3 rounded-xl w-full flex-1 ${buttonInteractiveactive === button.id ? "text-primary bg-primary/10" : ""}`}
                  >
                    {button.icon} <p>{button.label}</p>
                  </button>
                ))}

                <div>
                  <button className="flex cursor-pointer items-center gap-2 bg-primary text-white p-3 rounded-xl text-sm">
                    <Plus className="size-4" /> Nova Tarefa
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex mt-4 gap-2.5 text-center overflow-x-auto">
            {tables.map((table) => (
              <button
                key={table.id}
                onClick={() => setSelectButton(table.id)}
                className={`shrink-0 px-4 py-3 cursor-pointer rounded-lg border flex text-[12px] transition items-center gap-2 min-w-32 sm:min-w-42 lg:min-w-32 flex-1 justify-center lg:px-2 ${
                  selectButton === table.id
                    ? "bg-primary/10 border-primary text-primary"
                    : "bg-primary/5 border-gray-300 text-black"
                }`}
              >
                <span className="hidden sm:flex">{table.icon}</span>
                <p>
                  {" "}
                  {table.label} ({table.numb})
                </p>
              </button>
            ))}
            <button className="flex text-[12px] cursor-pointer items-center w-fit bg-white border border-gray-300 px-3 rounded-xl">
              <p className="truncate"> Ordenar por: </p>{" "}
              <select name="" id="" className="outline-none w-14 text-primary">
                <option value="prazo">Prazo</option>
                <option value="prioridade">Prioridade</option>
              </select>
            </button>
          </div>
          <div className="overflow-y-auto flex flex-col h-screen pb-42 lg:flex-row justify-between lg:gap-4 xl:gap-6">
            {" "}
            {columns.map((column) => {
              const columnTasks = tasks.filter(
                (task) => task.column === column.column,
              );

              return (
                <div
                  key={column.column}
                  onDragOver={(event) => event.preventDefault()}
                  onDrop={() => handleDrop(column.column)}
                  className="mt-4 border border-gray-300 min-h-100 h-fit rounded-2xl bg-[#F3F5FD] w-full"
                >
                  {/* Cabeçalho */}
                  <div className="flex justify-between bg-primary/10 border-t-2 border-primary p-2 rounded-tr-2xl rounded-tl-2xl">
                    <h1>{column.title}</h1>

                    <p className="bg-primary/20 w-6 h-6 text-center pt-1 rounded-full text-xs">
                      {columnTasks.length}
                    </p>
                  </div>

                  {/* Cards */}
                  <div className="mt-1.5">
                    <div className="flex flex-col gap-2 sm:p-1">
                      {columnTasks.map((task) => (
                        <div
                          draggable={true}
                          onDragStart={() => setDraggedTask(task)}
                          key={task.id}
                          className="flex flex-col gap-2 p-4 border border-gray-300 bg-white rounded-xl cursor-pointer"
                        >
                          <p className="text-[14px] text-black/90">
                            {task.label}
                          </p>

                          <div className="flex items-center justify-between">
                            <div className="flex gap-6">
                              {task.priority && (
                                <p
                                  className="text-sm w-fit py-1 px-4 rounded-md lg:text-[12px]"
                                  style={{
                                    backgroundColor: task.color,
                                    color: task.textColor,
                                  }}
                                >
                                  {task.priority}
                                </p>
                              )}

                              <div className="flex gap-3 items-center lg:gap-1">
                                <Calendar className="size-4 text-secondary" />

                                <p className="text-sm text-secondary">
                                  {new Date(task.date)
                                    .toLocaleDateString("pt-BR", {
                                      day: "2-digit",
                                      month: "short",
                                    })
                                    .replace(".", "")}
                                </p>
                              </div>
                            </div>

                            <img
                              src={fotoUser}
                              alt="foto ilustrativa do Usuário"
                              className="w-6 h-6 object-cover object-top rounded-full"
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={() => {
                        setColumn(column.column);
                        setModalOpen(true);
                      }}
                      className="flex items-center gap-2 text-primary justify-center w-fit mx-auto py-4 cursor-pointer"
                    >
                      <Plus className="size-4" />
                      Adicionar tarefa
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {modalOpen === true && (
            <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
              {/* Overlay */}
              <div
                onClick={() => setModalOpen(false)}
                className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
              />

              {/* Modal */}
              <div className="relative z-10 w-full max-w-[560px] overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-2xl">
                {/* HEADER */}
                <div className="flex items-start justify-between border-b border-gray-100 px-6 py-5">
                  <div>
                    <h2 className="text-[20px] font-semibold text-gray-900">
                      Nova tarefa
                    </h2>

                    <p className="mt-1 text-[13px] text-gray-500">
                      Preencha as informações para criar uma nova tarefa.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* CONTEÚDO */}
                <div className="space-y-5 px-6 py-6">
                  {/* NOME */}
                  <div className="space-y-2">
                    <label
                      htmlFor="task-name"
                      className="text-[13px] font-medium text-gray-700"
                    >
                      Nome da tarefa
                    </label>

                    <input
                      value={taskName}
                      onChange={(event) => setTaskName(event.target.value)}
                      id="task-name"
                      type="text"
                      placeholder="Ex: Criar tela de login"
                      className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10"
                    />
                  </div>

                  {/* DESCRIÇÃO */}
                  <div className="space-y-2">
                    <label
                      htmlFor="task-description"
                      className="text-[13px] font-medium text-gray-700"
                    >
                      Descrição
                    </label>

                    <textarea
                      value={description}
                      onChange={(event) => setDescription(event.target.value)}
                      id="task-description"
                      rows={3}
                      placeholder="Descreva o que precisa ser feito..."
                      className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10"
                    />
                  </div>

                  {/* DATA + PRIORIDADE */}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {/* DATA */}
                    <div className="space-y-2">
                      <label
                        htmlFor="task-date"
                        className="text-[13px] font-medium text-gray-700"
                      >
                        Prazo
                      </label>

                      <input
                        value={dateTask}
                        onChange={(event) => setDateTask(event.target.value)}
                        id="task-date"
                        type="date"
                        className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 px-3 text-sm text-gray-700 outline-none transition focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10"
                      />
                    </div>

                    {/* PRIORIDADE */}
                    <div className="space-y-2">
                      <label
                        htmlFor="task-priority"
                        className="text-[13px] font-medium text-gray-700"
                      >
                        Prioridade
                      </label>

                      <select
                        value={priorityTask}
                        onChange={(event) =>
                          setPriorityTask(event.target.value)
                        }
                        id="task-priority"
                        className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 px-3 text-sm text-gray-700 outline-none transition focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10"
                      >
                        <option value="baixa">Baixa</option>
                        <option value="medium">Média</option>
                        <option value="alta">Alta</option>
                      </select>
                    </div>
                  </div>

                  {/* COLUNA */}
                  <div className="space-y-2">
                    <label className="text-[13px] font-medium text-gray-700">
                      Adicionar tarefa em
                    </label>

                    <div className="grid grid-cols-3 gap-2">
                      <button
                        onClick={() => setColumn("backlog")}
                        type="button"
                        className={`rounded-xl border px-3 py-3 text-[12px] font-medium transition ${
                          column === "backlog"
                            ? "border-primary bg-primary/5 text-primary"
                            : "border-gray-200 text-gray-500 hover:border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        Backlog
                      </button>

                      <button
                        onClick={() => setColumn("doing")}
                        type="button"
                        className={`rounded-xl border px-3 py-3 text-[12px] font-medium transition ${
                          column === "doing"
                            ? "border-primary bg-primary/5 text-primary"
                            : "border-gray-200 text-gray-500 hover:border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        Em andamento
                      </button>

                      <button
                        type="button"
                        onClick={() => setColumn("done")}
                        className={`rounded-xl border px-3 py-3 text-[12px] font-medium transition ${
                          column === "done"
                            ? "border-primary bg-primary/5 text-primary"
                            : "border-gray-200 text-gray-500 hover:border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        Concluído
                      </button>
                    </div>
                  </div>
                </div>

                {/* FOOTER */}
                <div className="flex items-center justify-end gap-3 border-t border-gray-100 bg-gray-50/50 px-6 py-4">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="rounded-xl px-5 py-2.5 text-[13px] font-medium text-gray-600 transition hover:bg-gray-100"
                  >
                    Cancelar
                  </button>

                  <button
                    type="button"
                    onClick={Teste}
                    className="rounded-xl bg-primary px-5 py-2.5 text-[13px] font-medium text-white shadow-sm transition hover:opacity-90 active:scale-[0.98]"
                  >
                    Criar tarefa
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
