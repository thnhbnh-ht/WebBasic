import { readData, writeData } from "../repository/readData.js";

export const getAllUsers = async () => {
    const data = await readData();
    return data.users;
};

export const getUserById = async (userId) => {
    const data = await readData();
    return data.users.find((user) => user.id === parseInt(userId)) || null;
};

export const createUser = async (userData) => {
    const data = await readData();
    const newId = data.users.length > 0 ? data.users[data.users.length - 1].id + 1 : 1; //lấy id mới = id cũ +1, nếu danh sách rỗng thì id = 1
    const newUser = {
      id: newId,
      ...userData
    };
    data.users.push(newUser);
    await writeData(data);
    return newUser;
}; 
export const updateUser = async (userId, updateData) => {
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
};
export const deleteUser = async (userId) => {
    const data = await readData();
    const index = data.users.findIndex(user => user.id === parseInt(userId));

    if (index === -1) {
        return null;
    }

    const deleteUser = data.users.splice(index, 1)[0];
    await writeData(data);
    return deleteUser;
};