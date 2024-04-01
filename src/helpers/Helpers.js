export const joinItems = (list) => {
  if (list.length === 2) {
    return list.join(" & ");
  } else {
    return list.join(", ");
  }
};

export const findObjectById = async (arr, id) => {
  const data = await arr.find(x => x.id === id);
  return data;
}

export const sortByProperty = (arr, prop) => {
  return arr.sort((a,b)=> {
    const propA = a[prop];
    const propB = b[prop];
    if(propA < propB){
      return -1;
    }
    if(propA > propB){
      return 1;
    }
    return 0;
  });
}

export const generateIdFromTitle = (title) => {
  return title.toLowerCase().replace(/[^\w\s]/gi, '').replace(/ /g,"_");
}