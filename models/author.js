const mongoose = require('mongoose')
const Book = require('./book')

const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})

// model.find() depreciated: no longer accepts callbacks, so we use async await
// authorSchema.pre('deleteOne', function(next) {
//     Book.find({ author : this.id }, (err, books) => {
//         if (err) {
//             next(err)
//         } else if (books.length > 0) {
//             next(new Error('This author still has books'))
//         } else {
//             next()
//         }
//     })
// })

authorSchema.pre('deleteOne', async (req, res, next) => {
    try {
        await Book.find({ author : this.id})
        next()
    } catch {
        if (books.length > 0) {
            next(new Error('This author still has books'))
        } else {
            next(err)
        }
    }
})

module.exports = mongoose.model('Author', authorSchema)
