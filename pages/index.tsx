import Head from 'next/head';
import Image from 'next/image';
import { Container, Flex, Spacer, Box, Heading, Button, Input, Checkbox } from '@chakra-ui/react';
import { useState } from 'react';

export default function Home({ data = [] }: { data: any }) {
	const [todos, setTodos] = useState(data);

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
											checked={element.completed}
											colorScheme="purple"
											textDecorationLine={`${element.completed ? `line-through` : `none`}`}
										>
											{element.todo}
										</Checkbox>
										<Flex>
											<Button
												background="purple.100"
												color="purple.800"
												onClick={() => {
													console.log('Editar');
												}}
												marginRight="2"
											>
												Editar
											</Button>
											<Button
												background="purple.700"
												color="purple.50"
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
				</Container>
			</main>
		</>
	);
}

export async function getServerSideProps(ctx) {
	const res = await fetch('http://localhost:3001/todos');
	const data = await res.json();

	return {
		props: {
			data: data,
		},
	};
}
