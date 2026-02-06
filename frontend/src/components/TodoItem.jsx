import {useState} from 'react';
import { apiService } from '../services/api';


const TodoItem = ({ task, onDelete, key }) => {
    const [isToggle, setIsToggle] = useState(false)
    const onToggle = async()=>{
        setIsToggle(!isToggle)
        if (isToggle === true) {
            await apiService.updateTaskStatus(task.id, 1)
        }else{
            await apiService.updateTaskStatus(task.id, 0)
        }
    }

    return (
        <li id={`task-${task.id}`} key={key} className={`todo-item ${task.is_done || isToggle ? 'completed' : ''}`}>
            <div className="task-content">
                <input
                    type="checkbox"
                    className="task-checkbox"
                    checked={task.is_done === 1 || isToggle === true}
                    onChange={onToggle}
                />
                <span className="task-text">{task.title}</span>
            </div>
            <div className="task-actions">
                <button onClick={onDelete} className="delete-btn">
                    <i className="fas fa-trash"></i>
                </button>
            </div>
        </li>
    );
};

export default TodoItem;