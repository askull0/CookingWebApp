import {Box, Button, Collapse, Group, Text} from '@mantine/core';
import {useDisclosure} from '@mantine/hooks';
import React, {useEffect, useState} from "react";
import axios from "axios";
import {Divider} from 'antd';

interface CommentProps {
    id: number | undefined;
}

interface Comment {
    author: {
        firstName: string;
        lastName: string;
    };
    text: string;
    publishedDate: string;
}


export const DisplayComment: React.FC<CommentProps> = ({id}) => {
    const [opened, {toggle}] = useDisclosure(false);
    const [comments, setComments] = useState<Comment[]>([]);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axios.get(`/comments/recipe/${id}`);
                if (response.status !== 404)
                    setComments(response.data);
            } catch (error) {
                if (error === 404) {
                    console.log("brak komenatrzy");
                }
                //console.error("Error fetching comments:", error);
            }
        };
        fetchComments();
    }, [id]);
    return (
        <Box maw={400} mx="auto" mt={10}>
            <Group justify="center" mb={5}>
                <Button onClick={toggle} style={{marginBottom: '13px'}} color="darkgreen">View comments </Button>
            </Group>

            <Collapse in={opened}>
                {comments.length > 0 ? (
                    comments.map((comment, index) => (
                        <div key={index} style={{marginBottom: '10px', display: 'flex', justifyContent: 'center'}}>
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: 'auto',
                                    marginBottom: '8px',
                                    border: '1px solid #d9d9d9',
                                    borderRadius: '16px',
                                    padding: '16px',
                                    width: '700px',
                                }}>
                                <strong>{comment.author.firstName} {comment.author.lastName}</strong> ({new Date(comment.publishedDate).toLocaleString()})
                                <Divider/>
                                <div>{comment.text}</div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div style={{marginBottom: '10px', display: 'flex', justifyContent: 'center'}}>
                        <div style={{
                            display: 'flex', flexDirection: 'column', height: 'auto',
                            marginBottom: '8px',
                            border: '1px solid #d9d9d9',
                            borderRadius: '16px',
                            padding: '16px',
                            width: '700px',
                        }}>
                            <Text>No comments yet.</Text>
                        </div>
                    </div>
                )}
            </Collapse>
        </Box>
    );
}