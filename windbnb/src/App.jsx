import data from "./data/stays.json";
import windbnb from "./assets/logo.svg";
import React, { useState, useRef, useEffect } from "react";

/* #region Functions  */
const Image = ({ image, alt, className }) => (
  <img src={image} alt={alt} className={`w-full ${className}`} />
);

const Anchor = ({ link, text, target }) => (
  <a href={link} target={target}>
    {text}
  </a>
);

const Button = ({ text, className, onClick, innerRef }) => (
  <button onClick={onClick} className={className} ref={innerRef}>
    {text}
  </button>
);

const Paragraph = ({ text, className }) => <p className={className}>{text}</p>;

/* #endregion */

const CreateHomes = ({ data }) =>
  data.map((home) => {
    return (
      <div className="flex flex-col gap-2 font-montserrat" key={home?.title}>
        <Image
          image={home?.photo}
          className={"max-h-72 md:max-h-60 lg:max-h-[15rem] h-full rounded-3xl"}
          alt={home?.title}
        />
        <div className="flex justify-between items-center">
          <div className="flex gap-2 text-[#828282] text-sm items-center justify-center">
            {home?.type === "Entire apartment" ? (
              <Paragraph
                text={"Super Host"}
                className=" text-[#4F4F4F] text-xxs lg:text-xs py-1 px-2 font-bold leading-4 outline-[#4F4F4F] outline outline-1 rounded-xl flex items-center justify-center uppercase"
              />
            ) : undefined}
            <Paragraph text={home?.type} />
            {home?.beds ? <Paragraph text={home.beds + " beds"} /> : undefined}
          </div>
          <div className="flex gap-1 items-center">
            <span className="material-icons text-[#EB5757] text-xl">star</span>
            <Paragraph text={home?.rating} className=" text-[#4f4f4f]" />
          </div>
        </div>
        <Paragraph
          text={home?.title}
          className="text-base leading-5 font-semibold text-[#333333]"
        />
      </div>
    );
  });

//* search function

/* #region Search Menu Options */
const changeButtonFocus = ({ activate }) => {
  const focusGuest = document.querySelector("#focusGuest");
  const focusLocation = document.querySelector("#focusLocation");
  const guest_options = document.querySelector("#guest-options");
  const location_options = document.querySelector("#location-options");

  if (activate === "location") {
    focusLocation.classList.add("md:outline");
    focusGuest.classList.remove("md:outline");
    guest_options.classList.add("invisible", "hidden");
    location_options.classList.remove("invisible", "hidden");
    return;
  }
  focusGuest.classList.add("md:outline");
  focusLocation.classList.remove("md:outline");
  location_options.classList.add("invisible", "hidden");
  guest_options.classList.remove("invisible", "hidden");
  return;
};

const showMenu = ({ target }) => {
  const searchMenu = document.querySelector("#search-menu");
  if (target) {
    searchMenu.classList.contains("hidden")
      ? searchMenu.classList.remove("hidden")
      : searchMenu.classList.add("hidden");
  }

  if (target === "location") {
    return changeButtonFocus({ activate: "location" });
  }

  return changeButtonFocus({ activate: "guest" });
};

/* #endregion */

