const handleDropdownChoice = (e, chosenItem, actions) => {
  e.preventDefault();
  document.querySelectorAll(".dropdown .dropdown-item").forEach((e) => {
    e.classList.remove("selected-item");
  });
  e.target.classList.add("selected-item");
  document.getElementById("dropdownMenuButton1").firstChild.textContent =
    chosenItem.name;
  actions();
};

export default handleDropdownChoice;
