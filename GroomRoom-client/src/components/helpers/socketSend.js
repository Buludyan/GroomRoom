export const socketSend = (socket, updatedColumns) => {
    socket.send(JSON.stringify({
        method: 'broadcast',
        columns: updatedColumns
    }))
};