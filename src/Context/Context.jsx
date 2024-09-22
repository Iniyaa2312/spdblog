import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import { onAuthStateChanged } from "firebase/auth"; // Ensure this is imported
import { auth } from "../firebase/firebase"; // Adjust the import path as needed
import Loading from "../components/Loading/Loading";

const BlogContext = createContext();

const Context = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          if (user) {
            setCurrentUser(user);
          } else {
            setCurrentUser(null);
          }
          setLoading(false);
        });
    
        return () => unsubscribe();
      }, [currentUser]);


    return (
        <BlogContext.Provider value={{currentUser, setCurrentUser}}>
            {loading ? <Loading /> : children}
        </BlogContext.Provider>
    );
};

export default Context;

export const Blog = () => useContext(BlogContext);