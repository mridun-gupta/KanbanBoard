document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("new-task");
    const input = document.getElementById("task-input");
    const todoLane = document.getElementById("initial");

    const handleDragStart = (e) => e.target.classList.add("drag");
    const handleDragEnd = (e) => e.target.classList.remove("drag");

    const insertAboveTask = (zone, mouseY) => {
        const els = zone.querySelectorAll(".task:not(.drag)");
        let closestTask = null;
        let closestOffset = Number.NEGATIVE_INFINITY;

        els.forEach((task) => {
            const { top } = task.getBoundingClientRect();
            const offset = mouseY - top;

            if (offset < 0 && offset > closestOffset) {
                closestOffset = offset;
                closestTask = task;
            }
        });

        return closestTask;
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        const zone = e.currentTarget;
        const bottomTask = insertAboveTask(zone, e.clientY);
        const draggingTask = document.querySelector(".drag");

        if (bottomTask) {
            zone.insertBefore(draggingTask, bottomTask);
        } else {
            zone.appendChild(draggingTask);
        }
    };

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const value = input.value.trim();

        if (!value) return;

        const newTask = document.createElement("p");
        newTask.classList.add("task");
        newTask.setAttribute("draggable", "true");
        newTask.innerText = value;

        newTask.addEventListener("dragstart", handleDragStart);
        newTask.addEventListener("dragend", handleDragEnd);

        todoLane.appendChild(newTask);
        input.value = "";
    });

    document.querySelectorAll(".task-stake").forEach((zone) => {
        zone.addEventListener("dragover", handleDragOver);
        zone.addEventListener("drop", handleDragOver);
    });

    document.querySelectorAll(".task").forEach((task) => {
        task.addEventListener("dragstart", handleDragStart);
        task.addEventListener("dragend", handleDragEnd);
    });
});