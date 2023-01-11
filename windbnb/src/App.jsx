import data from "./data/stays.json";
import windbnb from "./assets/logo.svg";
const Image = ({ image, alt, className }) => (
  <img src={image} alt={alt} className={`w-full ${className}`} />
);

const Anchor = ({ link, text, target }) => (
  <a href={link} target={target}>
    {text}
  </a>
);

const Button = ({ text, className, onClick }) => (
  <button onClick={() => onClick} className={className}>
    {text}
  </button>
);

function App() {
  return (
    <div className="mx-4 md:mx-8 lg:mx-12 my-4 md:my-8">
      <header className="flex justify-between flex-col md:flex-row gap-8 md:gap-0">
        <div className=" self-start md:self-center">
          <Image image={windbnb} alt="windbnb" />
        </div>
        <div className="self-center md:self-auto font-mulish">
          <div className="shadow-box rounded-2xl flex px-3 gap-2 justify-center text-sm leading-4">
            <Button
              text={"Helsinki, Finland"}
              className="py-4 text-[#333333]"
            />
            <div className=" border-l-[0.0625rem] border-l-[#f2f2f2]"></div>
            <Button text={"Add guests"} className="text-[#BDBDBD]" />
            <div className=" border-l-[0.0625rem] border-l-[#f2f2f2]"></div>
            <span className="material-icons self-center text-[#EB5757]">
              search
            </span>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
