import Head from 'next/head';
import Image from 'next/image';
import {
	Container,
	Flex,
	Spacer,
	Box,
	Heading,
	Button,
	Input,
	Checkbox,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
} from '@chakra-ui/react';
import { useRef, useState } from 'react';

export default function Home({ data = [] }: { data: any }) {
	const [todos, setTodos] = useState(data);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const [newTodo, setNewTodo] = useState('');
	const [updateTodo, setUpdateTodo] = useState('');

	const finalRef = useRef();
	const handleClose = () => {
		setUpdateTodo('');
		setIsModalOpen(false);
	};
	const handleSave = (type = 'create') => {
		if (type === 'update') {
			console.log('update: ', updateTodo);
			handleClose();
			return;
		}

		console.log('create: ', newTodo);
	};
	const handleCheck = async (element) => {
		try {
			const res = await fetch(`http://localhost:3001/todos/${element.id}`, {
				method: 'PATCH',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ completed: !element.completed }),
			});
			const data = await res.json();
			console.log(data);
			setTodos((prev) => prev.map((el) => (el.id === element.id ? { ...el, completed: !el.completed } : el)));
		} catch (error) {
			console.log(error);
		}
	};
	const handleOpenModal = (element) => {
		setUpdateTodo(element.todo);
		setIsModalOpen(true);
	};
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
						<Flex paddingX={{ md: '8', sm: '4' }} direction={{ md: 'row', sm: 'column' }} marginBottom="12">
							<Flex
								justifyContent={{ md: 'start', sm: 'center' }}
								alignItems="center"
								w={{ md: 'md', sm: 'full' }}
								mb={{ sm: '8', md: '0' }}
							>
								<Heading
									my="auto"
									fontSize={{ md: 'md', sm: '3xl' }}
									color="purple.700"
									fontFamily="sans-serif"
								>
									Nextjs - CRUD
								</Heading>
							</Flex>
							<Spacer />

							<Flex w={{ sm: 'full' }}>
								<Input
									placeholder="Basic usage"
									width={{ md: '72', sm: 'full' }}
									marginRight="4"
									value={newTodo}
									onChange={(e) => setNewTodo(e.target.value)}
								/>
								<Button
									width={{ md: 'auto', sm: '32' }}
									colorScheme="purple"
									onClick={() => {
										handleSave();
									}}
								>
									Agregar
								</Button>
							</Flex>
						</Flex>
						<Flex
							px="4"
							marginX={{ md: '8', sm: '4' }}
							flexDirection="column"
							border="1px"
							borderColor="gray.200"
							borderRadius="sm"
						>
							{todos &&
								todos.map((element) => (
									<Flex my="4" justifyContent="space-between" key={element.id}>
										<Checkbox
											isChecked={element.completed}
											colorScheme="purple"
											textDecorationLine={`${element.completed ? `line-through` : `none`}`}
											onChange={() => handleCheck(element)}
										>
											{element.todo}
										</Checkbox>
										<Flex>
											<Button
												colorScheme="purple"
												variant="outline"
												onClick={() => {
													handleOpenModal(element);
												}}
												marginRight="2"
											>
												Editar
											</Button>
											<Button
												colorScheme="purple"
												variant="ghost"
												onClick={() => {
													console.log('Eliminar');
												}}
											>
												Eliminar
											</Button>
										</Flex>
									</Flex>
								))}
						</Flex>
					</Flex>
					<Modal
						finalFocusRef={finalRef}
						isOpen={isModalOpen}
						onClose={() => {
							handleClose();
						}}
					>
						<ModalOverlay />
						<ModalContent>
							<ModalHeader>Editar Todo</ModalHeader>

							<ModalBody>
								<Input
									placeholder="Actividad..."
									width="full"
									marginRight="4"
									value={updateTodo}
									onChange={(e) => setUpdateTodo(e.target.value)}
								/>
							</ModalBody>

							<ModalFooter>
								<Button colorScheme="purple" variant="ghost" mr={3} onClick={() => handleClose()}>
									Cancelar
								</Button>
								<Button colorScheme="purple" onClick={() => handleSave('update')}>
									Guardar
								</Button>
							</ModalFooter>
						</ModalContent>
					</Modal>
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
