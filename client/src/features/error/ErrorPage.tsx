import { Title, Text, Button, Container, Group } from '@mantine/core';
import classes from './ErrorPageBackground.module.css';
import { useNavigate } from 'react-router-dom';

export function ErrorPage() {
    const navigate = useNavigate();
    return (
      <Container className={classes.root}>
          <div className={classes.label}>404</div>
          <Title className={classes.title}>You have found a secret place.</Title>
          <Text c="dimmed" size="lg" ta="center" className={classes.description}>
              Unfortunately, this is only a 404 page. You may have mistyped the address, or the page has
              been moved to another URL.
          </Text>
          <Group justify="center">
              <Button onClick={() => navigate('/')} variant="subtle" size="md">
                  Take me home country road ...
              </Button>
          </Group>
      </Container>
    );
}