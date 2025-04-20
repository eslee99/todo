import { Todo } from "../types/todo";

interface TodoItemProps {
  todo: Todo;
  onCompletedChange: (id: number, completed: boolean) => void;
  onDeleteItem: (id: number) => void;
}

export default function TodoItem({
  todo,
  onCompletedChange,
  onDeleteItem,
}: TodoItemProps) {
  function handleDeleteItem(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    onDeleteItem(todo.id);
  }
  console.log("todo", todo);

  return (
    <div>
      <label className="flex items-center gap-2 border rounded-md p-2 border-gray-400 bg-white hover:bg-slate-50">
        <input
          className="scale-125"
          type="checkbox"
          checked={todo.completed}
          onChange={(e) => onCompletedChange(todo.id, e.target.checked)}
        />
        <span className={todo.completed ? "line-through text-gray-500" : ""}>
          {todo.title}
        </span>
        <span className="ml-auto">
          <button
            className="w-16 rounded-md bg-red-500 text-white hover:bg-red-700 transition"
            onClick={handleDeleteItem}
          >
            Delete
          </button>
        </span>
      </label>
    </div>
  );
}
