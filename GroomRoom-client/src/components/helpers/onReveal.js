export const onReveal = (socket, clientId, roomId) => {
    socket.send(JSON.stringify({
        method: 'reveal',
        id: clientId,
        roomId,
    }))
};