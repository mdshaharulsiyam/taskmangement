import { createContext, useEffect, useState } from "react"
export const YourTaskData = createContext({})
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";
import app from "../Firebase/FirebaseConfig";
import Swal from "sweetalert2";
import useAxiosrequest from "../Hooks/useAxiosrequest";
import useAxiosSecure from "../Hooks/useAxiosSecure";
const auth = getAuth(app)
const YourTaskContext = ({ children }) => {
    const axiosrequest = useAxiosrequest()
    const axiosecure = useAxiosSecure()
    const [currentUser, setCurrentUser] = useState({})
    const [loading, setloading] = useState(true)
    // create new user 
    const createNewUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const loginuser = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }
    const provider = new GoogleAuthProvider()
    const loginwithGoogle = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                const userData = {
                    profileImage: user.photoURL,
                    username: user.displayName,
                    useremail: user.email,
                    role: "user",
                    emailVerified: user.emailVerified
                }
                axiosrequest.post('/users', userData)
                    // setloading(false)
                    .then((res) => {
                        navigate('/')
                    })
                console.log(userData)
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'logged in successfully',
                    showConfirmButton: false,
                    timer: 1500
                })
                //   setloading(false)
            }).catch((error) => {
                const errorMessage = error.message;
                Swal.fire(
                    'opps!!',
                    `${errorMessage}`,
                    'error'
                )
            });
        // setloading(false)
    }
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const userdata = {
                    profileImage : user?.photoURL,
                    username : user?.displayName,
                    useremail: user?.email
                }
                setCurrentUser(userdata)
                setloading(false)
                axiosecure.post('/jwt', userdata)
                    .then((res) => {
                        console.log(res.data)
                    })
            } else {
                setloading(false)
                setCurrentUser(null)
            }
        });
        return () => {
            return unsubscribe();
        }
    }, [])
    const logout = () => {
        signOut(auth).then(() => {
            setCurrentUser(null)
        }).catch((error) => {
            // An error happened.
        });
    }
    const contextData = {
        createNewUser,
        loginuser,
        loginwithGoogle,
        currentUser,
        logout,loading
    }
    return (
        <YourTaskData.Provider value={contextData}>
            {children}
        </YourTaskData.Provider>
    )
}

export default YourTaskContext
