import React, { useState } from 'react';
import { Table, Input, Button, Popconfirm, Form, Space } from 'antd';

const EditableTable = ({ columns, initialData, setData, rowKey = 'key' }) => {
  const [dataSource, setDataSource] = useState(initialData);
  const [count, setCount] = useState(initialData.length);
  const [editingKey, setEditingKey] = useState('');
  const [form] = Form.useForm();

  const isEditing = (record) => record[rowKey] === editingKey;

  const handleAdd = () => {
    if (editingKey !== '') return;
    const newKey = count.toString();
    const newRow = { [rowKey]: newKey };
    columns.forEach((col) => {
      if (col.dataIndex !== rowKey) {
        newRow[col.dataIndex] = '';
      }
    });
    const newData = [newRow, ...dataSource];
    setDataSource(newData);
    setData(newData);
    setEditingKey(newKey);
    setCount(count + 1);
    form.setFieldsValue(newRow);
  };

  const handleSave = async () => {
    try {
      const row = await form.validateFields();
      const newData = [...dataSource];
      const index = newData.findIndex((item) => item[rowKey] === editingKey);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setDataSource(newData);
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const handleCancel = () => {
    const newData = dataSource.filter((item) => item[rowKey] !== editingKey);
    setDataSource(newData);
    setData(newData);
    setEditingKey('');
  };

  const handleEdit = (record) => {
    form.setFieldsValue({ ...record });
    setEditingKey(record[rowKey]);
  };

  const handleDelete = (key) => {
    const newData = dataSource.filter((item) => item[rowKey] !== key);
    setDataSource(newData);
    setData(newData);
  };

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
  }) => {
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{ margin: 0 }}
            rules={[
              {
                required: true,
                message: `Please Input ${title}!`,
              },
            ]}
          >
            <Input />
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  const actionColumn = {
    title: 'Operation',
    dataIndex: 'operation',
    render: (_, record) => {
      const editable = isEditing(record);
      return editable ? (
        <Space>
          <a onClick={handleSave}>Save</a>
          <Popconfirm title="Sure to cancel?" onConfirm={handleCancel}>
            <a>Cancel</a>
          </Popconfirm>
        </Space>
      ) : (
        <Space>
          <a disabled={editingKey !== ''} onClick={() => handleEdit(record)}>
            Edit
          </a>
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record[rowKey])}>
            <a disabled={editingKey !== ''}>Delete</a>
          </Popconfirm>
        </Space>
      );
    },
  };

  return (
    <Form form={form} component={false}>
      <Button
        onClick={handleAdd}
        type="primary"
        style={{ marginBottom: 16 }}
        disabled={editingKey !== ''}
      >
        Add a row
      </Button>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={dataSource}
        columns={[...mergedColumns, actionColumn]}
        rowClassName="editable-row"
        rowKey={rowKey}
        pagination={false}
      />
    </Form>
  );
};

export default EditableTable;
