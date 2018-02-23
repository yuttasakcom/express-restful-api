import Controller from '@/controllers/Controller'

class UsersController {
  constructor(req, res) {
    this.req = req
    this.res = res
  }

  get() {
    const users = { data: [{ name: 'Yo' }, { name: 'Yea' }] }
    return this.res.json(users)
  }

  getById() {
    return this.res.json({
      id: parseInt(this.req.params.id),
      name: 'YoProgrammer'
    })
  }
}

export default UsersController
