const mongoose = require('mongoose');
await mongoose.connect('mongodb://localhost:27017/MR-RTS');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Comment = new Schema();

Comment.add({
    title: {
        type: String,
        index: true
    },
    date: Date,
    body: String,
    comments: [Comment],
    creator: Schema.ObjectId
});

const Person = new Schema({
    name: {
        first: String,
        last: String
    },
    email: {
        type: String,
        required: true,
        index: {
            unique: true,
            sparse: true
        }
    },
    alive: Boolean
});


// a setter
Person.path('full_name').set(function (v) {
    return capitalize(v);
});

// middleware
Person.pre('save', function (next) {
    notify(this.get('email'));
    next();
});

Comment.path('date')
    .default(function () {
        return new Date();
    })
    .set(function (v) {
        return v === 'now' ? new Date() : v;
    });

Comment.pre('save', function (next, done) {
    /* global emailAuthor */
    emailAuthor(done); // some async function
    next();
});


Comment.methods.findByCreator = function (callback) {
    return this.db.model('Person').findById(this.creator, callback);
};

Comment.statics.findByDate = function (date, callback) {
    return this.find({ date: date }, callback);
};

Comment.methods.findByCreatorAndDate = function (creator, date, callback) {
    return this.find('creator', creator).where('date').gte(date).run(callback);
};

const userSchema = new Schema({
    student_id: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    full_name: { type: String, required: true },
    join_date: { type: Date }
});


mongoose.model('Comment', Comment);
mongoose.model('Person', Person);
module.exports = mongoose.model('User', userSchema);