import { Axios } from "../axiosCofing";

export const roomService = {
    async isRoom(roomId) {
        return Axios.get(`/room/${roomId}`);
    },

    async createRoom(roomId) {
        return Axios.post(`/room/`, {roomId});
    },

    async deleteRoom(roomId) {
        return Axios.put(`/room`, { roomId });
    }
}
