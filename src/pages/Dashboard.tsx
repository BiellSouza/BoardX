// import SidebarComponent from "../components/Sidebar";
import {
  Calendar,
  ChartNoAxesColumn,
  ChevronDown,
  CircleAlert,
  CircleCheck,
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
import React from "react";
import { supabase } from "../lib/supabase";
import { useState, useEffect } from "react";
import logoLight from "../assets/logoDesktopLight.png";
import ColumnComponent from "../components/ColumnComponent";
import CardsComponent from "../components/CardsComponent";

function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);

  // const [selectButton, setSelectButton] = useState("todo");

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

  // const [linkActive, setLinkActive] = useState("");

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
  // const [boardActive, setBoardActive] = useState("");

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

  type Column = {
    id: string;
    title: string;
    user_id: string;
    created_at: string;
  };

  const [columns, setColumns] = useState<Column[]>([]);

  async function buscarColunas() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      console.log("Usuário não autenticado");
      return;
    }

    const { data, error } = await supabase
      .from("columns")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: true });

    if (error) {
      console.log("❌ ERRO AO BUSCAR COLUNAS:", error);
      return;
    }

    console.log("📋 COLUNAS DO USUÁRIO:", data);

    setColumns(data);
  }

  useEffect(() => {
    buscarColunas();
  }, []);

  async function createColumn() {
    const title = window.prompt("Digite o nome da nova coluna:");

    if (!title || title.trim() === "") {
      return;
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("Usuário não autenticado.");
      return;
    }

    const { data, error } = await supabase
      .from("columns")
      .insert({
        user_id: user.id,
        title: title.trim(),
      })
      .select()
      .single();

    if (error) {
      console.log("ERRO AO CRIAR COLUNA:", error);
      alert("Erro ao criar coluna.");
      return;
    }

    setColumns((prevColumns) => [...prevColumns, data]);

    alert("Coluna criada!");
  }

  type Task = {
    id: number;
    label: string;
    description: string;
    date: string;
    priority: "baixa" | "media" | "alta";
    color: string;
    textColor: string;
    column: string;
  };

  const initialTasks: Task[] = [];
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const [ordenarPor, setOrdenarPor] = useState("prazo");

  // Exibe as tarefas
  useEffect(() => {
    async function buscarTarefas() {
      console.log("🔵 INICIANDO BUSCA DAS TAREFAS...");

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      console.log("👤 USUÁRIO:", user);
      console.log("❌ ERRO DO USUÁRIO:", userError);

      if (userError) {
        console.log("ERRO AO PEGAR USUÁRIO:", userError);
        alert("Não foi possível carregar o usuário.");
        return;
      }

      if (!user) {
        console.log("Nenhum usuário autenticado.");
        alert("Usuário não autenticado.");
        return;
      }

      console.log("🆔 ID DO USUÁRIO LOGADO:", user.id);
      console.log("📧 EMAIL:", user.email);

      const { data, error } = await supabase
        .from("tasks")
        .select("*")
        .eq("user_id", user.id);

      console.log("📦 TAREFAS RETORNADAS:", data);
      console.log("❌ ERRO AO BUSCAR TAREFAS:", error);

      if (error) {
        alert("Não foi possível carregar as tarefas.");
        return;
      }

      const tarefasFormatadas: Task[] = data.map((task) => {
        let color = "";
        let textColor = "";

        if (task.priority === "alta") {
          color = "#FEE2E2";
          textColor = "#DC2626";
        }

        if (task.priority === "media") {
          color = "#DBEAFE";
          textColor = "#2563EB";
        }

        if (task.priority === "baixa") {
          color = "#DCFCE7";
          textColor = "#16A34A";
        }

        return {
          id: task.id,
          label: task.title,
          description: task.description,
          date: task.due_date,
          priority: task.priority,
          color,
          textColor,
          column: task.column_id,
        };
      });

      console.log("✅ TAREFAS FORMATADAS:", tarefasFormatadas);

      setTasks(tarefasFormatadas);
      console.log("📌 COLUNAS:", columns);
      console.log("📌 TAREFAS:", tarefasFormatadas);
    }

    buscarTarefas();
  }, []);
  const tarefasOrdenadas = [...tasks].sort((a, b) => {
    if (ordenarPor === "prazo") {
      return a.date.localeCompare(b.date);
    }

    if (ordenarPor === "prioridade") {
      const prioridades: Record<string, number> = {
        alta: 1,
        media: 2,
        baixa: 3,
      };

      return prioridades[a.priority] - prioridades[b.priority];
    }

    return 0;
  });

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
  const [priorityTask, setPriorityTask] = useState<"baixa" | "media" | "alta">(
    "media",
  );
  const [column, setColumn] = useState("");
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);

  async function SaveTask() {
    if (
      taskName === "" ||
      description === "" ||
      // priorityTask === "" ||
      dateTask === ""
    ) {
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

    if (priorityTask === "media") {
      color = "#DBEAFE";
      textColor = "#2563EB";
    }

    if (priorityTask === "baixa") {
      color = "#DCFCE7";
      textColor = "#16A34A";
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("Uusuário não autenticado.");
      return;
    }

    console.log("USUÁRIO:", user);
    console.log("ID DO USUÁRIO:", user?.id);

    // insere na tabela
    const { data, error } = await supabase
      .from("tasks")
      .insert({
        user_id: user.id,
        title: taskName,
        description: description,
        due_date: dateTask,
        priority: priorityTask,
        column_id: column,
      })
      .select()
      .single();

    if (error) {
      console.log("ERROR AO SALVAR TAREFA:", error);
      alert("Erro ao salvar a tarefa.");
      return;
    }

    const newTask: Task = {
      id: data.id,
      label: data.title,
      description: data.description,
      date: data.due_date,
      priority: data.priority,
      color: color,
      textColor: textColor,
      column: data.column_id,
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);
    alert("Tarefa criada!");

    setModalOpen(false);

    setTaskName("");
    setDescription("");
    setDateTask("");
    setPriorityTask("media");
  }

  function openEditTask(task: Task) {
    console.log("TASK RECEBIDA:", task);
    console.log("ID DA TAREFA:", task.id);

    setEditingTask(task);

    setTaskName(task.label);
    setDescription(task.description);
    setDateTask(task.date);
    setPriorityTask(task.priority);
    setColumn(task.column);

    setModalOpen(true);
  }

  async function updateTask() {
    console.log("EDITANDO:", editingTask);

    if (!editingTask) {
      console.log("Nenhuma tarefa selecionada para edição");
      return;
    }

    console.log("ID DA TAREFA:", editingTask.id);

    const { data, error } = await supabase
      .from("tasks")
      .update({
        title: taskName,
        description: description,
        due_date: dateTask,
        priority: priorityTask,
        status: column,
      })
      .eq("id", editingTask.id)
      .select()
      .single();

    if (error) {
      console.log("ERRO AO ATUALIZAR:", error);
      alert("Erro ao atualizar a tarefa.");
      return;
    }

    console.log("TAREFA ATUALIZADA:", data);

    // Atualiza a tarefa na tela
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === editingTask.id
          ? {
              ...task,
              label: data.title,
              description: data.description,
              date: data.due_date,
              priority: data.priority,
              column: data.status,

              color:
                data.priority === "alta"
                  ? "#FEE2E2"
                  : data.priority === "media"
                    ? "#DBEAFE"
                    : "#DCFCE7",

              textColor:
                data.priority === "alta"
                  ? "#DC2626"
                  : data.priority === "media"
                    ? "#2563EB"
                    : "#16A34A",
            }
          : task,
      ),
    );

    // Limpa o estado de edição
    setEditingTask(null);

    // Fecha o modal
    setModalOpen(false);

    // Limpa formulário
    setTaskName("");
    setDescription("");
    setDateTask("");
    setPriorityTask("media");
    setColumn("backlog");

    alert("Tarefa atualizada!");
  }

  async function deleteTask(taskId: number) {
    const confirmar = window.confirm(
      "Tem certeza que deseja excluir esta tarefa?",
    );

    if (!confirmar) return;

    const { error } = await supabase.from("tasks").delete().eq("id", taskId);

    if (error) {
      console.log("ERRO AO EXCLUIR:", error);
      alert("Erro ao excluir a tarefa.");
      return;
    }

    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));

    alert("Tarefa excluída!");
  }

  function openTaskDetails(task: Task) {
    setSelectedTask(task);
    setDetailsModalOpen(true);
  }

  const tables = [
    {
      id: "todo",
      label: "Todas",
      numb: tasks.length,
      icon: <Filter className="size-4" />,
    },
    {
      id: "alta",
      label: "Alta",
      numb: tasks.filter((task) => task.priority === "alta").length,
      icon: <Flame className="size-4" />,
    },
    {
      id: "urgency",
      label: "Média",
      numb: tasks.filter((task) => task.priority === "media").length,
      icon: <CircleAlert className="size-4" />,
    },
    {
      id: "myCards",
      label: "Baixa",
      numb: tasks.filter((task) => task.priority === "baixa").length,
      icon: <CircleCheck className="size-4" />,
    },
  ];

  //deslogando usuário
  async function handleLogout() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.log("ERRO AO SAIR:", error);
      alert("Erro ao sair da conta.");
      return;
    }

    console.log("Usuário deslogado!");

    // manda para a tela de login
    window.location.href = "/";
  }

  const [userProfile, setUserProfile] = useState<{
    name: string;
    email: string;
  } | null>(null);

  useEffect(() => {
    async function getProfile() {
      const { data: authData } = await supabase.auth.getUser();

      if (!authData.user) return;

      const { data, error } = await supabase
        .from("users")
        .select("name, email")
        .eq("id", authData.user.id)
        .single();

      if (error) {
        console.log("ERRO AO BUSCAR PERFIL:", error);
        return;
      }

      setUserProfile(data);
    }

    getProfile();
  }, []);

  return (
    <div className="bg-dark h-screen font-primary">
      <div className="lg:flex h-screen overflow-hidden">
        {" "}
        <div className="flex justify-between p-4 lg:hidden">
          <Menu className="text-light" />
          <img
            src="https://i.pinimg.com/736x/4a/5f/3a/4a5f3aef362f672be1f4fef05a118323.jpg"
            alt="foto ilustrativa de usuário"
            className="w-8 h-8 object-cover object-top rounded-full border-2 border-light"
          />
        </div>
        <div className="bg-black w-82 h-screen py-4 px-3 hidden justify-between lg:flex lg:flex-col overflow-y-auto">
          <img
            src={logoLight}
            alt="logo versão clara do BoardX"
            className="max-w-52"
          />

          <div className="flex flex-col gap-4 mt-6">
            {links.map((link, index) => (
              <div key={link.id}>
                <button
                  // onClick={() => setLinkActive(link.id)}
                  className={`text-light flex items-center gap-3 py-3 w-full rounded-xl px-4  ${index === 0 ? "text-white cursor-pointer" : "text-white opacity-50 cursor-not-allowed"}`}
                >
                  <span>{link.icon}</span> <p>{link.label}</p>
                </button>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between mt-12 opacity-30">
            <h1 className="text-light text-[14px]">Meus Boards</h1>
            <button className="flex items-center gap-2 text-light bg-primary p-2 rounded-md text-[12px] cursor-not-allowed">
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
                // onClick={() => setBoardActive(board.id)}
                className={`text-light flex gap-3 items-center p-3 rounded-xl opacity-40 cursor-not-allowed`}
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
                src="https://i.pinimg.com/736x/4a/5f/3a/4a5f3aef362f672be1f4fef05a118323.jpg"
                alt="imagem ilustrativa do usuário"
                className="w-14 h-14 rounded-full object-cover object-top border-2 border-light"
              />

              <div>
                <h1 className="text-light truncate">
                  {userProfile?.name || "Usuário"}
                </h1>
                <p className="text-light text-[12px]">Desenvolvedor</p>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <Settings className="text-light cursor-not-allowed opacity-30" />
              <button
                onClick={handleLogout}
                className="scale-100 hover:scale-90 transition-all duration-300 cursor-pointer"
              >
                {" "}
                <LogOut className="text-light hover:text-red-700  duration-300 transition-colors" />
              </button>
            </div>
          </div>
        </div>
        <div className="bg-[#F3F6FD] h-screen min-w-0 flex-1 rounded-tr-2xl rounded-tl-2xl p-4 lg:rounded-tl-none lg:rounded-tr-none overflow-hidden">
          {" "}
          <div className="hidden lg:flex justify-between items-center mb-10 p-4 border-b border-gray-300 bg-white">
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
                  src="https://i.pinimg.com/736x/4a/5f/3a/4a5f3aef362f672be1f4fef05a118323.jpg"
                  alt="imagem ilustrativa do usuário"
                  className="w-10 h-10 rounded-full object-cover object-top border-2 border-light"
                />

                <div>
                  <h1 className="text-black truncate">
                    {userProfile?.name || "Usuário"}
                  </h1>
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
              <div className="flex gap-2">
                {buttonsInteractives.map((button) => (
                  <button
                    key={button.id}
                    onClick={() => setButtonInteractiveActive(button.id)}
                    disabled
                    className={` hidden cursor-not-allowed opacity-35 items-center gap-2 text-sm p-3 rounded-xl w-full flex-1 ${buttonInteractiveactive === button.id ? "text-primary bg-primary/10" : ""}`}
                  >
                    {button.icon} <p>{button.label}</p>
                  </button>
                ))}

                <div>
                  <button
                    onClick={createColumn}
                    className="flex cursor-pointer items-center gap-2 bg-white sahdow-lg border border-gray-300 text-primary p-3 rounded-sm text-sm"
                  >
                    <Plus className="size-4" /> Coluna
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex mt-4 w-full text-center overflow-x-auto border-b pb-4 border-gray-300">
            {tables.map((table, index) => (
              <React.Fragment key={table.id}>
                <button className="shrink-0 flex text-[12px] min-w-20 flex-1 items-center justify-center gap-2 lg:px-2">
                  <span className="hidden sm:flex">{table.icon}</span>

                  <p className="truncate">
                    {table.label} ({table.numb})
                  </p>
                </button>

                {index < tables.length - 1 && (
                  <div className="h-5 w-px bg-gray-300 self-center shrink-0" />
                )}
              </React.Fragment>
            ))}

            <button className="shrink-0 flex text-[12px] cursor-pointer items-center bg-white border border-gray-300 px-3 rounded-sm ml-2">
              <p className="truncate">Ordenar por:</p>

              <select
                value={ordenarPor}
                onChange={(event) => setOrdenarPor(event.target.value)}
                className="outline-none w-14 text-primary"
              >
                <option value="prazo">Prazo</option>
                <option value="prioridade">Prioridade</option>
              </select>
            </button>
          </div>
          <div className="flex flex-col lg:flex-row gap-4 h-[calc(100vh-220px)] overflow-x-auto overflow-y-auto pb-42 min-w-0">
            {" "}
            {columns.map((column) => {
              const columnTasks = tarefasOrdenadas.filter(
                (task) => task.column === column.id,
              );

              return (
                <ColumnComponent
                  key={column.id}
                  title={column.title}
                  numberTasks={columnTasks.length}
                  onDragOver={(event) => event.preventDefault()}
                  onDrop={() => handleDrop(column.id)}
                >
                  <CardsComponent
                    tasks={columnTasks}
                    onDragStart={(task) => setDraggedTask(task)}
                    onTaskClick={(task) => openTaskDetails(task)}
                    onEdit={(task) => openEditTask(task)}
                    onDelete={(taskId) => deleteTask(taskId)}
                    onAddTask={() => {
                      setColumn(column.id);
                      setModalOpen(true);
                    }}
                  />
                </ColumnComponent>
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
              <div className="relative z-10 w-full max-w-140 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-2xl">
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
                          setPriorityTask(
                            event.target.value as "baixa" | "media" | "alta",
                          )
                        }
                        id="task-priority"
                        className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 px-3 text-sm text-gray-700 outline-none transition focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10"
                      >
                        <option value="baixa">Baixa</option>
                        <option value="media">Média</option>
                        <option value="alta">Alta</option>
                      </select>
                    </div>
                  </div>

                  {/* COLUNA */}
                  <div className="space-y-2">
                    <label className="text-[13px] font-medium text-gray-700">
                      Adicionar tarefa em
                    </label>

                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                      {columns.map((col) => (
                        <button
                          key={col.id}
                          type="button"
                          onClick={() => setColumn(col.id)}
                          className={`rounded-xl border px-3 py-3 text-[10px] sm:text-sm font-medium transition ${
                            column === col.id
                              ? "border-primary bg-primary/5 text-primary"
                              : "border-gray-200 text-gray-500 hover:border-gray-300 hover:bg-gray-50"
                          }`}
                        >
                          {col.title}
                        </button>
                      ))}
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
                    onClick={editingTask ? updateTask : SaveTask}
                    className="rounded-xl bg-primary px-5 py-2.5 text-[13px] font-medium text-white shadow-sm transition hover:opacity-90 active:scale-[0.98]"
                  >
                    {editingTask ? "Salvar alterações" : "Criar tarefa"}
                  </button>
                </div>
              </div>
            </div>
          )}
          {detailsModalOpen && selectedTask && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
              onClick={() => setDetailsModalOpen(false)}
            >
              <div
                className="w-full max-w-lg rounded-sm bg-white p-6 shadow-xl"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Cabeçalho */}
                <div className="flex items-start justify-between gap-4 border-b border-gray-300">
                  <div>
                    <p className="mt-1 text-sm text-gray-500">
                      Detalhes da tarefa
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setDetailsModalOpen(false)}
                    className="flex h-8 w-8 items-center justify-center rounded-sm text-gray-500 hover:bg-gray-100"
                  >
                    ✕
                  </button>
                </div>

                <div className="mt-6 flex items-center gap-2 ">
                  <h3 className="text-sm font-semibold text-gray-700">
                    Título:
                  </h3>

                  <div className="rounded-xl bg-gray-50 text-sm text-gray-600">
                    {selectedTask.label || "Nenhuma descrição adicionada."}
                  </div>
                </div>

                <div className="mt-4 flex flex-col items-start gap-2 border border-gray-300 p-2">
                  <h3 className="mb-2 text-sm font-semibold text-gray-700">
                    Descrição:
                  </h3>

                  <div className="rounded-xl bg-gray-50 text-sm text-gray-600 overflow-y-auto max-h-32">
                    {selectedTask.description ||
                      "Nenhuma descrição adicionada."}
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-medium text-gray-700">
                      Data de entrega
                    </p>

                    <p className="mt-1 text-sm font-semibold text-gray-400">
                      {selectedTask.date || "Sem data"}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-medium text-gray-700">
                      Prioridade
                    </p>

                    <span
                      className="mt-1 inline-block rounded-full px-3 py-1 text-xs font-semibold"
                      style={{
                        backgroundColor: selectedTask.color,
                        color: selectedTask.textColor,
                      }}
                    >
                      {selectedTask.priority}
                    </span>
                  </div>

                  <div>
                    <p className="text-xs font-medium text-gray-700">Status</p>

                    <p className="mt-1 text-sm font-medium text-gray-400">
                      {selectedTask.column === "backlog"
                        ? "A Fazer"
                        : selectedTask.column === "doing"
                          ? "Em Andamento"
                          : "Concluído"}
                    </p>
                  </div>
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
