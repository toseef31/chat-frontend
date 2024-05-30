import React from 'react';

const UserList = ({ users }) => {
  const handleStartChat = async (user) => {
    try {
      const response = await fetch('/api/conversations/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Network response was not ok: ${errorText}`);
      }

      const data = await response.json();
      console.log('Chat started:', data);
    } catch (error) {
      console.error('Error starting chat:', error);
      alert(`Error starting chat: ${error.message}`);
    }
  };

  return (
    <div className='col-start-2'>
      <div className='text-center'>
        <label className='font-bold text-2xl'>Please start chat</label>
      </div>
      {users.map((user) => (
        <div className='flex flex-row justify-between items-center my-3' key={user.id}>
          <h2>{user.name}</h2>
          <button
            className="btn rounded-md border w-32 py-2.5 bg-violet-600 text-white font-bold"
            onClick={() => handleStartChat(user)}
          >
            Start Chat
          </button>
        </div>
      ))}
    </div>
  );
};

export default UserList;
