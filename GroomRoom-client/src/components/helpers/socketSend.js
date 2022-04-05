export const socketSend = (socket, updatedColumns, id) => {
    console.log(id)
    socket.send(JSON.stringify({
        method: 'broadcast',
        columns: updatedColumns,
        id: id
    }))
};