import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom"

const Header = () => {
  return (
    <header className='bg-green-100'>
      <div className='py-4 items-center flex justify-between w-[92%] mx-auto'>
        <Link to={"/"}>
        <h1 className='text-xl md:text-2xl  capitalize text-zinc-600'>Arjun<span className='text-zinc-950 font-bold'>RealState</span></h1>
        </Link>

        <form className="w-32 sm:w-56 border-2 bg-white border-gray-400 py-1 px-2 rounded-lg flex items-center justify-between relative">
          <input type="text" placeholder='Search...' id='search' className='focus:outline-none bg-transparent' />
          <button className="absolute right-1">
          <FaSearch className="text-sm" />
          </button>
        </form>

        <div>
          <ul className="flex gap-4 sm:text-xl items-center">
            <Link to={"/"}>
            <li className="hidden md:inline hover:text-zinc-400 hover:underline">Home</li>
            </Link>
            <Link to={"/about"}>
            <li className="hidden md:inline hover:text-zinc-400 hover:underline">About</li>
            </Link>
            <Link to={'/signin'}>
            <li className=" bg-zinc-300 py-1 px-1 rounded-lg hover:bg-zinc-400 hover:text-white">Sign-In</li>
            </Link>
          </ul>
        </div>

      </div>
    </header>
  )
}

export default Header