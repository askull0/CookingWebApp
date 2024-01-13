import {Button, Group, Text, Collapse, Box} from '@mantine/core';
import {useDisclosure} from '@mantine/hooks';

export const DisplayComment = () => {
    const [opened, {toggle}] = useDisclosure(false);

    return (
        <Box maw={400} mx="auto" mt={10}>
            <Group justify="center" mb={5}>
                <Button onClick={toggle}>View comments</Button>
            </Group>

            <Collapse in={opened}>
                <Text> comentatrze beda tuuuu</Text>
            </Collapse>
        </Box>
    );
}