import {
	Button,
	Container,
	Text,
	Title,
	Modal,
	TextInput,
	Group,
	Card,
	ActionIcon
}
	from '@mantine/core';
import { useState, useRef, useEffect } from 'react';
import { MoonStars, Sun, Trash } from 'tabler-icons-react';

import {
	MantineProvider,
	ColorSchemeProvider,
} from '@mantine/core';
import { useHotkeys, useLocalStorage } from '@mantine/hooks';

export default function AllNotes(props) {
	const [tasks, setTasks] = useState([]);
	const [opened, setOpened] = useState(false);

	const [colorScheme, setColorScheme] = useLocalStorage({
		key: 'mantine-color-scheme',
		defaultValue: 'light',
		getInitialValueInEffect: true,
	});
	const toggleColorScheme = value =>
		setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

	useHotkeys([['mod+J', () => toggleColorScheme()]]);

	function deleteTask(index) {
		var clonedTasks = [...tasks];

		fetch("http://127.0.0.1:4000/tasks/" + index, {
			method: 'DELETE',
		}).then((res) => {
			clonedTasks.splice(index, 1);

			setTasks(clonedTasks);
		});

	}

	function loadTasks() {
		fetch("http://127.0.0.1:4000/tasks").then(
			(res) => res.json()

		).then((data) => {
			if (data.length) {
				setTasks(data.map((note) => {
					return {
						title: note.heading,
						summary: note.body,
						key: note._id
					}
				}));
			}
		});
	}

	useEffect(() => {
		loadTasks();
	}, []);

	return (
		<ColorSchemeProvider
			colorScheme={colorScheme}
			toggleColorScheme={toggleColorScheme}>
			<MantineProvider
				theme={{ colorScheme, defaultRadius: 'md' }}
				withGlobalStyles
				withNormalizeCSS>
				<div className='App'>
					{/* <Modal
						opened={opened}
						size={'md'}
						title={'New Task'}
						withCloseButton={false}
						onClose={() => {
							setOpened(false);
						}}
						centered>
						<TextInput
							mt={'md'}
							ref={taskTitle}
							placeholder={'Task Title'}
							required
							label={'Title'}
						/>
						<TextInput
							ref={taskSummary}
							mt={'md'}
							placeholder={'Task Summary'}
							label={'Summary'}
						/>
						<Group mt={'md'} position={'apart'}>
							<Button
								onClick={() => {
									setOpened(false);
								}}
								variant={'subtle'}>
								Cancel
							</Button>
							<Button
								onClick={() => {
									createTask();
									setOpened(false);
								}}>
								Create Task
							</Button>
						</Group>
					</Modal> */}
					<Container size={550} my={40}>
						<Group position={'apart'}>
							<Title
								sx={theme => ({
									fontFamily: `Greycliff CF, ${theme.fontFamily}`,
									fontWeight: 900,
								})}>
								All Notes
							</Title>
							<ActionIcon
								color={'blue'}
								onClick={() => toggleColorScheme()}
								size='lg'>
								{colorScheme === 'dark' ? (
									<Sun size={16} />
								) : (
									<MoonStars size={16} />
								)}
							</ActionIcon>
							<Button
								onClick={() => {
									props.switchMenu(true);
								}}>
								Create Note
							</Button>
						</Group>
						{tasks.length > 0 ? (
							tasks.map((task) => {
								if (task.title) {
									return (
										<Card withBorder key={task.key} mt={'sm'}>
											<Group position={'apart'}>
												<Text weight={'bold'}>{task.title}</Text>
												<ActionIcon
													onClick={() => {
														deleteTask(task.key);
													}}
													color={'red'}
													variant={'transparent'}>
													<Trash />
												</ActionIcon>
											</Group>
											<Text color={'dimmed'} size={'md'} mt={'sm'}>
												{task.summary
													? task.summary
													: 'No summary was provided for this task'}
											</Text>
										</Card>
									);
								}
							})
						) : (
							<Text size={'lg'} mt={'md'} color={'dimmed'}>
								You have no tasks
							</Text>
						)}
						{/* <Button
							onClick={() => {
								setOpened(true);
							}}
							fullWidth
							mt={'md'}>
							Notes
						</Button> */}
					</Container>
				</div>
			</MantineProvider>
		</ColorSchemeProvider>
	);
}
