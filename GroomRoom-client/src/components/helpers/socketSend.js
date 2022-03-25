export const socketSend = (socket, updatedColumns, clientId) => {
    socket.send(JSON.stringify({
        method: 'broadcast',
        columns: updatedColumns,
        clientId: clientId
    }))
};