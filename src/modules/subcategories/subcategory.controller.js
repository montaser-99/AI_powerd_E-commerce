import { createList,renameList,deleteList,addProductToList,removeProductFromList } from "./subcategory.service.js";



export const createListController = async (req, res) => {
  try {
    const userId = req.user.userId;
    const listData = req.body;

    const list = await createList(userId, listData);

    return res.status(201).json({
      message: "List created successfully",
      list,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const renameListController = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { listId } = req.params;
    const { name } = req.body;

    const list = await renameList(userId, listId, name);

    return res.status(201).json({
      message: "List renamed successfully",
      list,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteListController = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { listId } = req.params;

    const list = await deleteList(userId, listId);

    return res.status(201).json({
      message: "List deleted successfully",
      list,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const addProductToListController = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { listId } = req.params;
    const { productId } = req.body;

    const list = await addProductToList(
      userId,
      listId,
      productId
    );

    return res.status(201).json({
      message: "Product added to list successfully",
      list,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const removeProductFromListController = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { listId, productId } = req.params;

    const list = await removeProductFromList(
      userId,
      listId,
      productId
    );

    return res.status(201).json({
      message: "Product removed from list successfully",
      list,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};