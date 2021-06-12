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
	Alert,
	AlertIcon,
	AlertTitle,
	AlertDescription,
} from '@chakra-ui/react';
function Navbar({ newTodo, setNewTodo, handleSave }) {
	return (
		<Flex paddingX={{ md: '8', sm: '4' }} direction={{ md: 'row', sm: 'column' }} marginBottom="12">
			<Flex
				justifyContent={{ md: 'start', sm: 'center' }}
				alignItems="center"
				w={{ md: 'md', sm: 'full' }}
				mb={{ sm: '8', md: '0' }}
			>
				<Heading my="auto" fontSize={{ md: 'md', sm: '3xl' }} color="purple.700" fontFamily="sans-serif">
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
	);
}

export default Navbar;
