const request = require('supertest')
const express = require('express')

// Create a test app instance
const app = express()
app.use(express.json())

// Import your routes
const mockUsersData = []
const mockListingsData = []
let id = 4

// Recreate your endpoints for testing
app.post('/api/createuser', (req, res) => {
  const { email, password, name, pfp, bio } = req.body
  
  if (!email || !name || !pfp || !bio || !password) {
    return res.status(400).json({
      error: 'Email, password, name, profile picture, or biography is missing'
    })
  }
  
  const newUser = { email, password, name, pfp, bio }
  mockUsersData.push(newUser)
  
  res.status(201).json({
    message: 'User created successfully'
  })
})

app.post('/api/login', (req, res) => {
  const { email, password } = req.body
  
  if (!email || !password) {
    return res.status(400).json({
      error: 'Email or password is missing'
    })
  }
  
  const validUser = mockUsersData.find(data => data.email === email)
  
  if (!validUser) {
    return res.status(401).json({
      error: 'Invalid user information. Please try again.'
    })
  }
  
  if (validUser.password !== password) {
    return res.status(401).json({
      error: 'Invalid user information. Please try again.'
    })
  }
  
  res.status(201).json({
    message: 'User found successfully',
    email: validUser.email,
    name: validUser.name,
    pfp: validUser.pfp,
    bio: validUser.bio
  })
})

app.post('/api/createlisting', (req, res) => {
  const { title, price, description, photo, location, email } = req.body
  
  if (!title || !price || !description || !photo || !location || !email) {
    return res.status(400).json({
      error: 'Title, price, description, photo, location, or email is missing'
    })
  }
  
  const newListing = {
    id: id++,
    title,
    price,
    description,
    photo,
    location,
    email
  }
  
  mockListingsData.push(newListing)
  
  res.status(201).json({
    message: 'Listing created successfully'
  })
})

app.get('/api/getlistings', (req, res) => {
  res.status(200).json(mockListingsData)
})

app.delete('/api/deletelisting/:id', (req, res) => {
  const listingId = req.params.id
  
  if (!listingId) {
    return res.status(400).json({
      error: 'Missing id'
    })
  }
  
  const foundIndex = mockListingsData.findIndex(listing => listing.id == listingId)
  
  if (foundIndex === -1) {
    return res.status(400).json({
      error: 'Listing does not exist'
    })
  }
  
  mockListingsData.splice(foundIndex, 1)
  return res.status(204).end()
})

describe('User API Endpoints', () => {
  beforeEach(() => {
    mockUsersData.length = 0
  })

  describe('POST /api/createuser', () => {
    test('should create a new user successfully', async () => {
      const newUser = {
        email: 'test@scu.edu',
        password: 'password123',
        name: 'Test User',
        pfp: 'https://example.com/pfp.jpg',
        bio: 'Test bio'
      }

      const response = await request(app)
        .post('/api/createuser')
        .send(newUser)
        .expect(201)

      expect(response.body.message).toBe('User created successfully')
      expect(mockUsersData).toHaveLength(1)
      expect(mockUsersData[0].email).toBe('test@scu.edu')
    })

    test('should return 400 when required fields are missing', async () => {
      const incompleteUser = {
        email: 'test@scu.edu',
        password: 'password123'
      }

      const response = await request(app)
        .post('/api/createuser')
        .send(incompleteUser)
        .expect(400)

      expect(response.body.error).toContain('missing')
    })
  })

  describe('POST /api/login', () => {
    beforeEach(async () => {
      await request(app)
        .post('/api/createuser')
        .send({
          email: 'test@scu.edu',
          password: 'password123',
          name: 'Test User',
          pfp: 'https://example.com/pfp.jpg',
          bio: 'Test bio'
        })
    })

    test('should login successfully with valid credentials', async () => {
      const response = await request(app)
        .post('/api/login')
        .send({
          email: 'test@scu.edu',
          password: 'password123'
        })
        .expect(201)

      expect(response.body.message).toBe('User found successfully')
      expect(response.body.email).toBe('test@scu.edu')
      expect(response.body.name).toBe('Test User')
    })

    test('should return 401 with invalid email', async () => {
      const response = await request(app)
        .post('/api/login')
        .send({
          email: 'wrong@scu.edu',
          password: 'password123'
        })
        .expect(401)

      expect(response.body.error).toContain('Invalid user information')
    })

    test('should return 401 with invalid password', async () => {
      const response = await request(app)
        .post('/api/login')
        .send({
          email: 'test@scu.edu',
          password: 'wrongpassword'
        })
        .expect(401)

      expect(response.body.error).toContain('Invalid user information')
    })

    test('should return 400 when email or password is missing', async () => {
      const response = await request(app)
        .post('/api/login')
        .send({
          email: 'test@scu.edu'
        })
        .expect(400)

      expect(response.body.error).toContain('missing')
    })
  })
})

describe('Listing API Endpoints', () => {
  beforeEach(() => {
    mockListingsData.length = 0
  })

  describe('POST /api/createlisting', () => {
    test('should create a new listing successfully', async () => {
      const newListing = {
        title: 'Test Item',
        price: '50.00',
        description: 'Test description',
        photo: 'https://example.com/photo.jpg',
        location: 'Test Location',
        email: 'seller@scu.edu'
      }

      const response = await request(app)
        .post('/api/createlisting')
        .send(newListing)
        .expect(201)

      expect(response.body.message).toBe('Listing created successfully')
      expect(mockListingsData).toHaveLength(1)
      expect(mockListingsData[0].title).toBe('Test Item')
    })

    test('should return 400 when required fields are missing', async () => {
      const incompleteListing = {
        title: 'Test Item',
        price: '50.00'
      }

      const response = await request(app)
        .post('/api/createlisting')
        .send(incompleteListing)
        .expect(400)

      expect(response.body.error).toContain('missing')
    })
  })

  describe('GET /api/getlistings', () => {
    test('should return all listings', async () => {
      await request(app)
        .post('/api/createlisting')
        .send({
          title: 'Item 1',
          price: '50.00',
          description: 'Description 1',
          photo: 'https://example.com/photo1.jpg',
          location: 'Location 1',
          email: 'seller1@scu.edu'
        })

      await request(app)
        .post('/api/createlisting')
        .send({
          title: 'Item 2',
          price: '100.00',
          description: 'Description 2',
          photo: 'https://example.com/photo2.jpg',
          location: 'Location 2',
          email: 'seller2@scu.edu'
        })

      const response = await request(app)
        .get('/api/getlistings')
        .expect(200)

      expect(response.body).toHaveLength(2)
      expect(response.body[0].title).toBe('Item 1')
      expect(response.body[1].title).toBe('Item 2')
    })

    test('should return empty array when no listings exist', async () => {
      const response = await request(app)
        .get('/api/getlistings')
        .expect(200)

      expect(response.body).toEqual([])
    })
  })

  describe('DELETE /api/deletelisting/:id', () => {
    test('should delete a listing successfully', async () => {
      await request(app)
        .post('/api/createlisting')
        .send({
          title: 'Test Item',
          price: '50.00',
          description: 'Test description',
          photo: 'https://example.com/photo.jpg',
          location: 'Test Location',
          email: 'seller@scu.edu'
        })

      const listingId = mockListingsData[0].id

      await request(app)
        .delete(`/api/deletelisting/${listingId}`)
        .expect(204)

      expect(mockListingsData).toHaveLength(0)
    })

    test('should return 400 when listing does not exist', async () => {
      const response = await request(app)
        .delete('/api/deletelisting/999')
        .expect(400)

      expect(response.body.error).toBe('Listing does not exist')
    })
  })
})
