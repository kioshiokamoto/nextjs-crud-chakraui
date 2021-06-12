import {
	Button,
	Input,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
} from '@chakra-ui/react';

function UpdateModal({ finalRef, isModalOpen, handleClose, updateTodo, setUpdateTodo, handleSave, updateTodoId }) {
	return (
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
					<Button colorScheme="purple" onClick={() => handleSave(updateTodoId, 'update')}>
						Guardar
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
}

export default UpdateModal;
