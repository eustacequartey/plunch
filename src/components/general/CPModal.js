import React, { useState } from "react";
import { Modal, message, Space, Input } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import "antd/dist/antd.css";

const CPModal = () => {
  const [visible, setVisible] = useState(false);

  return (
    <Modal
      title="Basic Modal"
      closable={false}
      visible={true}
      onOk={() => message.success("OK clicked")}
      maskClosable={true}
      cancelButtonProps={{
        shape: "round",
      }}
      //   onCancel={() => message.error("Cancel Clicked")}
    >
      <Space direction="vertical" size="large">
        <Input.Password placeholder="input password" />
        <Input.Password
          placeholder="input password"
          iconRender={(visible) =>
            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
        />
      </Space>
    </Modal>
  );
};

var customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

export default CPModal;
