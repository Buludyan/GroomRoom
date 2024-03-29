module.exports = class UserDto {
    name;
    surname;
    email;
    id;
    isActivated;
    voteState;

    constructor(model) {
        this.email = model.email;
        this.id = model._id;
        this.isActivated = model.isActivated;
        this.name = model.name;
        this.surname = model.surname;
        this.voteState = model.voteState;
    }
} 