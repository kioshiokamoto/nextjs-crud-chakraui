import Head from 'next/head';
import Image from 'next/image';
import { Container, Flex, Spacer, Box, Heading, Button, Input } from '@chakra-ui/react';

export default function Home() {
	return (
		<>
			<Head>
				<title>CRUD NEXT - JS</title>
				<meta name="description" content="Test de nextjs y chakraui" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main>
				<Container centerContent maxW="container.md">
					<Flex flexDirection="column" paddingY="16" width="full" border="4px" justifyContent="center">
						<Flex paddingX={{ md: '8', sm: '2' }} direction={{ md: 'row', sm: 'column' }}>
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
								<Input placeholder="Basic usage" width={{ md: '72', sm: 'full' }} marginRight="4" />
								<Button
									width={{ md: 'auto', sm: '32' }}
									colorScheme="purple"
									onClick={() => {
										console.log('Agregar');
									}}
								>
									Agregar
								</Button>
							</Flex>
						</Flex>
					</Flex>
				</Container>
			</main>
		</>
	);
}

export async function getServerSideProps(ctx) {
	console.log('objeto');
	return {
		props: {
			data: [],
		},
	};
}
