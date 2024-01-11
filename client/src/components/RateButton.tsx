import React, {useState} from "react";
import {Button, Input, message, Modal, Rate} from "antd";
import axios from "../axios";

interface RateButtonProps {
    id: number | undefined;
}

export const RateButton: React.FC<RateButtonProps> = ({id}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [ratingValue, setRatingValue] = useState(0);
    const showModal = () => {
        setModalVisible(true);
    };

    const handleOk = async () => {
        const rateRecipeDto = {
            rating: ratingValue
        };
        try {
            const response = await axios.put(`recipes/rating/${id}`, rateRecipeDto);
            console.log("Response from backend:", response.data);
            message.success("Thank you for your rating!");
            setRatingValue(0);

            setModalVisible(false);
            setTimeout(() => {
            }, 5000);
        } catch (error) {
            console.error("Error updating rating:", error);
            message.error("Something went wrong. Please try again.");
        }


    };
    const handleRatingChange = (value: number) => {
        setRatingValue(value);
    };

    const handleCancel = () => {
        setRatingValue(0);
        setModalVisible(false);
    };

    return (
        <div>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end'}}>
                <Button type="primary" onClick={showModal} style={{backgroundColor: '#027926'}}>
                    Rate
                </Button>
            </div>

            <Modal title={`Rate the recipe`} open={modalVisible} onOk={handleOk} onCancel={handleCancel}>
                Your rate: <Rate value={ratingValue} onChange={handleRatingChange}/>
            </Modal>

        </div>
    );
};