export const sortUsers = (socket ,roomId, users, clientId) => {
    
    const usersCopy = [...users];
    const sortedUsers = usersCopy.sort((a, b) => a.voteState.value - b.voteState.value);

    socket.send(JSON.stringify({
        method: 'sortUsers',
        id: clientId,
        roomId,
        sortedUsers
    }))
}