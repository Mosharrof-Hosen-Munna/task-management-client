import React from 'react'
import { toast } from 'react-hot-toast'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import useAuth from '../../Hooks/useAuth'

const Login = () => {
    const { handleEmailPasswordLogin, handleGoogleSignIn,setLoading } = useAuth()

    const navigate = useNavigate()
    const location = useLocation()
    let from = location.state?.from?.pathname || "/"

    const handleSubmit = (e) => {
        e.preventDefault()
        const form = e.target
        const email = form.email.value
        const password = form.password.value
        setLoading(true);
        handleEmailPasswordLogin(email, password)
            .then(result => {
                const user = result.user
                toast.success("Login Successful")
                navigate(from, { replace: true })
                console.log(user);setLoading(false);
            })
            .catch(err => {
                console.error(err);
                toast.error(err.message)
                setLoading(false);
            })
    }

    const signInGoogle = () => {
        setLoading(true);
        handleGoogleSignIn()
          .then(async (result) => {
            
            navigate(from, { replace: true });
            setLoading(false);
          })
          .catch((error) => {
            setLoading(false);
            
            console.log(error.message)})
      };

    return (
        <div>
            <div>
                <div className="w-full mx-auto max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-md sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                    <form onSubmit={handleSubmit} className="space-y-6" action="#">
                        <h5 className="text-xl font-medium text-gray-900 dark:text-white">Sign in to Note Keep</h5>
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                            <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="john@gmail.com" required />
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                            <input type="password" name="password" id="password" placeholder="*******" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                        </div>
                        <a href="#_" className="text-sm text-blue-700 hover:underline dark:text-blue-500">Lost Password?</a>
                        <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login to your account</button>
                    </form>
                    <button onClick={signInGoogle} type="submit" className="w-full mt-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Sign In Google</button>
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                        Not registered? <Link to="/sign-up" className="text-blue-700 hover:underline dark:text-blue-500">Create account</Link>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Login