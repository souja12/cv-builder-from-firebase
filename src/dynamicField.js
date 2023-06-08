import React from "react";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Form, Divider, Button, Select, Input } from "antd";

function DynamicField(props) {
  return (
    <Form.List name="fields" style={{width:"10%"}}>
      {(fields, { add, remove }) => {
        return (
          <div>
            {fields.map((field, index) => (
              <div key={field.key}>
                <Divider>Language {index + 1}</Divider>
                <Form.Item
                  name={[index, "name"]}
                  label="Language"
                  rules={[{ required: true }]}
                  style={{width:"60%"}}
                >                 
                  <Input style={{border: "1px solid #0a0a0a"}} placeholder="field name" />
                </Form.Item>
                <Form.Item
                  label="Proficiency"
                  name={[index, "type"]}
                  rules={[{ required: true }]}
                  style={{width:"70%"}}
                >
                  <Select >
                    <Select.Option value="Beginner">Beginner</Select.Option>
                    <Select.Option value="Modarate">Modarate</Select.Option>
                    <Select.Option value="Expert">Expert</Select.Option>
                  </Select>
                </Form.Item>
                {/* <Form.Item name={[index, "options"]} label="Options">
                  <Input placeholder="option 1, option 2, option 3" />
                </Form.Item> */}
                {fields.length > 1 ? (
                  <Button
                    type="danger"
                    className="dynamic-delete-button"
                    onClick={() => remove(field.name)}
                    icon={<MinusCircleOutlined />}
                    
                  >
                    Remove Above Language
                  </Button>
                ) : null}
              </div>
            ))}
            <Divider />
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                style={{ width: "60%",border: "1px solid #0a0a0a" }}
              >
                <PlusOutlined /> Add Language
              </Button>
            </Form.Item>
          </div>
        );
      }}
    </Form.List>
  );
}

export default DynamicField;
