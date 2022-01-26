import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import crypto from 'crypto'
import bcrypt from 'bcrypt-nodejs'
import listEndpoints from 'express-list-endpoints'

const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost/calendarMaker'
mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
})
mongoose.Promise = Promise

// Schema and Model for the database
const UserSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  // username: {
  //   type: String,
  //   required: true,
  //   unique: true
  // },
  password: {
    type: String,
    required: true,
  },
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString('hex'),
  },
  // Array collections
  collections: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Collection',
    },
  ],
})

const User = mongoose.model('User', UserSchema)

const CollectionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  date: {
    // set a date/number for the calendar door
    type: Number,
    required: true,
  },
  image: {
    type: String, // Image?
    // required: true,
  },
  message: {
    type: String,
    // required: true
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
})

const Collection = mongoose.model('Collection', CollectionSchema)

// Defines the port the app will run on. Defaults to 8080, but can be
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(express.json())

// Unreachable database -> status 503
app.use((req, res, next) => {
  if (mongoose.connection.readyState === 1) {
    next()
  } else {
    res.status(503).json({ error: 'Service unavailable' })
  }
})

// Authenticate User
const authenticateUser = async (req, res, next) => {
  try {
    const user = await User.findOne({
      accessToken: req.header('Authorization'),
    })
    if (user) {
      next()
    } else {
      res.status(401).json({
        message: 'Please, log in',
        response: 'Please, log in',
        success: false,
      })
    }
  } catch (error) {
    res.status(400).json({
      message: 'Error, could not authenticate user',
      response: error,
      success: false,
    })
  }
}

// Start defining your routes here
app.get('/', (req, res) => {
  res.send(listEndpoints(app))
})

// app.get('/user', authenticateUser)
// app.get('/user/:userId or query?', async (req, res) => {
//   // user profile
// })

// find all users store in the DB
app.get('/user', async (req, res) => {
  // http://localhost:8080/user?id=61e5df19d37e482c297f9e06
  const userId = req.query.id
  try {
    if (userId) {
      const user = await User.findById(userId).populate('collections')
      res.status(200).json({ response: user, success: true })
    } else {
      const allUsers = await User.find().populate('collections')
      res.status(200).json({ response: allUsers, success: true })
    }
  } catch (err) {
    res.status(400).json({
      message: 'No user(s) found',
      response: err,
      success: false,
    })
  }
})

// edit user profile
app.patch('/user', async (req, res) => {
  // req.query - ?user=id?
  const userId = req.query.id

  try {
    // salt -> randomizer
    const salt = bcrypt.genSaltSync()
    // if user change password -> hashing the password
    // if the req.body.password is empty (no change at all by user) -> delete the req.body
    if (req.body.password) {
      req.body.password = bcrypt.hashSync(req.body.password, salt)
    } else {
      delete req.body.password
    }
    // console.log(req.body)

    const updatedUserProfile = await User.findOneAndUpdate(
      { _id: userId },
      req.body,
      { new: true, useFindAndModify: false }
    )
    if (updatedUserProfile) {
      res.status(200).json({ response: updatedUserProfile, success: true })
    } else {
      res.status(404).json({
        message: 'User not found',
        response: 'User not found',
        success: false,
      })
    }
  } catch (err) {
    res.status(400).json({
      message: 'Could not edit user, invalid request',
      response: err,
      success: false,
    })
  }
})

// delete user account
app.delete('/user', async (req, res) => {
  // req.query - ?user=id?
  const userId = req.query.id
})

// create a collection
app.post('/user', async (req, res) => {
  // app.post('/user/:userId', async (req, res) => {
  // req.query - ?compose=new
  // req.query - ?user=id?
  const { title, date, image, message } = req.body
  const userId = req.query.id
  try {
    // const newCollection = await new Collection.findById(userId)

    // create a new collection
    const newCollection = await new Collection({
      title,
      date,
      image,
      message,
      user: userId,
    }).save()

    // find the user and update the user with the new collection
    const queriedUser = await User.findById(userId)
    if (queriedUser) {
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        {
          $push: {
            collections: newCollection,
          },
        },
        { new: true }
      )
    }

    res.status(201).json({ response: newCollection, success: true })
  } catch (err) {
    res.status(400).json({
      message: 'Could not create collection',
      response: err,
      success: false,
    })
  }
})

