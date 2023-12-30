import React, {useState} from "react";
import {Button, Input, message, Modal, Rate} from "antd";
import axios from "axios";

interface OpinionButtonProps {
    data: {
        index: number;
        id: number | undefined;
    };
}

export const OpinionButton: React.FC<OpinionButtonProps> = ({data}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [ratingValue, setRatingValue] = useState(0);
    const [comment, setComment] = useState("");
    const [showConfirmation, setShowConfirmation] = useState(false);

    const showModal = () => {
        setModalVisible(true);
    };

    const handleOk = async () => {
        try {
            const response = await axios.put(`/rating/${data.id}`, {
                rating: ratingValue,
                comment: comment,
            });
            console.log("Response from backend:", response.data);
            message.success("Thank you for your opinion!");
            setShowConfirmation(true);
            setRatingValue(0);
            setComment("");

            setModalVisible(false);
            setTimeout(() => {
                setShowConfirmation(false);
            }, 5000);
        } catch (error) {
            console.error("Error updating rating:", error);
        }
        message.error("Something went wrong. Please try again.");

    };
    const handleRatingChange = (value: number) => {
        setRatingValue(value);
    };

    const handleCancel = () => {
        setRatingValue(0);
        setComment("");
        setModalVisible(false);
    };

    return (
        <div>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end'}}>
                <Button type="primary" onClick={showModal} style={{backgroundColor: '#027926'}}>
                    Rate & Comment
                </Button>
            </div>

            <Modal title={`Ocen i skomentuj`} open={modalVisible} onOk={handleOk} onCancel={handleCancel}>
                Ocena: <Rate value={ratingValue} onChange={handleRatingChange}/>

                <p>Komentarz:<Input value={comment} onChange={(e) => setComment(e.target.value)}/></p>
            </Modal>
            {showConfirmation && (
                <div style={{
                    position: "fixed",
                    top: 20,
                    right: 20,
                    backgroundColor: "rgba(0, 128, 0, 0.8)",
                    padding: 16,
                    borderRadius: 8
                }}>
                    <p style={{color: "#fff", margin: 0}}>Thank you for your opinion!</p>
                </div>
            )}
        </div>
    );
};