import { Button, Form, Table, Input } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "antd/dist/antd.css";

import { getPatientData } from "../../store/patient-data/patient-data.selector";
import { setPatientData } from "../../store/patient-data/patient-data.action";
import { Link } from "react-router-dom";

const PatientList = () => {
  const dataSource = useSelector(getPatientData);
  const [editingRow, setEditingRow] = useState(null);
  const [form] = Form.useForm(); // create reference to the form
  const dispatch = useDispatch();

  // list containing column info
  const columns = [
    {
      key: 1,
      title: "Id",
      dataIndex: "key",
    },
    {
      key: 2,
      title: "Name",
      dataIndex: "name",
      render: (text, record) => {
        if (editingRow === record.key) {
          return (
            <Form.Item
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please enter a name",
                },
              ]}
            >
              <Input />
            </Form.Item>
          );
        } else {
          return (
            <Link to="/patient-profile" state={{ patientData: record }}>
              {text}
            </Link>
          );
        }
      },
    },
    {
      key: 3,
      title: "Phone",
      dataIndex: "phone",
      render: (text, record) => {
        if (editingRow === record.key) {
          return (
            <Form.Item
              name="phone"
              rules={[
                {
                  required: true,
                  message: "Please enter a phone number",
                },
              ]}
            >
              <Input />
            </Form.Item>
          );
        } else {
          return <p>{text}</p>;
        }
      },
    },
    {
      key: 4,
      title: "Diagnosis",
      dataIndex: "diagnosis",
      render: (text, record) => {
        if (editingRow === record.key) {
          return (
            <Form.Item
              name="diagnosis"
              rules={[
                {
                  required: true,
                  message: "Please enter a diagnosis",
                },
              ]}
            >
              <Input />
            </Form.Item>
          );
        } else {
          return <p>{text}</p>;
        }
      },
    },
    {
      key: 5,
      title: "Prescribed Medication",
      dataIndex: "prescribedMedication",
      render: (text, record) => {
        if (editingRow === record.key) {
          return (
            <Form.Item
              name="prescribedMedication"
              rules={[
                {
                  required: true,
                  message: "Please enter a medication",
                },
              ]}
            >
              <Input />
            </Form.Item>
          );
        } else {
          return <p>{text}</p>;
        }
      },
    },
    {
      key: 6,
      title: "Address",
      dataIndex: "address",
    },
    {
      key: 7,
      title: "City",
      dataIndex: "city",
    },
    {
      key: 8,
      title: "Pincode",
      dataIndex: "pincode",
    },
    {
      key: 9,
      title: "Actions",
      render: (_, record) => {
        return (
          <>
            <Button
              type="link"
              onClick={() => {
                setEditingRow(record.key);
                form.setFieldsValue({
                  name: record.name, // setting default value to each field on edit
                  phone: record.phone,
                  diagnosis: record.diagnosis,
                  prescribedMedication: record.prescribedMedication,
                });
              }}
            >
              Edit
            </Button>
            <Button type="link" htmlType="submit">
              Save
            </Button>
            <Button
              type="link"
              onClick={() => {
                const updatedDataSource = dataSource.filter(
                  (data) => data.key !== record.key
                );
                return dispatch(setPatientData(updatedDataSource));
              }}
            >
              Delete
            </Button>
          </>
        );
      },
    },
  ];

  const OnFinishHandle = (values) => {
    const updatedDataSource = [...dataSource];
    const selectedRowData = dataSource.find((data) => data.key === editingRow);

    // from selected row, remove old data and add updated data
    updatedDataSource.splice(editingRow - 1, 1, {
      ...selectedRowData,
      ...values,
      key: editingRow,
    });
    // update the data source with new edited values
    dispatch(setPatientData(updatedDataSource));

    // set editing row to null
    setEditingRow(null);
  };

  return (
    <div className="patient-list-container">
      <header>
        <Form form={form} onFinish={OnFinishHandle}>
          <Table columns={columns} dataSource={dataSource}></Table>
        </Form>
      </header>
    </div>
  );
};

export default PatientList;
