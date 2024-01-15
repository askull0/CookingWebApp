import React, {useState} from "react";
import {Button, Input, message, Modal, Rate} from "antd";
import axios from "axios";
import {useIsLogged} from "../hooks/useIsLogged";
import {useNavigate} from "react-router-dom";

interface CommentButtonProps {
    id: number | undefined;
    onAddComment: (recipeId: number, newComment: Comment[]) => void;
}

export const CommentButton: React.FC<CommentButtonProps> = ({id, onAddComment}) => {
    const isLogged = useIsLogged();
    const navigate = useNavigate();
    const [modalVisible, setModalVisible] = useState(false);
    const [comment, setComment] = useState('');
    const showModal = () => {
        if (isLogged) {
            setModalVisible(true);
        } else {
            navigate('/login');
        }
    };

    /*    const handleAddComment = (newComment) => {
            setComments([...comments, newComment]);
        };*/

    const handleOk = async () => {
        const commentRecipeDto = {
            text: comment,
            recipesId: id,
        };
        try {
            const response = await axios.post(`/comments/`, commentRecipeDto
            );
            console.log("Response from backend:", response.data);
            message.success("Thank you for your comment!");
            onAddComment(response.data.id, response.data);
            setComment('');

            setModalVisible(false);
            setTimeout(() => {
            }, 5000);
        } catch (error) {
            console.error("Error updating rating:", error);
            message.error("Something went wrong. Please try again.");
        }


    };
    const handleCancel = () => {
        setComment('');
        setModalVisible(false);
    };

    return (
        <div>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end'}}>
                <Button type="primary" onClick={showModal} style={{backgroundColor: '#027926'}}>
                    Comment
                </Button>
            </div>

            <Modal title={`Comment the recipe`} open={modalVisible} onOk={handleOk} onCancel={handleCancel}>
                <p>Comment: <Input value={comment} onChange={(e) => setComment(e.target.value)}/></p>
            </Modal>
        </div>
    );
};