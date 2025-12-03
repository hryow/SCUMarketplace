const express = require('express')
const request = require('supertest')

describe('Routes Configuration', () => {
  test('routes.js exports router correctly', () => {
    const routes = require('./routes')
    expect(routes).toBeDefined()
    expect(typeof routes).toBe('function')
  })

  test('router has correct HTTP methods registered', () => {
    const routes = require('./routes')
    const stack = routes.stack

    const methods = stack.map(layer => ({
      path: layer.route.path,
      method: Object.keys(layer.route.methods)[0]
    }))

    expect(methods).toContainEqual({ path: '/createuser', method: 'post' })
    expect(methods).toContainEqual({ path: '/login', method: 'post' })
    expect(methods).toContainEqual({ path: '/createlisting', method: 'post' })
    expect(methods).toContainEqual({ path: '/getlistings', method: 'get' })
  })
})
