import { Calendar, Pencil, Plus, Trash } from "lucide-react";

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

type CardsProps = {
  tasks: Task[];
  onDragStart: (task: Task) => void;
  onTaskClick: (task: Task) => void;
  onEdit: (task: Task) => void;
  onDelete: (taskId: number) => void;
  onAddTask: () => void;
};

function CardsComponent({
  tasks,
  onDragStart,
  onTaskClick,
  onEdit,
  onDelete,
  onAddTask,
}: CardsProps) {
  return (
    <div className="mt-1.5">
      <div className="flex flex-col gap-2 sm:p-1">
        {tasks.map((task) => (
          <div
            key={task.id}
            draggable
            onDragStart={() => onDragStart(task)}
            onClick={() => onTaskClick(task)}
            className="flex w-full min-w-0 flex-col gap-2 p-4 border border-gray-300 bg-white rounded-sm cursor-pointer"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0 flex-1">
                <p className="text-[14px] text-black/90 break-words">
                  {task.label}
                </p>

                <p className="text-[14px] text-black/90 line-clamp-2 break-words">
                  {task.description}
                </p>
              </div>

              <div className="flex shrink-0 items-center gap-1">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit(task);
                  }}
                  className="p-1.5 rounded-md text-gray-400 hover:bg-primary/10 hover:text-primary"
                >
                  <Pencil className="size-4" />
                </button>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(task.id);
                  }}
                  className="p-1.5 rounded-md text-gray-400 hover:bg-red-50 hover:text-red-500"
                >
                  <Trash className="size-4" />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex gap-3">
                {task.priority && (
                  <p
                    className="text-sm w-fit py-1 px-2 rounded-md lg:text-[12px] xl:px-3"
                    style={{
                      backgroundColor: task.color,
                      color: task.textColor,
                    }}
                  >
                    {task.priority}
                  </p>
                )}

                <div className="flex gap-3 items-center lg:gap-1">
                  <Calendar className="size-3 text-secondary" />

                  <p className="text-[12px] lg:text-[10px] text-secondary xl:text-sm">
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
                src="https://i.pinimg.com/736x/4a/5f/3a/4a5f3aef362f672be1f4fef05a118323.jpg"
                alt="foto ilustrativa do usuário"
                className="w-6 h-6 object-cover object-top rounded-full"
              />
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={onAddTask}
        className="flex items-center gap-2 text-primary justify-center w-fit mx-auto py-4 cursor-pointer"
      >
        <Plus className="size-4" />
        Adicionar tarefa
      </button>
    </div>
  );
}

export default CardsComponent;
