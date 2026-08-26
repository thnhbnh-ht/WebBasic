import { readData, writeData } from "../repository/readData.js";

export const getAllUsers = async () => { //lấy tất cả người dùng
  try {
    const data = await readData();
    return data.users;
  }
  catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
}

export const getUserById = async (userId) => { //lấy người dùng theo id
  try {
    const data = await readData();

    const user = data.users.find(user => user.id === parseInt(userId));
    return user || null;
  }
  catch (error) {
    console.error(`Error fetching user with ID ${userId}:`, error);
    throw error;
  }
}
export const createUser = async (newUserData) => { //tạo người dùng mới
  try {
    const data = await readData(); 
    const newId = data.users.length > 0 ? data.users[data.users.length - 1].id + 1 : 1; //lấy id mới = id cũ +1, nếu danh sách rỗng thì id = 1
    const newUser = {
      id: newId,
      ...newUserData
    };

    data.users.push(newUser);
    await writeData(data);
    return newUser;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

export const updateUser = async (userId, updateUserData) => { //cập nhật thông tin người dùng
  try {
    const data = await readData();
    const index = data.users.findIndex(user => user.id === parseInt(userId));

    if (index === -1) {
      return null;
    }

    data.users[index] = {
      ...data.users[index],
      ...updateUserData,
      id: data.users[index].id 
    };

    await writeData(data);
    return data.users[index];
  } catch (error) {
    console.error(`Error updating user with ID ${userId}:`, error);
    throw error;
  }
}

export const deleteUser = async (userId) => { //xóa người dùng
  try {
    const data = await readData();
    const index = data.users.findIndex(user => user.id === parseInt(userId));

    if (index === -1) {
      return false;
    }

    data.users.splice(index, 1);
    await writeData(data);
    return true;
  } catch (error) {
    console.error(`Error deleting user with ID ${userId}:`, error);
    throw error;
  }
}