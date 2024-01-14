import {Button, Group, Text, Collapse, Box} from '@mantine/core';
import {useDisclosure} from '@mantine/hooks';
import React, {useEffect, useState} from "react";
import axios from "axios";

interface CommentProps {
    id: number | undefined;
}

interface Comment {
    text: string;
    author: {
        firstName: string;
        lastName: string;
    };
    publishedDate: string;
}


export const DisplayComment: React.FC<CommentProps> = ({id}) => {
    const [opened, {toggle}] = useDisclosure(false);
    const [comments, setComments] = useState<Comment[]>([]);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axios.get(`/comments/recipe/${id}`);
                setComments(response.data);
            } catch (error) {
                console.error("Error fetching comments:", error);
            }
        };

        fetchComments();
    }, [id]);
    return (
        <Box maw={400} mx="auto" mt={10}>
            <Group justify="center" mb={5}>
                <Button onClick={toggle} color="darkgreen">View comments</Button>
            </Group>

            <Collapse in={opened}>
                {comments.length > 0 ? (
                    comments.map((comment, index) => (
                        <div key={index} style={{marginBottom: '10px'}}>
                            <Text>
                                <strong>{comment.author.firstName} {comment.author.lastName}</strong>:
                            </Text>
                            <Text> {comment.text}</Text>
                            <Text>Commented on: {comment.publishedDate}</Text>
                        </div>
                    ))
                ) : (
                    <Text>No comments yet.</Text>
                )}
            </Collapse>
        </Box>
    );
}