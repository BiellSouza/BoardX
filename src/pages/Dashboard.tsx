// import SidebarComponent from "../components/Sidebar";
import { useState } from "react";
import fotoUser from "../assets/MinhaFoto.jpeg";
import logo from "../assets/logoDesktop.png";
import logoLight from "../assets/logoDesktopLight.png";

import {
  Calendar,
  ChartNoAxesColumn,
  ChevronDown,
  Filter,
  FireExtinguisher,
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
  const cardsAFazer = [
    {
      label: "Definir estrutura do projeto",
      date: "12 Set",
      priority: "Média",
      color: "#FEEEB7",
      textColor: "#9F480E",
    },
    {
      label: "Criar protótipo do layoult",
      date: "14 Set",
      priority: "Alta",
      color: "#FED6E1",
      textColor: "#FC212A",
    },
    {
      label: "Configurar repositório Git",
      date: "13 Set",
      priority: "Baixa",
      color: "#CCEDE0",
      textColor: "#296847",
    },
  ];

  const cardsEmProgresso = [
    {
      label: " Baixar dependências",
      date: "12 Set",
      priority: "Média",
      color: "#FEEEB7",
      textColor: "#9F480E",
    },
  ];

  const cardsConcluido = [
    {
      label: "  projeto",
      date: "12 Set",
      priority: "Média",
      color: "#FEEEB7",
      textColor: "#9F480E",
    },
    {
      label: "Analisar Code",
      date: "13 Set",
      priority: "Baixa",
      color: "#CCEDE0",
      textColor: "#296847",
    },
  ];

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

  const [modalOpen, setModalOpen] = useState(false);

  const [selectButton, setSelectButton] = useState("todo");

  function AddCards() {
    setModalOpen(true);
  }

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

  return (
    <div className="bg-dark h-screen font-primary">
      <div className="lg:flex justify-between overflow-y-hidden">
        <div className="flex justify-between p-4 lg:hidden">
          <Menu className=" text-light" />
          <img
            src={fotoUser}
            alt="foto ilustrativa de usuário"
            className="w-8 h-8 object-cover object-top rounded-full border-2 border-light"
          />
        </div>

        <div className="bg-dark w-82 h-screen p-4 hidden lg:flex lg:flex-col">
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
          <div className="flex justify-between items-center mb-10 pb-4 border-b border-gray-300 bg-white">
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
              <div className="flex gap-2">
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
                className={`shrink-0 px-4 py-3 cursor-pointer rounded-lg border text-[12px] transition flex items-center gap-2 w-full flex-1 justify-center lg:px-2 ${
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
          <div className="sm:overflow-y-auto flex flex-col h-screen pb-42 lg:flex-row justify-between lg:gap-4 xl:gap-6">
            {" "}
            <div className="mt-4 border border-gray-300 h-fit rounded-xl rounded-tr-2xl rounded-tl-2xl bg-[#F3F5FD] w-full">
              <div className="flex justify-between bg-primary/10 border-t-2 border-primary p-2 rounded-tr-2xl rounded-tl-2xl">
                <h1>A Fazer</h1>
                <p className="bg-primary/20 w-6 h-6 text-center pt-1 rounded-full text-xs">
                  {cardsAFazer.length}
                </p>
              </div>
              <div className="mt-1.5">
                <div className="flex flex-col gap-2 sm:p-1">
                  {cardsAFazer.map((card, index) => (
                    <div
                      key={index}
                      className="flex flex-col gap-2 p-4 border border-gray-300 bg-white rounded-xl cursor-pointer"
                    >
                      <p className="text-[14px] text-black/90">{card.label}</p>
                      <div className=" flex items-center justify-between">
                        <div className="flex gap-6">
                          {" "}
                          <p
                            className="text-sm w-fit py-1 px-4 rounded-md lg:text-[12px]"
                            style={{
                              backgroundColor: card.color,
                              color: card.textColor,
                            }}
                          >
                            {card.priority}
                          </p>
                          <div className="flex gap-3 items-center lg:gap-0">
                            <Calendar className="size-4 text-secondary" />{" "}
                            <p className="text-sm text-secondary">
                              {card.date}
                            </p>
                          </div>
                        </div>{" "}
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
                  onClick={() => AddCards()}
                  className="flex items-center gap-2 text-primary justify-center w-fit mx-auto py-4 cursor-pointer"
                >
                  <Plus className="size-4" />
                  Adicionar tarefa
                </button>
              </div>
            </div>
            <div className="mt-4 border border-gray-300 h-fit rounded-xl rounded-tr-2xl rounded-tl-2xl bg-[#F3F5FD] w-full">
              <div className="flex justify-between bg-blue-700/10 border-t-2 border-blue-700 p-2 rounded-tr-2xl rounded-tl-2xl">
                <h1>Em Andamento</h1>
                <p className="bg-blue-700/20 w-6 h-6 text-center pt-1 rounded-full text-xs">
                  {cardsEmProgresso.length}
                </p>
              </div>
              <div className="mt-1.5">
                <div className="flex flex-col gap-2 sm:p-1">
                  {cardsEmProgresso.map((card, index) => (
                    <div
                      key={index}
                      className="flex flex-col gap-2 p-4 border border-gray-300 bg-white rounded-xl cursor-pointer "
                    >
                      <p className="text-[14px] text-black/90">{card.label}</p>
                      <div className=" flex items-center justify-between">
                        <div className="flex gap-6">
                          {" "}
                          <p
                            className="text-sm w-fit py-1 px-4 rounded-md lg:text-[12px]"
                            style={{
                              backgroundColor: card.color,
                              color: card.textColor,
                            }}
                          >
                            {card.priority}
                          </p>
                          <div className="flex gap-3 items-center lg:gap-0">
                            <Calendar className="size-4 text-secondary" />{" "}
                            <p className="text-sm text-secondary">
                              {card.date}
                            </p>
                          </div>
                        </div>{" "}
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
                  onClick={() => AddCards()}
                  className="flex items-center gap-2 text-primary justify-center w-fit mx-auto py-4 cursor-pointer"
                >
                  <Plus className="size-4" />
                  Adicionar tarefa
                </button>
              </div>
            </div>
            <div className="mt-4 border border-gray-300 h-fit rounded-xl rounded-tr-2xl rounded-tl-2xl bg-[#F3F5FD] w-full">
              <div className="flex justify-between bg-green-700/10 border-t-2 border-green-700 p-2 rounded-tr-2xl rounded-tl-2xl">
                <h1>Concluído</h1>
                <p className="bg-green-700/20 w-6 h-6 text-center pt-1 rounded-full text-xs">
                  {cardsConcluido.length}
                </p>
              </div>
              <div className="mt-1.5">
                <div className="flex flex-col gap-2 sm:p-1">
                  {cardsConcluido.map((card, index) => (
                    <div
                      key={index}
                      className="flex flex-col gap-2 p-4 border border-gray-300 bg-white rounded-xl cursor-pointer "
                    >
                      <p className="text-[14px] text-black/90">{card.label}</p>
                      <div className=" flex items-center justify-between">
                        <div className="flex gap-6">
                          {" "}
                          <p
                            className="text-sm w-fit py-1 px-4 rounded-md lg:text-[12px]"
                            style={{
                              backgroundColor: card.color,
                              color: card.textColor,
                            }}
                          >
                            {card.priority}
                          </p>
                          <div className="flex gap-3 items-center lg:gap-0">
                            <Calendar className="size-4 text-secondary" />{" "}
                            <p className="text-sm text-secondary">
                              {card.date}
                            </p>
                          </div>
                        </div>{" "}
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
                  onClick={() => AddCards()}
                  className="flex items-center gap-2 text-primary justify-center w-fit mx-auto py-4 cursor-pointer"
                >
                  <Plus className="size-4" />
                  Adicionar tarefa
                </button>
              </div>
            </div>
          </div>

          {modalOpen === true && (
            <div>
              <div className="inset-0 bg-black/30 w-full h-screen absolute z-0" />{" "}
              <div className="fixed inset-0 flex justify-center items-center w-full lg:left-32">
                <div className="flex flex-col gap-4 bg-white border border-gray-300 w-fit p-4 rounded-2xl max-w-[95%] z-10">
                  <button onClick={() => setModalOpen(!modalOpen)}>
                    <X className="text-secondary" />
                  </button>
                  <img
                    src={logo}
                    alt="logo da BoardX"
                    className="w-42 object-cover m-auto mb-4"
                  />
                  <div className="flex gap-2 items-center justify-between">
                    {" "}
                    <label htmlFor="" className="text-sm">
                      Nome:
                    </label>
                    <input
                      type="text"
                      placeholder="Nome da Tarefa"
                      className="border-b border-gray-400 outline-none w-full"
                    />
                  </div>
                  <div className="flex items-center gap-2 justify-between">
                    <label htmlFor="" className="text-sm">
                      Selecione a Prioridade
                    </label>
                    <select
                      name=""
                      id=""
                      className="border border-gray-400 rounded-md w-32"
                    >
                      <option value="option1">Média</option>
                      <option value="option1">Alta</option>
                      <option selected value="option1">
                        Baixa
                      </option>
                    </select>
                  </div>

                  <div className="flex items-center gap-2 justify-between">
                    <label htmlFor="" className="text-sm">
                      Selecione a data
                    </label>
                    <input
                      type="date"
                      className="border border-gray-400 p-2 rounded-md text-sm"
                    />
                  </div>
                  <button className="border border-light bg-primary text-light p-2 w-full rounded-xl cursor-pointer">
                    Salvar
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
