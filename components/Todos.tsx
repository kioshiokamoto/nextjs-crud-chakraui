import { Button, Checkbox, Flex } from '@chakra-ui/react';
function Todos({ todos, setTodos, handleCheck, handleOpenModal, handleDelete }) {
	return (
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
									handleDelete(element.id);
								}}
							>
								Eliminar
							</Button>
						</Flex>
					</Flex>
				))}
		</Flex>
	);
}

export default Todos;
