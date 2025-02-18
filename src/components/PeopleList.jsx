import { useState } from "react";

const ParentListItem = ({ people, setPeople }) => {
    const handleIncrement = (event, label) => {
        event.stopPropagation();
        event.preventDefault(); 
        event.target.parentElement.parentElement.style.color = 'black'
        setPeople((prev) => {
            const updated = { ...prev };
            if(updated[label] == 9){
                event.target.parentElement.parentElement.style.color = 'red'
            }else{
                updated[label] += 1;
            }
            return updated;
        });
    };

    const handleDecrement = (event, label) => {
        event.stopPropagation();
        event.preventDefault();
        event.target.parentElement.parentElement.style.color = 'black'
        setPeople((prev) => {
            if (prev[label] > 0) {
                return { ...prev, [label]: prev[label] - 1 };
            }
            return prev;
        });
    };

    return (
        <div className="dropdown m-1">
            <button className="btn btn-secondary dropdown-toggle w-100 sm:w-auto" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                People-{Object.values(people)}
            </button>
            <ul className="dropdown-menu">
                {Object.entries(people).map(([key, value]) => (
                    <PeopleListItem label={key} key={key} count={value} onIncrement={handleIncrement} onDecrement={handleDecrement} />
                ))}
            </ul>
        </div>
    );
};

function PeopleListItem({ label, description, count, onIncrement, onDecrement }) {
    return (
        <li className="list-group-item d-flex justify-content-between align-items-start">
            <div className="ms-2 me-auto">
                <div className="fw-bold" id={`people-type-${label}`}>{label}</div>
                {description}
            </div>
            <div>
                <span className="badge bg-primary rounded-pill span-people-counter" onClick={(e) => onIncrement(e, label)}>+</span>
                <span className="badge text-dark rounded-pill span-people-counter">{count}</span>
                <span className="badge bg-secondary rounded-pill span-people-counter" onClick={(e) => onDecrement(e, label)}>-</span>
            </div>
            <hr />
        </li>
    );
}

export default ParentListItem;