function App() {
  const [filteredData, setFilteredData] = useState(data);
  const [stays, setStays] = useState(12);
  const [SearchLocation, setSearchLocation] = useState("Helsinki, Finland");
  const [noOfGuest, setNoOFGuest] = useState("Add guests");
  const Error = useRef();
  const btnGuestRef = useRef();
  const page = useRef();
  const searchMenuRef = useRef();

  useEffect(() => {
    return Number(noOfGuest.split(" ")[0]) > 0
      ? changeColor(btnGuestRef, "dark")
      : changeColor(btnGuestRef, "light");
  });

  //* filter data
  const searchForHomes = ({ Number, location, NoOfGuest }) => {
    const searchMenu = document.querySelector("#search-menu");
    const realLocation = location;
    const newLocation = location.split(",")[0];
    const newData = data.filter((data) => {
      if (newLocation != "Add location")
        return data.maxGuests >= Number && data?.city === newLocation;
      return data.maxGuests >= Number;
    });
    if (newData.length > 0) {
      setFilteredData(newData);
      setStays(newData.length);
      setSearchLocation(realLocation);
      setNoOFGuest(NoOfGuest);
      if (searchMenu) {
        return searchMenu.classList.add("hidden");
      }
      return;
    }
    setTimeout(() => {
      Error.current.classList.remove("invisible");
    }, 400);
    return setTimeout(() => {
      Error.current.classList.add("invisible");
      searchMenu.classList.add("hidden");
    }, 4000);
  };

  /* #region change font colour */

  const changeColor = (element, colour) => {
    if (colour === "dark") {
      element.current.classList.remove("text-[#BDBDBD]");
      element.current.classList.add("text-[#333333]");
      return;
    }
    if (colour === "light") {
      element.current.classList.add("text-[#BDBDBD]");
      element.current.classList.remove("text-[#333333]");
      return;
    }
    return;
  };

  /* #endregion */

  const Search = () => {
    /* #region variables */
    const [SearchLocation, setState] = useState("Add location");
    const [Guest, setGuest] = useState("Add guests");
    const [Adults, setAdult] = useState(0);
    const [Children, setChildren] = useState(0);

    const [stays, setNoOfStays] = useState(0);
    const GuestButtonRef = useRef();
    const LocationButtonRef = useRef();

    /* #endregion */

    /* #region useEffect */
    useEffect(() => {
      if (GuestButtonRef?.current) {
        SearchLocation != "Add location"
          ? changeColor(LocationButtonRef, "dark")
          : changeColor(LocationButtonRef, "light");

        if (Adults < 1) {
          changeColor(GuestButtonRef, "light");
          setGuest("Add guests");
          return;
        }
      }
      if (Adults > 0) {
        Adults > 1
          ? setGuest(
              `${Adults} Adults ${
                Children > 0
                  ? Children == 1
                    ? `${Children} Child`
                    : `${Children} Children`
                  : "No Child"
              }`
            )
          : setGuest(
              `${Adults} Adult ${
                Children > 0
                  ? Children == 1
                    ? `${Children} Child`
                    : `${Children} Children`
                  : "No Child"
              }`
            );
      }
    }, [Adults, Children, SearchLocation]);

    useEffect(() => {
      return setNoOfStays(() => Adults + Children);
    });
    /* #endregion */

    /* #region Increase or decrease values */
    const AdultFunc = (action) => {
      if (action === "add") {
        setAdult(Adults + 1);
        changeColor(GuestButtonRef, "dark");
        return;
      }
      if (Adults < 1) return 0;
      if (action === "sub") {
        setAdult(Adults - 1);
        return;
      }
      return 0;
    };
    /* #endregion */

    /* #region Create list of Cities */

    const CreateLocations = () => {
      const allLocations = data
        .map((data) => {
          return `${data.city}, ${data.country}`;
        })
        .sort();
      const set = [...new Set(allLocations)];
      const List = set.map((venue) => (
        <li key={venue} className="flex gap-2 text-[#4F4F4F] items-center">
          <span className="material-icons ">location_on</span>
          <Button
            text={venue}
            className="text-sm font-normal leading-4"
            onClick={() => setState(venue)}
          />
        </li>
      ));
      return <ul className="flex flex-col gap-6">{List}</ul>;
    };

    /* #endregion */

    return (
      // search container
      <div
        className="py-4 md:h-auto md:pt-16 w-full absolute top-0 left-0 bg-white hidden"
        id="search-menu"
        ref={searchMenuRef}
      >
        {/* search div */}
        <div className="self-center md:self-auto font-mulish flex flex-col md:flex-row justify-center px-2 md:px-8 flex-[33.33%]  flex-wrap gap-2 md:gap-10">
          {/* mobiile devices close button */}
          <div className="md:hidden pt-2 pb-4 flex items-center justify-between">
            <Paragraph
              text={"Edit your search"}
              className=" text-sm font-bold leading-3 text-[#333333]"
            />
            <button
              onClick={() => searchMenuRef.current.classList.add("hidden")}
            >
              <span className="material-icons">close</span>
            </button>
          </div>
          {/*grid container  */}
          <div className="shadow-box rounded-xl grid grid-cols-1 md:grid-cols-3 text-sm leading-4 w-full gap-2 md:gap-0">
            {/* buttons */}

            {/* location button */}
            <div
              className="w-full md:outline md:outline-1 md:outline-[#333333] relative rounded-xl px-4 cursor-pointer"
              id="focusLocation"
              onClick={() => changeButtonFocus({ activate: "location" })}
            >
              <div className="flex flex-col py-2 gap-1 self-start md:self-auto justify-self-start w-fit">
                <Paragraph
                  text={"Location"}
                  className="uppercase text-xxs text-[#333333] font-extrabold leading-3"
                />
                <Button
                  text={SearchLocation}
                  className="text-[#BDBDBD]"
                  innerRef={LocationButtonRef}
                />
              </div>
            </div>

            {/* line */}
            <div className="md:hidden w-full border-b-[0.0625rem] border-b-[#ccc6c6]"></div>

            {/* guest button */}
            <div
              className="w-full md:outline-1 md:outline-[#333333] relative rounded-xl px-4 items-center flex cursor-pointer"
              id="focusGuest"
              onClick={() => {
                changeButtonFocus({ activate: "guest" });
              }}
            >
              <div className="flex flex-col gap-1 self-start md:self-center justify-self-start w-fit ">
                <Paragraph
                  text={"Guests"}
                  className="uppercase text-xxs text-[#333333] font-extrabold leading-3"
                />
                <Button
                  text={Guest}
                  className="text-[#BDBDBD]"
                  innerRef={GuestButtonRef}
                />
              </div>
            </div>

            {/* line */}
            <div className="md:hidden border-l-[0.0625rem] border-l-[#f2f2f2]"></div>

            {/* Search Button */}
            <div className="w-full flex justify-center">
              <button
                className="w-fit flex items-center bg-[#EB5757] h-min self-center py-2 px-4 gap-2 rounded-2xl absolute bottom-10 md:relative md:bottom-auto cursor-pointer group hover:bg-[#eb3861]"
                onClick={() =>
                  searchForHomes({
                    Number: stays,
                    location: SearchLocation,
                    NoOfGuest: Guest,
                  })
                }
              >
                <span className="material-icons self-center text-white cursor-pointer group-hover:scale-125 peer">
                  search
                </span>
                <span className=" font-mulish font-bold text-[#f2f2f2] text-sm hover:peer:scale-125 group-hover:text-white group-hover:text-base">
                  Search
                </span>
              </button>
            </div>
          </div>

          {/* locations */}
          <div
            className="flex-1 px-3 md:px-2 md:flex mt-4 mb-6 md:mt-0 md:mb-0"
            id="location-options"
          >
            <CreateLocations />
          </div>

          {/* guests */}
          <div
            className="grid grid-rows-2 gap-10 flex-1 px-4 md:px-2  mt-4 mb-6 md:mt-0 md:mb-0"
            id="guest-options"
          >
            <div className="flex flex-col gap-2">
              <div className="">
                <Paragraph
                  text={"Adults"}
                  className="font-bold text-sm text-[#333333]"
                />
                <Paragraph
                  text={"Ages 13 or above"}
                  className="font-normal text-sm text-[#BDBDBD]"
                />
              </div>
              <div className="flex gap-4 ">
                <div>
                  <Button
                    text={"-"}
                    className="outline outline-1 outline-[#828282] rounded px-2 "
                    onClick={() => AdultFunc("sub")}
                  />
                </div>
                <span>{Adults}</span>
                <Button
                  text={"+"}
                  className="outline outline-1 outline-[#828282] rounded px-2 data-[bold]:text-[#333333]"
                  onClick={() => AdultFunc("add")}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="">
                <Paragraph
                  text={"Children"}
                  className="font-bold text-sm text-[#333333]"
                />
                <Paragraph
                  text={"Ages 2-12"}
                  className="font-normal text-sm text-[#BDBDBD]"
                />
              </div>
              <div className="flex gap-4 ">
                <div>
                  <Button
                    text={"-"}
                    className="outline outline-1 outline-[#828282] rounded px-2"
                    onClick={() =>
                      Children > 0 ? setChildren(Children - 1) : setChildren(0)
                    }
                  />
                </div>
                <span>{Children}</span>
                <Button
                  text={"+"}
                  className="outline outline-1 outline-[#828282] rounded px-2"
                  onClick={() => setChildren((Children) => Children + 1)}
                />
              </div>
            </div>
          </div>
          <div className=" flex-1"></div>
        </div>
        <div
          className="text-center text-red-800 bg-white text-sm mt-12 invisible animate-pulse"
          ref={Error}
        >
          0 Houses Found
        </div>
      </div>
    );
  };

  return (
    <div
      className="mx-4 md:mx-8 lg:mx-12 xl:mx-12 my-4 md:my-8"
      ref={page}
      id="page"
    >
      {/* header */}
      <Search />
      <header className="flex justify-between flex-col md:flex-row gap-8 md:gap-0">
        <div className=" self-start md:self-center">
          <Image image={windbnb} alt="windbnb" />
        </div>
        <div className="self-center md:self-auto font-mulish">
          <div className="shadow-box rounded-2xl flex px-3 gap-2 justify-center text-sm leading-4">
            <Button
              text={SearchLocation}
              className="py-4 text-[#333333]"
              onClick={() => showMenu({ target: "location" })}
            />
            <div className=" border-l-[0.0625rem] border-l-[#f2f2f2]"></div>
            <Button
              text={noOfGuest}
              className="text-[#BDBDBD]"
              onClick={() => showMenu({ target: "guest" })}
              innerRef={btnGuestRef}
            />
            <div className=" border-l-[0.0625rem] border-l-[#f2f2f2]"></div>
            <button onClick={() => showMenu({ target: "location" })}>
              <span className="material-icons self-center text-[#EB5757] cursor-pointer hover:scale-125">
                search
              </span>
            </button>
          </div>
        </div>
      </header>
      {/* main */}
      <main className="mt-8 md:mt-16">
        {/* info */}
        <article className="flex justify-between font-montserrat items-center">
          <Paragraph
            className="font-bold text-lg md:text-xl lg:text-2xl leading-7 text-[#333333]"
            text="Stays in Finland"
          />
          <Paragraph
            className={"font-medium text-sm leading-4 text-[#4F4F4F]"}
            text={`${stays > 1 ? stays + "+ stays" : stays + " stay"} `}
          />
        </article>
        {/* houses */}
        <article
          className="mt-6 md:mt-8 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 xl:gap-10 auto-rows-[minmax(0,_1fr)]"
          id="main-article"
        >
          <CreateHomes data={filteredData} />
        </article>
      </main>
    </div>
  );
}

export default App;
