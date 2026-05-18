import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";


const AuthContext = createContext(null);

function AuthProviderWrapper(props) {
    // Variables - Estado
    const [user, setUser] = useState(
        localStorage.getItem("currentUserEmail") ? { email: localStorage.getItem("currentUserEmail") } : null
    );


    // Funciones
    const signUp = (email, password) => {
        const users = JSON.parse(localStorage.getItem("users") || "[]"); // localStorage select

        if (users.find((u) => u.email === email)) {
            return { success: false, error: "Email already exists" };
        }

        const newUser = { email, password };
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users)); // localStorage insert
        localStorage.setItem("currentUserEmail", email);

        setUser({ email });
        return { success: true }
    }

    const login = (email, password) => {
        const users = JSON.parse(localStorage.getItem("users") || "[]");
        const user = users.find((u) => u.email === email && u.password === password);

        if (!user) {
            return { success: false, error: "Invalid email or password" }
        }

        localStorage.setItem("currentUserEmail", email);
        setUser({ email });
        return { success: true }

    }

    const logout = () => {
        localStorage.removeItem("currentUserEmail");
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ user, signUp, login, logout }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProviderWrapper };

// Forma de crear un HOOK propio 
export function useAuth() {
    const context = useContext(AuthContext);

    return context;
}