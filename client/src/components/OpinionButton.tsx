import React, {useState} from "react";
import {Button, Input, Modal, Rate} from "antd";

export const OpinionButton = ({index}: {
    index: number;
}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [ratingValue, setRatingValue] = useState(0);
    const [comment, setComment] = useState("");
    const showModal = () => {
        setModalVisible(true);
    };

    const handleOk = () => {
        setRatingValue(0);
        setComment("");
        setModalVisible(false);

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

            <Modal title={`Ocen i skomentuj`} open={modalVisible} onOk={handleOk}
                   onCancel={handleCancel}>
                <p>Ocena: <Rate value={ratingValue} onChange={(value) => setRatingValue(value)}/></p>
                <p>Komentarz:<Input value={comment} onChange={(e) => setComment(e.target.value)}/></p>
            </Modal>
        </div>
    );
};