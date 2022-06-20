import Profile from "../userProfile";
import classes from "./navbar.module.css";
import { useUser } from "../../context/userContext";
import { AiOutlineAlignLeft } from "react-icons/ai";

const Navbar = ({ toggleChange }) => {
  const { user } = useUser();
  console.log("user=", user.role);
  return (
    <section className="flex flex-row items-center justify-between">
      <div className="flex pt-2 pl-10">
        <div className="flex items-center pr-5">
          <AiOutlineAlignLeft
            className={classes.icon1}
            onClick={toggleChange}
          />
        </div>

        {/* navbar search input for admin*/}
        {
          user?.role === 'admin' &&
          <h2 className="text-sky-700 pt-2 font-semibold text-lg ml-3 capitalize">{user.role}</h2>
        }

        {/* navbar title for school management*/}
        {
          user?.role === 'librarian' &&
          <div className="flex justify-between">
            <div><h1 className="text-sky-700 pt-2 font-semibold text-lg ml-3 capitalize">{user.libraryId.libraryName?.toUpperCase()}</h1></div>
            <div><h1 className="text-sky-700 pt-2 font-semibold text-lg ml-3 capitalize">{user.libraryId.institutionName?.toUpperCase()}</h1></div>
          </div>
        }
        {
          user?.role === 'teacher' &&
          <div className="flex justify-between">
            <div><h1 className="text-sky-700 pt-2 font-semibold text-lg ml-3 capitalize">{user.libraryId.libraryName?.toUpperCase()}</h1></div>
            <div><h1 className="text-sky-700 pt-2 font-semibold text-lg ml-3 capitalize">{user.libraryId.institutionName?.toUpperCase()}</h1></div>
          </div>
        }
        {
          user?.role === 'member' &&
          <div className="flex justify-between">
            <div><h1 className="text-sky-700 pt-2 font-semibold text-lg ml-3 capitalize">{user.libraryId.libraryName?.toUpperCase()}</h1></div>
            <div><h1 className="text-sky-700 pt-2 font-semibold text-lg ml-3 capitalize">{user.libraryId.institutionName?.toUpperCase()}</h1></div>
          </div>
        }
      </div>

      <div className="flex items-center">
        <Profile />
      </div>
    </section>
  );
};
export default Navbar;
