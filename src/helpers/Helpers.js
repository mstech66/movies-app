export const joinItems = (list) => {
  if (list.length === 2) {
    return list.join(" & ");
  } else {
    return list.join(", ");
  }
};

export const findObjectById = async (arr, id) => {
  await arr.forEach(element => {
    if(element.id ===  id){
      console.log('Found', element)
      return element;
    }
  });
}