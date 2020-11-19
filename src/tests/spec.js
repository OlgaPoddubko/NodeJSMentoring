import UserController from '../controllers/userController.js'

const mockRequest = () => {
    const req = {}
    req.params = jest.fn().mockReturnValue(req)
    return req
  }

const mockResponse = () => {
    const res = {}
    res.status = jest.fn().mockReturnValue(res)
    return res
  }

describe("Check method \'getUser\' ", () => {
    test('should return for incorrect id', async () => {
      const req = mockRequest();
      req.params.id = null;
      const res = mockResponse();

      await UserController.getUser(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
    });
});
