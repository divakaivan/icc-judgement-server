const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    summonerName: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    email: {type: String, required: true},
    joinDate: {type: Date, default: Date.now},
    judgedCases: [{type: mongoose.Types.ObjectId, ref: 'Case'}]
});

UserSchema.pre('save', function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err);
        bcrypt.hash(this.password, salt, (err, hash) => {
            if (err) return next(err);
            this.password = hash;
            next();
        })
    })

});

module.exports = mongoose.model('User', UserSchema);