import { Container, Flex } from '@chakra-ui/react';
import Head from 'next/head';
import Alerts from '../components/Alerts';
import Navbar from '../components/Navbar';
import Todos from '../components/Todos';
import UpdateModal from '../components/UpdateModal';
import useTodo from '../hooks/useTodo';

export default function Home({ data = [] }: { data: any }) {
	const {
		todos,
		setTodos,
		isModalOpen,
		newTodo,
		setNewTodo,
		updateTodo,
		setUpdateTodo,
		updateTodoId,
		error,
		success,
		finalRef,
		handleClose,
		handleSave,
		handleCheck,
		handleDelete,
		handleOpenModal,
	} = useTodo(data);
	return (
		<>
			<Head>
				<title>CRUD NEXT - JS</title>
				<meta name="description" content="Test de nextjs y chakraui" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main>
				<Container centerContent maxW="container.md">
					<Flex flexDirection="column" paddingY="16" width="full" justifyContent="center">
						<Navbar newTodo={newTodo} setNewTodo={setNewTodo} handleSave={handleSave} />
						<Alerts error={error} success={success} />
						<Todos
							todos={todos}
							setTodos={setTodos}
							handleCheck={handleCheck}
							handleOpenModal={handleOpenModal}
							handleDelete={handleDelete}
						/>
					</Flex>
					<UpdateModal
						finalRef={finalRef}
						isModalOpen={isModalOpen}
						handleClose={handleClose}
						updateTodo={updateTodo}
						setUpdateTodo={setUpdateTodo}
						handleSave={handleSave}
						updateTodoId={updateTodoId}
					/>
				</Container>
			</main>
		</>
	);
}

export async function getServerSideProps(ctx) {
	// json-server --watch .\db\data.json -p 3001
	const res = await fetch('http://localhost:3001/todos');
	const data = await res.json();

	return {
		props: {
			data: data,
		},
	};
}
