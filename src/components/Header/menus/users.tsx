import { Dropdown, Menu, Skeleton, Space } from 'antd';

import Person from 'components/Person';

import useUsers from 'hooks/useUsers';

export default function UsersMenu() {
  const {
    selectedUser,
    users,
    handleChangeSelectedUser,
    loading: loadingUsers
  } = useUsers();

  if (loadingUsers || !selectedUser) {
    return (
      <Space>
        <Skeleton.Avatar active />
        <Skeleton.Input active />
      </Space>
    );
  }

  return (
    <Dropdown
      disabled={loadingUsers}
      dropdownRender={() => (
        <Menu
          selectable
          selectedKeys={[String(selectedUser.email)]}
        >
          {users.map((user) => (
            <Menu.Item
              onClick={() => handleChangeSelectedUser(user)}
              key={user.email}
            >
              <Person name={user.name} email={user.email} dark />
            </Menu.Item>
          ))}
        </Menu>
      )}
      trigger={['click']}
    >
      <a onClick={(e) => e.preventDefault()}>
        <Person name={selectedUser.name} email={selectedUser.email} dropdown />
      </a>
    </Dropdown>
  );
}
