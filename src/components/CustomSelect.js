import useSearch from "../hooks/useSearch";
import { selectTogglerSvg } from "../svgs/pageContentSVGs";

function CustomSelect({
  currentState,
  chosenItem,
  setChosenItem,
  itemName,
  excludedIds = [],
}) {
  const { filteredData, filterItems } = useSearch(currentState.data, ["name"]);

  return (
    <div className="dropdown dropdown-center w-100">
      <button
        className="btn border w-100 d-flex justify-content-between align-items-center btn-hov"
        type="button"
        id="dropdownMenuButton1"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {chosenItem ? chosenItem.name : `اختر ${itemName}`}
        {selectTogglerSvg}
      </button>
      <ul
        className="dropdown-menu pt-0 position-fixed overflow-hidden"
        aria-labelledby="dropdownMenuButton1"
      >
        <input
          type="text"
          name="search"
          className="form-control border-0 border-bottom rounded-0 shadow-none mb-2 no-outline search-input pe-30px"
          placeholder={`ابحث عن ${itemName} بالإسم`}
          onInput={filterItems}
          autoComplete="off"
        />
        {currentState.loading ? (
          <div className="p-4 text-center fs-small fw-medium">
            جارى التحميل...
          </div>
        ) : currentState.error ? (
          <div className="p-4 text-center fs-small fw-medium">
            حدث خطأ ما:
            <p>{currentState.error.message}</p>
          </div>
        ) : (
          <div className="overflow-y-auto mh-6rem sm-scroll">
            {filteredData.map(
              (item) =>
                !excludedIds.includes(item._id) && (
                  <li className="text-end" key={item._id}>
                    <a
                      className={`dropdown-item rounded py-1 pe-30px btn-hov${
                        chosenItem && chosenItem.name === item.name
                          ? " selected-item"
                          : ""
                      }`}
                      href="/"
                      onClick={(e) => {
                        e.preventDefault();
                        setChosenItem(item);
                      }}
                    >
                      {item.name}
                    </a>
                  </li>
                )
            )}
          </div>
        )}
      </ul>
    </div>
  );
}

export default CustomSelect;
