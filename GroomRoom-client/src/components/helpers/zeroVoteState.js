export const zeroVoteState = (users, socket, clientId, roomId) => {
    let updatedUsers = [...users];
    updatedUsers = updatedUsers.map(user => user = { ...user, voteState: { ...user.voteState, value: 0 } });

    socket.send(JSON.stringify({
        method: 'revoteAll',
        id: clientId,
    }))

    socket.send(JSON.stringify({
        method: 'voting',
        id: clientId,
        roomId,
        updatedUsers,
    }))
}