import { useState, useEffect } from "react"

type ListItemType = {
    id: string;
    inputValue: string;
}

function Exercice1() {

    const [listTodos, setListTodos] = useState<ListItemType[]>([])
    const [inputValue, setInputValue] = useState<string>("")
    const [editId, setEditId] = useState<string>("")

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) =>{
        setInputValue(event.target.value)
    }

    const handleClickButton = () =>{
        if (editId) {
            const newListTodos = listTodos.map((todo) => todo.id === editId ? { ...todo, inputValue} : todo)
            setListTodos(newListTodos);
            setEditId("");

        } else {
            setListTodos([...listTodos, { id:String(Math.random()), inputValue }])
        }
        setInputValue("");
    }

    useEffect(() => {

    }, [editId])


    const handleClickDeleteButton = (event: React.MouseEvent<HTMLButtonElement>) => {
        const data = event.currentTarget.dataset
        if (!data.todo) return;
        const newListTodos = listTodos.filter((todo) => todo.id !== data.todo)
        setListTodos(newListTodos);
    }

    const handleClickEditButton = (todo : ListItemType) => {
        setInputValue(todo.inputValue);
        setEditId(todo.id);
    }

    const handleCancelEdit = () => {
        setInputValue("");
        setEditId("");
    }

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                backgroundColor:"CadetBlue",
                borderRadius: 10,
                padding: 20,
            }}>
            <h1
                style={{
                    marginBlock:20,
                }}>
                    Todo List</h1>
            <input 
                style={{
                    padding:20,
                    marginBlock: 20
                }}
                placeholder="Ajouter une tâche"
                type="text"
                name="todo-input" 
                value={inputValue}
                onChange={handleInputChange}
            />

            
            <button onClick={handleClickButton}>
                {editId ? "Editer" : "Ajouter" }
            </button>

            {listTodos.length ? (
            <ul>
                {listTodos.map((todo) => (
                    <li
                        style={{
                            listStyleType: "circle",
                        }}
                        key={todo.id}
                    >
                        {todo.inputValue} 
                        <button
                            style={{
                                fontSize: 15,
                            }}
                            data-todo={todo.id}
                            onClick={handleClickDeleteButton}
                            disabled={editId === todo.id}
                        > 
                            Supprimer 
                        </button>
                        {editId ? (
                            <button
                            onClick={handleCancelEdit}> Annuler</button>
                            
                            ) : (
                                <button
                                style={{
                                    fontSize: 15,
                                }}
                                onClick={() => handleClickEditButton(todo)}
                            > Editer </button>
                            
                            )
                        }
                    </li>
                ))}
            </ul>
            ) : (
                <p>La liste est vide</p>
            )}
        </div>
    )
}

export default Exercice1;