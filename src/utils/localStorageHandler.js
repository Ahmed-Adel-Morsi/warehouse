const getValue = (itemName, defaultValue = null) => {
  const saved = localStorage.getItem(itemName);
  return saved ? JSON.parse(saved) : defaultValue;
};

const setValue = (itemName, value, validCondition) => {
  if (validCondition) localStorage.setItem(itemName, JSON.stringify(value));
  else localStorage.removeItem(itemName);
};

export { getValue, setValue };
