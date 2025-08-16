import { FaCartPlus } from "react-icons/fa";
import { Link, NavLink } from "react-router";
import logo from '../assets/images.png';
import useAuth from './../Hooks/useAuth';
import toast from "react-hot-toast";


const Navbar = () => {
  const {user, logOut} = useAuth()
  const handleLogOut =()=>{
    logOut().then(() => {
      toast.success("Sign-out successful!");
    }).catch((error) => {
      console.log(error);
    });
  }

    const link = (
        <>
        {/* one */}
            <li><NavLink className={({ isActive }) => isActive ? 'bg-green-700 text-white font-bold ' : 'font-semibold'} to='/'>Home</NavLink></li>
            
            {/* two */}
            <li><NavLink to='/shop' className={({ isActive }) => isActive ? 'bg-green-700 text-white font-bold ' : 'font-semibold'} >Shop</NavLink></li>
            
{/* three  */}
             <li >
        <details>
          <summary className="font-semibold">Languages</summary>
          <ul className="p-2">
            <li><a>English</a></li>
            <li><a>Bangla</a></li>
          </ul>
        </details>
      </li>
          {/* four  */}
         
        
            </>
            )

  return (
    <div className="bg-base-100 shadow-sm sticky top-0 z-50">
      <div className="navbar w-11/12 md:w-10/12 mx-auto px-0">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost md:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {link}
            </ul>
          </div>
          <div className='flex'>
                        <img alt='' src={logo} className='w-10 rounded-xl mr-1 md:mr-3'></img>
                        <NavLink to="/" className=" font-bold text-lg md:text-xl text-green-800  self-center">MediMart</NavLink>
                        

                    </div>
        </div>
        {/* <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {link}
          </ul>
        </div> */}
        <div className="navbar-end">
        <div className="navbar-center hidden md:flex">
          <ul className="menu menu-horizontal px-1">
            {link}
          </ul>
        </div>
        <div className="flex items-center mr-4 ">
             <FaCartPlus size={22} className="text-green-900 cursor-pointer"/>
         </div>
          {/* img  */}
          <div>
             {
                        user ? (
                            <div >
                                <div className="dropdown">
  <div tabIndex={0} role="button" className=" m-1 cursor-pointer bg-gray-400 btn"><img alt={user.displayName} className="w-10 rounded-xl" src={user?.photoURL}></img></div>
  <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w- p-0 shadow-sm">
    <li><Link to='/my-profile'>My Profile</Link></li>
    <li><Link to='/dashboard'>Dashboard</Link></li>
    <li><Link onClick={handleLogOut}>LogOut</Link></li>
  </ul>
</div>
                            </div>
                        ) : (
                            <div >
                               <Link to='/login' className="relative inline-flex items-center justify-start px-3 py-2  overflow-hidden font-medium transition-all bg-gray-200 rounded hover:bg-white group">
    <span className="w-48 h-48 rounded rotate-[-40deg] bg-green-600 absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
    <span className="relative w-full text-left text-black transition-colors duration-300 ease-in-out group-hover:text-white">Join Now</span>
</Link>
                            </div>
                        )
                    }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
