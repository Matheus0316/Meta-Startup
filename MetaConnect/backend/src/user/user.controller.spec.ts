import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from '@prisma/client';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  const userArray: User[] = [
    {
      id: '507f1f77bcf86cd799439011',
      name: 'John',
      email: 'john@mail.com',
      password: '123',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '507f1f77bcf86cd799439012',
      name: 'Jane',
      email: 'jane@mail.com',
      password: '123',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  const userServiceMock = {
    getAll: jest.fn().mockResolvedValue(userArray),
    create: jest
      .fn()
      .mockImplementation((userData) =>
        Promise.resolve({ id: '507f1f77bcf86cd799439013', ...userData }),
      ),
    update: jest
      .fn()
      .mockImplementation((id, userData) =>
        Promise.resolve({ id, ...userData }),
      ),
    delete: jest
      .fn()
      .mockImplementation((id) =>
        Promise.resolve(userArray.find((u) => u.id === id) || null),
      ),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [{ provide: UserService, useValue: userServiceMock }],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAll', () => {
    it('should return an array of users', async () => {
      const result = await controller.getAll();
      expect(result).toEqual(userArray);
      expect(service.getAll).toHaveBeenCalled();
    });
  });

  // describe('createUser', () => {
  //   it('should create and return a user', async () => {
  //     const userData = {
  //       name: 'Alice',
  //       email: 'alice@mail.com',
  //       password: '123',
  //     };
  //     const result = await controller.create(userData);
  //     expect(result).toEqual({ id: '507f1f77bcf86cd799439013', ...userData });
  //     expect(service.create).toHaveBeenCalledWith(userData);
  //   });
  // });

  describe('updateUser', () => {
    it('should update and return the user', async () => {
      const userData = { name: 'Updated' };
      const result = await controller.update(userData, '507f1f77bcf86cd799439011');
      expect(result).toEqual({ id: '507f1f77bcf86cd799439011', ...userData });
      expect(service.update).toHaveBeenCalledWith('507f1f77bcf86cd799439011', userData);
    });

    it('should handle updating non-existing user', async () => {
      userServiceMock.update.mockResolvedValueOnce(null);
      const result = await controller.update({ name: 'Ghost' }, '507f1f77bcf86cd799439999');
      expect(result).toBeNull();
      expect(service.update).toHaveBeenCalledWith('507f1f77bcf86cd799439999', { name: 'Ghost' });
    });
  });

  describe('deleteUser', () => {
    it('should delete and return the user', async () => {
      const result = await controller.delete('507f1f77bcf86cd799439011');
      expect(result).toEqual(userArray[0]);
      expect(service.delete).toHaveBeenCalledWith('507f1f77bcf86cd799439011');
    });

    it('should return null if user does not exist', async () => {
      userServiceMock.delete.mockResolvedValueOnce(null);
      const result = await controller.delete('507f1f77bcf86cd799439999');
      expect(result).toBeNull();
      expect(service.delete).toHaveBeenCalledWith('507f1f77bcf86cd799439999');
    });
  });
});
