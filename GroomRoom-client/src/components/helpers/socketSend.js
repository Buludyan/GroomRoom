export const socketSend = (socket, updatedColumns, id) => {
    socket.send(JSON.stringify({
        method: 'broadcast',
        columns: updatedColumns,
        id: id
    }))
};