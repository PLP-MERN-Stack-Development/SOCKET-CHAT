import { useEffect, useState } from 'react';
import { useSocket } from '../../hooks/useSocket';

const UserList = () => {
  const { socket } = useSocket();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (!socket) return;

    const handleUserList = (userList) => {
      setUsers(userList);
    };

    socket.on('user_list', handleUserList);

    return () => {
      socket.off('user_list', handleUserList);
    };
  }, [socket]);

  return (
    <div className="p-4 border-t border-gray-200">
      <h4 className="text-lg font-medium text-gray-700 mb-2">Online Users</h4>
      <ul className="space-y-2">
        {users.map((user) => (
          <li key={user.id} className="flex items-center">
            <span className={`inline-block w-2 h-2 rounded-full mr-2 ${user.online ? 'bg-green-500' : 'bg-gray-400'}`}></span>
            <span className="text-gray-800">{user.username}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;