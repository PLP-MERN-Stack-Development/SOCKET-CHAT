import { useEffect, useState } from 'react';
import { getRooms } from '../../services/api';
import { Link } from 'react-router-dom';

const RoomList = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const rooms = await getRooms();
        setRooms(rooms);
      } catch (error) {
        console.error('Failed to fetch rooms:', error);
      }
    };

    fetchRooms();
  }, []);

  return (
    <div className="p-4">
      <h4 className="text-lg font-medium text-gray-700 mb-2">Rooms</h4>
      <ul className="space-y-2">
        {rooms.map((room) => (
          <li key={room._id}>
            <Link 
              to={`/chat/${room._id}`}
              className="block px-3 py-2 rounded hover:bg-gray-100 text-gray-800 hover:text-indigo-600 transition-colors duration-200"
            >
              # {room.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RoomList;