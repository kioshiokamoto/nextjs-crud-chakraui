import { Alert, AlertIcon, Flex } from '@chakra-ui/react';
function Alerts({ error, success }) {
	return (
		<Flex mb="4">
			{error && (
				<Alert status="error" marginX={{ md: '8', sm: '4' }}>
					<AlertIcon />
					There was an error processing your request
				</Alert>
			)}
			{success && (
				<Alert status="success" marginX={{ md: '8', sm: '4' }}>
					<AlertIcon />
					{success}
				</Alert>
			)}
		</Flex>
	);
}

export default Alerts;
