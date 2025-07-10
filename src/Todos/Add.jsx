import React, { useState } from 'react';
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Row,
  Typography,
  message,
} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { firestore } from '../config/firebase';
import { useAuth } from '../context/authcontext';
import { useNavigate } from 'react-router-dom';

const initialState = { title: '', location: '', description: '' };

const Add = () => {
  const { Title } = Typography;
  const { Item } = Form;
  const [state, setState] = useState(initialState);
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate()
  const handlenavigate = () => {
    navigate("/")
  }
  const handleChange = (e) =>
    setState((s) => ({ ...s, [e.target.name]: e.target.value }));

  const handleSubmit = async () => {
    try {
      setLoading(true);
      let { title, location, description } = state;

      title = title.trim();
      location = location.trim();
      description = description.trim();

      if (!title || !location || !description) {
        return message.warning('Please enter all the fields');
      }

      if (title.length < 5) {
        return message.warning(
          'Please enter a valid title (at least 5 characters)'
        );
      }

      if (location.length < 5) {
        return message.warning(
          'Please enter a valid location (at least 5 characters)'
        );
      }

      const formData = {
        uid: user?.uid || 'anonymous',
        id: crypto.randomUUID(),
        title,
        location,
        description,
        createdAt: serverTimestamp(),
        state: 'incomplete',
      };

      await createDocument(formData);
      setState(initialState);
      form.resetFields();
      message.success('Todo added successfully!');
    } catch (error) {
      console.error('Error adding todo:', error);
      message.error('Failed to add todo');
    } finally {
      setLoading(false);
    }
  };

  const createDocument = async (formData) => {
    try {
      await setDoc(doc(firestore, 'todos', formData.id), formData);
    } catch (e) {
      console.error('Error adding document: ', e);
      throw e;
    }
  };

  return (
    <main className="add-todo-container p-4">
      <Card
        bordered={false}
        style={{
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          maxWidth: '800px',
          width: '100%',
          margin: '0 auto',
        }}
      >
        <Row justify="center">
          <Col xs={24} md={20} lg={18}>
            <Title
              level={3}
              className="text-center"
              style={{ marginBottom: '24px', color: '#1890ff' }}
            >
              Add New Todo
            </Title>
            <Form
              form={form}
              layout="vertical"
              onFinish={handleSubmit}
              initialValues={initialState}
            >
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <Item
                    label="Title"
                    name="title"
                    rules={[
                      { required: true, message: 'Please enter a title' },
                      { min: 5, message: 'Title must be at least 5 characters' },
                    ]}
                  >
                    <Input
                      type="text"
                      size="large"
                      placeholder="Enter your title"
                      name="title"
                      value={state.title}
                      onChange={handleChange}
                      style={{ borderRadius: '8px' }}
                    />
                  </Item>
                </Col>
                <Col span={24}>
                  <Item
                    label="Location"
                    name="location"
                    rules={[
                      { required: true, message: 'Please enter a location' },
                      {
                        min: 5,
                        message: 'Location must be at least 5 characters',
                      },
                    ]}
                  >
                    <Input
                      type="text"
                      size="large"
                      placeholder="Enter location"
                      name="location"
                      value={state.location}
                      onChange={handleChange}
                      style={{ borderRadius: '8px' }}
                    />
                  </Item>
                </Col>
                <Col span={24}>
                  <Item
                    label="Description"
                    name="description"
                    rules={[
                      { required: true, message: 'Please enter a description' },
                    ]}
                  >
                    <TextArea
                      size="large"
                      placeholder="Enter description"
                      autoSize={{ minRows: 3, maxRows: 6 }}
                      name="description"
                      value={state.description}
                      onChange={handleChange}
                      style={{ borderRadius: '8px' }}
                    />
                  </Item>
                </Col>
                <Col span={24}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    size="large"
                    block
                    loading={loading}
                    style={{ borderRadius: '8px' }}
                  >
                    Add Todo
                  </Button>
                  <Button type='primary' block className='mt-2' size='large' onClick={handlenavigate}>Show Todos</Button>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Card>
    </main>
  );
};

export default Add;
