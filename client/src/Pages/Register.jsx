import React, { use } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import useAuth from "../Hooks/useAuth";
import toast from "react-hot-toast";
import { imageUpload, saveUserInDB } from "../api/utils";

const Register = () => {
  const { createUser,setUser,updateUser,signInWithGoogle } = useAuth();
    const location = useLocation();
    const navigate = useNavigate()
  const handleRegister = async(e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    // image upload
    // const photo = form.photo.value;
    const image = form.image.files[0];
        const imageUrl = await imageUpload(image);
        console.log(imageUrl);
    const email = form.email.value;
    const password = form.password.value;
    const role = form.role.value;
    console.log(name, image, email, password, role);
    
    createUser(email, password)
      .then(async(result) => {
        const user = result.user;
        console.log(result);
        updateUser({ displayName: name, photoURL: imageUrl })
        .then(() => {
          setUser({...user, displayName: name, photoURL: imageUrl });
        })
        .catch((error) => {
            setUser(user);
          console.error("Error updating user:", error);
        });

        
        toast.success("Registration successful!");
         navigate("/");
         const userData = {
                       name,
                       email,
                       image: imageUrl,
                       role
                     }
                     // console.log(userData);
                     await saveUserInDB(userData)
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log({ errorCode, errorMessage });
        toast.error("Registration failed: " + errorMessage);
        // ..
      });
  };
   const handleGoogleSignIn = async () => {
try {
  //User Registration using google
  const result = await signInWithGoogle()
     const userData = {
                name : result?.user?.displayName,
                email: result?.user?.email,
                image: result?.user?.photoURL,
                role: 'user'
              }
              // console.log(userData);
              await saveUserInDB(userData)
  navigate(location.state ? location.state : "/");
  toast.success('Login Successful')
} catch (err) {
  console.log(err)
  toast.error(err?.message)
}
}
  return (
    <>
      <div className="hero my-7 ">
        <div className="hero-content flex-col lg:flex-row-reverse ">
          <div className="text-center lg:text-left"></div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 ">
            <div className="card-body">
              <h1 className="text-4xl font-bold pb-1">Sign Up Now!</h1>

              <form onSubmit={handleRegister} className="grid gap-1">
                <label className="label "></label>
                <input
                  name="name"
                  type="text"
                  className="input md:w-96"
                  placeholder="Name"
                  required
                />

                <label className="label "></label>
                {/* <input
                  name="photo"
                  type="text"
                  className="input md:w-96"
                  placeholder="PhotoURL"
                  required
                /> */}
                <input type="file" name="image" className="file-input file-input-md md:w-96" placeholder="" required/>

                <label className="label "></label>
                <input
                  name="email"
                  type="email"
                  className="input md:w-96"
                  placeholder="Email"
                  required
                />

                <label className="label"></label>
                <input
                  name="password"
                  type="password"
                  className="input md:w-96"
                  placeholder="Password"
                  required
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
                  title="Must be more than 6 characters, including number, lowercase letter, uppercase letter"
                />

                <select
                  defaultValue="Select Role"
                  className="select md:w-96 mt-1"
                  name="role"
                >
                  <option disabled={true}>Select Role</option>
                  <option>user</option>
                  <option>seller</option>
                </select>

                <button
                  type="submit"
                  className="btn w-80 md:w-96 mt-2  bg-green-700 text-white"
                >
                  Register
                </button>
              </form>
              {/* google  */}
              <button onClick={handleGoogleSignIn} className="btn w-80 md:w-96 bg-white hover:bg-gray-200 text-black border-gray-700">
                <svg
                  aria-label="Google logo"
                  width="16"
                  height="16"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <g>
                    <path d="m0 0H512V512H0" fill="#fff"></path>
                    <path
                      fill="#34a853"
                      d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                    ></path>
                    <path
                      fill="#4285f4"
                      d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                    ></path>
                    <path
                      fill="#fbbc02"
                      d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                    ></path>
                    <path
                      fill="#ea4335"
                      d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                    ></path>
                  </g>
                </svg>
                Login with Google
              </button>

              <p className="mt-1">
                Already have an account?{" "}
                <Link to="/login" className="text-red-600 underline ">
                  {" "}
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
