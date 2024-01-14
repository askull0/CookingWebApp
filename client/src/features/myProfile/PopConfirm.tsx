import { Button, Popconfirm } from 'antd';
import React, { useState } from 'react';

export const PopConfirm = (props:any) => {
  const [open, setOpen] = useState(false);
  const {onClick, toDelete} = props;
  const showPopconfirm = () => {
    setOpen(true);
  };
  const handleCancel = () => {
    setOpen(false);
  };

  return(
    <Popconfirm
      title={"Delete the " + toDelete}
      description={"Are you sure to delete this " + toDelete + "?"}
      open={open}
      onConfirm={onClick}
      onCancel={() => handleCancel()}
      okText="Yes"
      cancelText="No"
    >
    <Button danger onClick={() => showPopconfirm()}>Delete</Button>
  </Popconfirm>
  )
}