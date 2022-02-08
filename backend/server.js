import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import crypto from 'crypto'
import bcrypt from 'bcrypt-nodejs'
import listEndpoints from 'express-list-endpoints'
import nodemailer from 'nodemailer'
import cron from 'node-cron'
import dotenv from 'dotenv'
import moment from 'moment'

dotenv.config()

const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost/openMe'
mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
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
    // set a date when the receiver will get access to the "OpenMe"
    type: String,
    required: true,
  },
  sendTo: {
    // receiver's email address
    type: String,
    required: true,
  },
  image: {
    type: String, // Link or upload image?
    // required: true,
  },
  message: {
    type: String,
    // required: true
  },
  hasSentEmail: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: () => Date.now(),
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

// Authenticate user and retrieve the user info
app.get('/user', authenticateUser)
app.get('/user', async (req, res) => {
  const userId = req.query.id

  try {
    if (userId) {
      const user = await User.findById(userId).populate('collections')
      res.status(200).json({ response: user, success: true })
    } else {
      res.status(404).json({
        message: 'User not found',
        response: 'User not found',
        success: false,
      })
    }
  } catch (err) {
    res.status(400).json({
      message: 'Invalid entry',
      response: err,
      success: false,
    })
  }
})

// edit user profile
app.patch('/user', async (req, res) => {
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

    const updatedUserProfile = await User.findOneAndUpdate(
      { _id: userId },
      req.body,
      { new: true }
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

// TODO: delete user account
app.delete('/user', async (req, res) => {
  // req.query - /user?id=?
  const userId = req.query.id

  try {
    // Delete all the collections connected to the user
    const deletedCollections = await Collection.deleteMany({ user: userId })

    // Delete the user account
    const deletedUser = await User.findOneAndDelete({
      _id: userId,
    })

    // console.log('deletedUser: ', deletedUser)
    // console.log('collection: ', deletedCollections)

    if (deletedUser) {
      res
        .status(200)
        .json({
          message: 'User account and collections are all deleted',
          response: deletedCollections,
          success: true,
        })
    } else {
      res.status(404).json({
        message: 'User not found',
        response: 'User not found',
        success: false,
      })
    }
  } catch (err) {
    res.status(400).json({
      message: 'Could not delete the user, invalid request',
      response: err,
      success: false,
    })
  }
})

// Create a collection
app.post('/user', async (req, res) => {
  const { title, date, sendTo, image, message } = req.body
  const userId = req.query.id

  try {
    // Create a new collection
    const newCollection = await new Collection({
      title,
      date,
      sendTo,
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
      message: 'Could not create collection, invalid request',
      response: err,
      success: false,
    })
  }
})

// Edit the collection
app.patch('/user/collections', async (req, res) => {
  const collectionId = req.query.collection

  try {
    const updatedCollection = await Collection.findOneAndUpdate(
      { _id: collectionId },
      req.body,
      { new: true }
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

// Delete a collection
app.delete('/user/collections', async (req, res) => {
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

// view the collection
// TODO: can only be open on a specific date, the owner of the collection can always view the collection
// If owner is logged in and the accessToken matched with the Collection.accessToken -> can view the collection
// Or if the today's date matched the Collection.date or after -> everyone can view the collection if they've the link
app.get('/open/:collectionId', async (req, res) => {
  const { collectionId } = req.params

  try {
    if (collectionId) {
      const showCollection = await Collection.findById(collectionId)

      const showCollectionAndUser = await Collection.findById(
        collectionId
      ).populate('user')

      // if user is logged in it will send it's accessToken to this route
      // compare the accessToken with the owner of the collection's accessToken
      const user = await User.findOne({
        accessToken: req.header('Authorization'),
      })

      // console.log('user: ', user)
      // console.log(
      //   'showCollection.date: ',
      //   new Date(showCollection.date).getTime()
      // )
      // console.log('new date: ', new Date().getTime())
      // console.log(
      //   'showCollection.populate(): ',
      //   showCollection.user.accessToken
      // )
      // console.log('user.accesToken: ', user.accessToken)

      // if we have a user logged in and the accessToken match with the owner of the collection -> authorized
      // or if the date match with today's date or have passed > authorized
      // otherwise can't view the collection
      if (user) {
        if (user.accessToken === showCollectionAndUser.user.accessToken) {
          res.status(200).json({ response: showCollection, success: true })
        } else if (
          user.accessToken !== showCollectionAndUser.user.accessToken
        ) {
          // convert the UTC time & date to ms
          if (new Date(showCollection.date).getTime() <= new Date().getTime()) {
            res.status(200).json({ response: showCollection, success: true })
          } else {
            res.status(403).json({
              message:
                'You are not authorized to view the page, or you are too early',
              response:
                'You are not authorized to view the page, or you are too early',
              success: false,
            })
          }
        }
      } else if (
        new Date(showCollection.date).getTime() <= new Date().getTime()
      ) {
        res.status(200).json({ response: showCollection, success: true })
      } else {
        res.status(404).json({
          message: `You are trying to view the collection too early, wait until ${moment
            .utc(showCollection.date)
            .format('ll')}`,
          response: `You are trying to view the collection too early, wait until ${moment
            .utc(showCollection.date)
            .format('ll')}`,
          success: false,
        })
      }
    } else {
      res.status(404).json({
        message: `Collection by id '${collectionId}' not found`,
        response: `Collection by id '${collectionId}' not found`,
        success: false,
      })
    }
  } catch (err) {
    res.status(400).json({
      message: 'Invalid link - collection not found',
      response: err,
      success: false,
    })
  }
})

// Create a user account
app.post('/signup', async (req, res) => {
  const { firstname, lastname, email, password } = req.body

  try {
    // salt -> randomizer
    const salt = bcrypt.genSaltSync()

    // // Stop the executing of try block with throw
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

// User login
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

// * * * * * *
// | | | | | |
// | | | | | day of week
// | | | | month
// | | | day of month
// | | hour
// | minute
// second ( optional )
app.post('/sendemail', (req, res) => {
  const { email, link, date } = req.body
  // console.log('email, link: ', email, link)

  // Create a Nodemailer transporter using either SMTP(this is default) or some other transport mechanism
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: `${process.env.EMAIL}`,
      pass: `${process.env.EMAIL_PASSWORD}`, // use env variable
    },
    // reject because we are running from localhost
    // tls: {
    //   rejectUnauthorized: false,
    // },
  })
  //Note: In the above example, we have mentioned the service as gmail. It is just an example. You can specify the name of the e-mail services you want to use.

  const output = `<div style="background-image: linear-gradient(to bottom left, pink, yellow); padding: 10px;">
    <h2>What an OpenMe:ly day!</h2>
    <p>You got a surprise OpenMe message from someone.</p>
    <p>Here's the link and you can view the message from this date ${moment
      .utc(date)
      .format('ll')} (12:00 UTC):</p>
    <p>${link}</p>
    <p>Kind regards,</p>
    <p>OpenMe Team</p>
    <img src="https://i.ibb.co/Wc6Drhx/openme-icon.png" alt="OpenMe logo"/>
 </div>
 `

  // Setup a message option: This is to tell Nodemailer who is sending what message to whom
  let mailOptions = {
    from: `"OpenMe" <${process.env.EMAIL}>`,
    to: `${email}`,
    subject: 'Message from OpenMe',
    //     text: `What an OpenMe:ly day!

    // You got a surprise OpenMe message from someone.

    // Here's the link to view the message:
    // ${link}

    // Kind regards,
    // OpenMe Team
    // `,
    html: output, //html body
  }
  // Note: The to property above can have multiple email ids separated by commas(,).

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error)
      res.status(400).json({ response: 'error', success: false })
    } else {
      console.log('Email sent: ' + info.response)
      res.status(200).json({ response: 'Email sent', success: true })
    }
  })

  // // schedule 12:00 0'clock,
  // const mailing = cron.schedule('59 17-20 * * *', () => {
  //   // Send e-mail
  //   mailing.stop()
  // })
})

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})