// view the collection
app.get('/user/collections', async (req, res) => {
  // app.get('/user/:userId/:messageId', async (req, res) => {
  // const { collectionId } = req.params

  // get one collection
  // http://localhost:8080/user/collections?collection=61ee9d8d838687e8adc2338b
  // get all collection(s)
  // http://localhost:8080/user/collections?id=61ee9a9ee0b1cce7c198cb56

  const collectionId = req.query.collection
  const userId = req.query.id

  try {
    // const showCollection = await Collection.findById(collectionId)
    // .populate('collection') //property name in the UserSchema
    if (collectionId) {
      const showCollection = await Collection.findById(collectionId)
      if (showCollection) {
        res.status(200).json({
          response: showCollection,
          success: true,
        })
      } else {
        res.status(404).json({
          response: `Collection by id '${collectionId}' not found`,
          success: false,
        })
      }
    } else {
      const showCollection = await User.findById(userId).populate('collections')
      res.status(200).json({
        response: showCollection.collections,
        success: false,
      })
    }
  } catch (err) {
    res.status(400).json({
      message: 'Invalid request - collection(s) not found',
      response: err,
      success: false,
    })
  }
})

app.patch('/user/collections', async (req, res) => {
  // edit the collection
  const collectionId = req.query.collection

  try {
    const updatedCollection = await Collection.findOneAndUpdate(
      { _id: collectionId },
      req.body,
      { new: true, useFindAndModify: false }
    )
    if (updatedCollection) {
      res.status(200).json({ response: updatedCollection, success: true })
    } else {
      res.status(404).json({
        message: 'Collection not found',
        response: 'Collection not found',
        success: false,
      })
    }
  } catch (err) {
    res.status(400).json({
      message: 'Could not edit collection, invalid request',
      response: err,
      success: false,
    })
  }
})

// app.patch('/user/:userId/:messageId', async (req, res) => {
//   // edit the collection
// })

// delete a collection
// app.delete('/user/:userId/:collectionId', async (req, res) => {
app.delete('/user/collections', async (req, res) => {
  // delete the collection
  // http://localhost:8080/user/collections?collection=61ee9d8d838687e8adc2338b
  const collectionId = req.query.collection
  try {
    const deletedCollection = await Collection.findOneAndDelete({
      _id: collectionId,
    })

    // console.log(deletedCollection.user)

    // const user = await User.findOne({ _id: deletedCollection.user })
    // console.log('user', user)
    // console.log('before', user.collections)
    // user.collections.splice(user.collections.indexOf(collectionId), 1)
    // console.log('after', user.collections)
    // user.save()

    // find the user and delete the collection from the collections array
    await User.findByIdAndUpdate(deletedCollection.user, {
      $pull: {
        collections: collectionId,
      },
    })

    if (deletedCollection) {
      res.status(200).json({ response: deletedCollection, success: true })
    } else {
      res.status(404).json({
        message: 'Collection not found',
        response: 'Collection not found',
        success: false,
      })
    }
  } catch (err) {
    res.status(400).json({
      message: 'Could not delete the collection, invalid request',
      response: err,
      success: false,
    })
  }
})

// create a user account
app.post('/signup', async (req, res) => {
  const { firstname, lastname, email, password } = req.body

  try {
    // salt -> randomizer
    const salt = bcrypt.genSaltSync()

    // // stop the executing of try block with throw
    if (password === '') {
      throw 'Please provide password'
    }

    const newUser = await new User({
      firstname,
      lastname,
      email,
      password: bcrypt.hashSync(password, salt),
    }).save()

    res.status(201).json({
      response: {
        userId: newUser._id,
        firstname: newUser.firstname,
        lastname: newUser.lastname,
        email: newUser.email,
        accessToken: newUser.accessToken,
        collections: newUser.collections,
      },
      success: true,
    })
  } catch (error) {
    if (firstname === '' || lastname === '') {
      res.status(400).json({
        message: 'Validation failed: provide name',
        response: error,
        success: false,
      })
    } else if (error.code === 11000 && error.keyPattern.email) {
      res.status(400).json({
        message: 'Validation failed: email already exist',
        response: error,
        success: false,
      })
    } else if (password === '') {
      res.status(400).json({
        message: 'Validation failed: provide password',
        response: error,
        success: false,
      })
    } else {
      res.status(400).json({
        message: 'Validation failed: please provide name, email and password',
        response: error,
        success: false,
      })
    }
  }
})

// user log in
app.post('/login', async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })

    if (user && bcrypt.compareSync(password, user.password)) {
      res.status(200).json({
        response: {
          userId: user._id,
          email: user.email,
          accessToken: user.accessToken,
        },
        success: true,
      })
    } else {
      if (email === '') {
        res.status(404).json({
          message: 'Login failed: fill in email',
          response: 'Login failed: fill in email',
          success: false,
        })
      } else if (password === '') {
        res.status(404).json({
          message: 'Login failed: fill in password',
          response: 'Login failed: fill in password',
          success: false,
        })
      } else {
        res.status(404).json({
          message: 'Login failed: wrong email or password',
          response: 'Login failed: wrong email or password',
          success: false,
        })
      }
    }
  } catch (error) {
    res.status(400).json({
      message: 'Invalid entry',
      response: error,
      success: false,
    })
  }
})

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})
