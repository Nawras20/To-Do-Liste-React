import React, { useState, useEffect, useRef } from 'react';
import './ToDoList.css';

function ToDoList() {
    var lsTodos = getLocalStorage();
    var [todos, setTodos] = useState(lsTodos);
    var [newTaskValue, setNewTaskValue] = useState('');
    var [selectedIndexToEdit, setSelectedIndexToEdit] = useState('');
    var [modalText, setModalText] = useState('');
    const [isMessageVisible, setIsMessageVisible] = useState(false);
    var btnDeleteAllDisabled = false;
    const editModalRef = useRef();

    if (lsTodos === null) {
        lsTodos = [];
        setLocalStorage([]);
    }

    if (lsTodos.length == 0) {
        btnDeleteAllDisabled = true;
    }

    useEffect(() => {
        if (editModalRef) {
            editModalRef.current.addEventListener('show.bs.modal', event => {
                const button = event.relatedTarget;

                const index = button.getAttribute('id');
                setSelectedIndexToEdit(index);

                const tasks = getLocalStorage();
                setModalText(tasks[index].title);
            });
        }
    }, []);

    function getLocalStorage() {
        return JSON.parse(localStorage.getItem("todos"));
    }

    function setLocalStorage(value) {
        localStorage.setItem("todos", JSON.stringify(value));
    }

    function createNewTask() {
        if (newTaskValue != "") {
            var tasks = getLocalStorage()
            var obj = { title: newTaskValue, done: false }
            tasks.push(obj)
            setLocalStorage(tasks);
            setTodos(tasks);
            setNewTaskValue('');
            showMessage();
        }
    }

    function showMessage() {
        setIsMessageVisible(true);

        setTimeout(function () {
            setIsMessageVisible(false);
        }, 2000);
    }

    function checkboxChanged(e) {
        var tasks = getLocalStorage();

        if (e.target.checked === true) {
            tasks[e.target.id].done = true;
        } else {
            tasks[e.target.id].done = false;
        }

        setLocalStorage(tasks);
        setTodos(tasks);
    }

    function editTask() {
        const tasks = getLocalStorage();
        tasks[selectedIndexToEdit].title = modalText;
        setLocalStorage(tasks);
        setTodos(tasks);
    }

    const deleteTask = (index) => {
        var tasks = getLocalStorage();
        tasks.splice(index, 1);
        setLocalStorage(tasks);
        setTodos(tasks);
    }

    function deleteAllTasks() {
        var newArray = [];
        setLocalStorage(newArray);
        setTodos(newArray);
    }

    return (
        <main>
            <div className="container">
                <div className="row justify-content-center mt-3">
                    <div className="col-md-6 gy-2">
                        <input id="new-task" className="form-control" type="text" placeholder="Neue Aufgabe" value={newTaskValue} onChange={e => setNewTaskValue(e.target.value)} />
                    </div>
                    <div className="col-md-3 gy-2">
                        <button id="btn-add" className="btn btn-primary" onClick={createNewTask}> Hinzufügen </button>
                    </div>
                </div>
                <div className="row justify-content-center mt-3">
                    <div id="message" className="col-md-9">
                        {todos.length == 0 &&
                            <div className="alert alert-warning"> Keine Aufgaben verfügbar! </div>
                        }
                        {isMessageVisible &&
                            <div className='alert alert-success'>
                                Neue Aufgabe wurde hinzugefügt.
                            </div>
                        }
                    </div>
                </div>
                <div className="row justify-content-center mt-3">
                    <div className="col-md-9 ps-4 pe-4">
                        <ul id="task-list" className="list-group">
                            {todos.map((todo, index) => (
                                <li key={index} id={"Todo-" + index} className="row list-group-item d-flex justify-content-between align-items-center">
                                    <div className="col-lg-9 text-start">
                                        <input id={index} type="checkbox" className="form-check-input me-1" onChange={checkboxChanged} checked={todo.done}></input>
                                        <label className="form-check-label" htmlFor={index}>
                                            {todo.title}
                                        </label>
                                    </div>
                                    <div className="col-lg-3">
                                        <button type="button" id={index} className="btn btn-outline-secondary btn-sm btns" data-bs-toggle="modal" data-bs-target="#editModal">
                                            Bearbeiten
                                        </button>
                                        <button type="button" className="btn btn-outline-danger btn-sm btns" onClick={() => deleteTask(index)}>
                                            Löschen
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="row justify-content-center my-3">
                    <div className="col-md-9 text-start">
                        <button type="button" className="btn btn-danger" onClick={deleteAllTasks} disabled={btnDeleteAllDisabled}>Die Liste Löschen</button>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="editModal" tabIndex="-1" aria-labelledby="editModalLabel" aria-hidden="true" ref={editModalRef}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="editModalLabel">To-Do Bearbeiten</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <textarea className="form-control" value={modalText} onChange={e => setModalText(e.target.value)} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Schließen</button>
                            <button type="button" className="btn btn-success" data-bs-dismiss="modal" onClick={editTask}>Speichern</button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default ToDoList;