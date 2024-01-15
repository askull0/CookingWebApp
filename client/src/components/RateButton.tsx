import React, {useState} from "react";
import {Button, message, Modal, Rate} from "antd";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useIsLogged} from "../hooks/useIsLogged";

interface RateButtonProps {
    id: number;
    onReviewsChange: (recipeId: number, newReviews: number) => void;
}

export const RateButton: React.FC<RateButtonProps> = ({id, onReviewsChange}) => {
    const isLogged = useIsLogged();
    const navigate = useNavigate();
    const [modalVisible, setModalVisible] = useState(false);
    const [ratingValue, setRatingValue] = useState(0);
    const showModal = () => {
        if (isLogged) {
            setModalVisible(true);
        } else {
            navigate('/login');
        }
    };

    const handleOk = async () => {
        const rateRecipeDto = {
            rating: ratingValue
        };
        try {
            const response = await axios.put(`recipes/rating/${id}`, rateRecipeDto);
            console.log("Response from backend:", response.data);
            message.success("Thank you for your rating!");
            onReviewsChange(id, response.data.reviews);
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