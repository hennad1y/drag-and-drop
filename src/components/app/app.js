import React, {useState} from "react";
import "./app.css";

const App = () => {

    const [overState, setOverState] = useState(null);
    const [currentDragItem, setCurrentDragItem] = useState(null);

    const dragStart = (e) => {
        const el = e.target;
        setCurrentDragItem(el);
        el.classList.add('hide');
    };

    const drop = () => {
        currentDragItem.classList.remove('hide');
        setCurrentDragItem(null);
        setOverState(null);
    };

    const dragOver = (e) => {
        e.preventDefault();

        const el = e.target;
        if (overState === el) return;
        if (!el.id) return;
        if (currentDragItem === el) return;

        if (el.id === 'tasks' || el.id === 'progress' || el.id === 'done') {
            if (e.pageY >= el.lastChild.offsetTop) {
                el.appendChild(currentDragItem);
            }
            return;
        }

        el.parentNode.insertBefore(currentDragItem, el);
        setOverState(el);
        console.log('here');
    };

    return (
        <div className="app-wrapper">
            <div className="tasks" id="tasks" onDrop={e => drop()} onDragOver={e => dragOver(e)}
                 onDragStart={e => dragStart(e)}>
                <div>Задачи</div>
                <div draggable="true" id="one">Task 1</div>
                <div draggable="true" id="two">Task 2</div>
                <div draggable="true" id="three">Task 3</div>
                <div draggable="true" id="four">Task 4</div>
            </div>
            <div className="progress" id="progress" onDrop={e => drop(e)} onDragOver={e => dragOver(e)}
                 onDragStart={e => dragStart(e)}>
                <div>В разработке</div>
                <div draggable="true" id="progress-one">Task 1</div>
                <div draggable="true" id="progress-two">Task 2</div>
            </div>
            <div className="done" id="done" onDrop={e => drop(e)} onDragOver={e => dragOver(e)}
                 onDragStart={e => dragStart(e)}>
                <div>Завершены</div>
                <div draggable="true" id="done-one">Task 1</div>
                <div draggable="true" id="done-two">Task 2</div>
                <div draggable="true" id="done-three">Task 3</div>
            </div>
        </div>
    )
};

export default App;