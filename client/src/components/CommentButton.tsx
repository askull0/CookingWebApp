import React, {useState} from "react";
import {Button, Input, message, Modal, Rate} from "antd";
import axios from "axios";

interface CommentButtonProps {
    id: number | undefined;
}

export const CommentButton: React.FC<CommentButtonProps> = ({id}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [comment, setComment] = useState('');
    const showModal = () => {
        setModalVisible(true);
    };

    const handleOk = async () => {
        try {
            const response = await axios.put(`/rating/`, {
                comment
            });
            console.log("Response from backend:", response.data);
            message.success("Thank you for your comment!");
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