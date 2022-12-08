import {
    Button,
    Modal,
    TextInput,
    Group,
    Textarea
}
    from '@mantine/core';
import { useState } from 'react';

import {
    MantineProvider,
    ColorSchemeProvider,
} from '@mantine/core';
import { useHotkeys, useLocalStorage } from '@mantine/hooks';

export default function Note(props) {
    const [task, setTask] = useState({
        title: "",
        summary: ""
    });
    const [colorScheme, setColorScheme] = useLocalStorage({
        key: 'mantine-color-scheme',
        defaultValue: 'light',
        getInitialValueInEffect: true,
    });
    const toggleColorScheme = value =>
        setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

    useHotkeys([['mod+J', () => toggleColorScheme()]]);

    function changeHandler(e) {
        setTask((prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        });
    }

    function createTask() {

        fetch("http://127.0.0.1:4000/tasks", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        });
        setTask({
            title: "",
            summary: ""
        });
    }

    return (
        <ColorSchemeProvider
            colorScheme={colorScheme}
            toggleColorScheme={toggleColorScheme}>
            <MantineProvider
                theme={{ colorScheme, defaultRadius: 'md' }}
                withGlobalStyles
                withNormalizeCSS>
                <div className='App'>
                    <Modal
                        opened={true}
                        size={'md'}
                        withCloseButton={false}
                        centered>
                        <Group mt={'md'} position={'right'}>
                            <Button
                            variant='outline'
                                onClick={() => {
                                    props.switchMenu(false);
                                }}>
                                All Notes
                            </Button>
                        </Group>
                        <TextInput
                            mt={'md'}
                            value={task.title}
                            placeholder={'Task Title'}
                            required
                            label={'Title'}
                            onChange={changeHandler}
                            name={'title'}
                        />
                        <Textarea
                            value={task.summary}
                            name={'summary'}
                            mt={'xs'}
                            minRows={10}
                            placeholder={'Task Summary'}
                            label={'Summary'}
                            onChange={changeHandler}
                        />
                        <Group mt={'md'} position={'apart'}>
                            <Button
                                onClick={() => {
                                    createTask();
                                }}>
                                Create Task
                            </Button>
                        </Group>
                    </Modal>
                </div>
            </MantineProvider>
        </ColorSchemeProvider>
    );
}