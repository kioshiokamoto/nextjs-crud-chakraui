import { nanoid } from 'nanoid';
import { useRef, useState } from 'react';

function useTodo(data) {
	const [todos, setTodos] = useState(data);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const [newTodo, setNewTodo] = useState('');
	const [updateTodo, setUpdateTodo] = useState('');
	const [updateTodoId, setUpdateTodoId] = useState('');

	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');

	const finalRef = useRef();
	const handleClose = () => {
		setUpdateTodo('');
		setUpdateTodoId('');
		setIsModalOpen(false);
	};
	const handleSave = async (id = nanoid(), type = 'create') => {
		if (type === 'update') {
			try {
				if (!(updateTodo.trim().length > 3)) {
					return;
				}
				await fetch(`http://localhost:3001/todos/${id}`, {
					method: 'PATCH',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ todo: updateTodo }),
				});
				setTodos((prev) => prev.map((el) => (el.id === id ? { ...el, todo: updateTodo } : el)));
				setSuccess('Se actualizó tarea exitosamente');
			} catch (error) {
				console.log(error);
				setError(error);
			}
			setTimeout(() => {
				setSuccess('');
				setError('');
			}, 1500);
			handleClose();
			return;
		}
		try {
			if (!(newTodo.trim().length > 3)) return;
			const res = await fetch(`http://localhost:3001/todos/`, {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ todo: newTodo, id, completed: false }),
			});
			const data = await res.json();
			setNewTodo('');
			setTodos((prev) => [...prev, data]);
			setSuccess('Se creó tarea exitosamente');
		} catch (error) {
			console.log(error);
			setError(error);
		}
		setTimeout(() => {
			setSuccess('');
			setError('');
		}, 1500);
	};
	const handleCheck = async (element) => {
		try {
			await fetch(`http://localhost:3001/todos/${element.id}`, {
				method: 'PATCH',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ completed: !element.completed }),
			});
			setTodos((prev) => prev.map((el) => (el.id === element.id ? { ...el, completed: !el.completed } : el)));
			// setSuccess('Se marco correctamente')
		} catch (error) {
			console.log(error);
			setError(error);
		}
		setTimeout(() => {
			setSuccess('');
			setError('');
		}, 1500);
	};
	const handleDelete = async (id) => {
		try {
			await fetch(`http://localhost:3001/todos/${id}`, {
				method: 'DELETE',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
			});
			setTodos((prev) => prev.filter((el) => el.id !== id));
			setSuccess('Se eliminó tarea exitosamente');
		} catch (error) {
			console.log(error);
			setError(error);
		}
		setTimeout(() => {
			setSuccess('');
			setError('');
		}, 1500);
	};
	const handleOpenModal = (element) => {
		setUpdateTodo(element.todo);
		setUpdateTodoId(element.id);
		setIsModalOpen(true);
	};
	return {
		todos,
		setTodos,
		isModalOpen,
		setIsModalOpen,
		newTodo,
		setNewTodo,
		updateTodo,
		setUpdateTodo,
		updateTodoId,
		setUpdateTodoId,
		error,
		setError,
		success,
		setSuccess,
		finalRef,
		handleClose,
		handleSave,
		handleCheck,
		handleDelete,
		handleOpenModal,
	};
}

export default useTodo;
