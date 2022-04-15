const capitalizeString = (string) => {
  const parts = string.split(' ');
  let returnString = '';
  parts.map((part, index) => {
    let updatedPart = index === 0 ? '' : ' ';
    updatedPart += capitalizeWord(part);
    returnString += updatedPart;
  });
  return returnString;
};

const capitalizeWord = (string) => {
  return string[0].toUpperCase() + string.substring(1);
};

export { capitalizeString };
