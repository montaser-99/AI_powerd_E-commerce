import subModel from "./subcategory.model.js"

export const createList = async (userId , listData) =>{
const list = await subModel.create({
    user_id:userId,
    ...listData
});

return list
};

export const renameList = async (userId , listId , name)=>{
    const list = await subModel.findOne({id:listId,userId:userId})

    if(!list){
        throw new Error("List not found")
    }
    list.name=name
    await list.save()
    return list
};

export const deleteList = async (userId ,listId)=>{
     const list = await subModel.findOne({id:listId,userId:userId})

    if(!list){
        throw new Error("List not found")
    }
     await list.deleteOne()
        return list
};

export const addProductToList = async (
  userId,
  listId,
  productId
) => {
  const list = await SmartList.findOne({
    _id: listId,
    user_id: userId,
  });

  if (!list) {
    throw new Error("List not found");
  }

  list.items.push({
    product_id: productId,
  });

  await list.save();

  return list;
};

export const removeProductFromList = async (
  userId,
  listId,
  productId
) => {
  const list = await SmartList.findOne({
    _id: listId,
    user_id: userId,
  });

  if (!list) {
    throw new Error("List not found");
  }

  const oldLength = list.items.length;

  list.items = list.items.filter(
    (item) => item.product_id.toString() !== productId.toString()
  );

  if (list.items.length === oldLength) {
    throw new Error("Product not found in list");
  }

  await list.save();

  return list;
};
