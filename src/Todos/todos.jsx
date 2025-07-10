// src/Todos/Table.jsx
import React, { useEffect, useState } from "react";
import { Button, Space, Table, Modal, Input, Typography } from "antd";
import { collection, deleteDoc, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { firestore } from "../config/firebase";
import { useAuth } from "../context/authcontext";
import { Navigate, useNavigate } from "react-router-dom";

const { Title } = Typography;

const TodosTable = () => {

  const { user } = useAuth();
  const [todos, setTodos] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null);

   const navigate  = useNavigate()
  useEffect(() => {
    const unsub = onSnapshot(collection(firestore, "todos"), (snapshot) => {
      const data = snapshot.docs
        .map((doc) => doc.data())
        .filter((item) => item.uid === user?.uid);
      setTodos(data);
    });

    return () => unsub();
  }, [user]);

  const handlenavigate = ()=>{
navigate("/todos/add")
  }
  const handleDelete = async (id) => {
    await deleteDoc(doc(firestore, "todos", id));
  };


  const handleEdit = async () => {
    const { id, title, location, description } = editingTodo;
    await updateDoc(doc(firestore, "todos", id), {
      title,
      location,
      description,
    });
    setEditingTodo(null);
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button onClick={() => setEditingTodo(record)}>Edit</Button>
          <Button danger onClick={() => handleDelete(record.id)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-4">
      <Title level={3}>Your Todos</Title>
         <Button type="primary" onClick={handlenavigate}>Add Todos</Button>
      <Table
        columns={columns}
        dataSource={todos.map((t) => ({ ...t, key: t.id }))}
        pagination={{ pageSize: 5 }}
      />

      <Modal
        open={!!editingTodo}
        title="Edit Todo"
        onCancel={() => setEditingTodo(null)}
        onOk={handleEdit}
        okText="Update"
      >
        <Input
          className="mb-2"
          placeholder="Title"
          value={editingTodo?.title || ""}
          onChange={(e) =>
            setEditingTodo((prev) => ({ ...prev, title: e.target.value }))
          }
        />
        <Input
          className="mb-2"
          placeholder="Location"
          value={editingTodo?.location || ""}
          onChange={(e) =>
            setEditingTodo((prev) => ({ ...prev, location: e.target.value }))
          }
        />
        <Input.TextArea
          placeholder="Description"
          value={editingTodo?.description || ""}
          onChange={(e) =>
            setEditingTodo((prev) => ({ ...prev, description: e.target.value }))
          }
        />
      </Modal>

    </div>
  );
};

export default TodosTable;
