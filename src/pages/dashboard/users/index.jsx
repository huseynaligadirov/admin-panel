import React, { useContext } from 'react';
import EditableTable from '../../../reusable/table/Table';
import { UserContext } from '../../../context/userContext';

const Users = () => {
  const { users, setUsers } = useContext(UserContext);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      editable: true,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      editable: true,
    },
    {
      title: 'Role',
      dataIndex: 'role',
      editable: true,
    },
  ];



  return <EditableTable columns={columns} initialData={users} setData={setUsers} />;
};

export default Users;
