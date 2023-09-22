import { createContext, useState, useEffect, useContext } from "react";
import { supabase } from "../utils/supabase";
import { useRouter } from "next/router";

const Context = createContext();

const Provider = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState(supabase.auth.getUser());

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        // Check if the user is authenticated
        const { data: userResponse, error: userError } = await supabase.auth.getUser();
  
        if (userError) throw userError;
        
        const sessionUser = userResponse?.user;
        if (!sessionUser) throw new Error('User is not authenticated');
  
        const { data: profile, error: profileError } = await supabase
          .from("profile")
          .select("*")
          .eq("id", sessionUser.id)
          .single();
          
        if (profileError) throw profileError;
        
        setUser({
          ...sessionUser,
          ...profile,
        });
      } catch (error) {
        console.error("Error getting user profile: ", error);
      }
    };
  
    getUserProfile();
  
    const { data: subscription } = supabase
      .auth
      .onAuthStateChange(() => {
        getUserProfile();
      });
  
    return () => {
      if (subscription) subscription.unsubscribe();
    };
  }, []);
  
  
  const login = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "twitter",
    });
  };
  

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.push("/");
  };

  const exposed = {
    user,
    login,
    logout,
  };

  return <Context.Provider value={exposed}>{children}</Context.Provider>;
};

export const useUser = () => useContext(Context);

export default Provider;