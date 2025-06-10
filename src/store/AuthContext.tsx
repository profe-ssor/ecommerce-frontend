// import React, {
//   createContext,
//   useContext,
//   useReducer,
//   useEffect,
//   ReactNode,
// } from 'react';
// import { authService } from '../services/authServices';
// import type {
//   AuthContextType,
//   AuthResponse,
//   AuthState,
//   LoginCredentials,
//   RegisterData,
// } from '../types/auth';

// const initialState: AuthState = {
//   user: null,
//   token: null,
//   isAuthenticated: false,
//   loading: false,
//   error: null,
// };

// type Action =
//   | { type: 'LOGIN_SUCCESS'; payload: AuthResponse }
//   | { type: 'REGISTER_SUCCESS' }
//   | { type: 'AUTH_ERROR'; payload: any }
//   | { type: 'LOGOUT' }
//   | { type: 'SET_LOADING'; payload: boolean }
//   | { type: 'CLEAR_ERROR' };

// function authReducer(state: AuthState, action: Action): AuthState {
//   switch (action.type) {
//     case 'LOGIN_SUCCESS':
//       return {
//         ...state,
//         user: action.payload.user,
//         token: action.payload.access,
//         isAuthenticated: true,
//         loading: false,
//         error: null,
//       };
//     case 'REGISTER_SUCCESS':
//       return {
//         ...state,
//         loading: false,
//         error: null,
//       };
//     case 'AUTH_ERROR':
//       return {
//         ...state,
//         error: action.payload,
//         loading: false,
//       };
//     case 'LOGOUT':
//       return initialState;
//     case 'SET_LOADING':
//       return { ...state, loading: action.payload };
//     case 'CLEAR_ERROR':
//       return { ...state, error: null };
//     default:
//       return state;
//   }
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const [state, dispatch] = useReducer(authReducer, initialState);

//   useEffect(() => {
//     const storedToken = localStorage.getItem('token');
//     const storedUser = localStorage.getItem('user');
//     if (storedToken && storedUser) {
//       dispatch({
//         type: 'LOGIN_SUCCESS',
//         payload: {
//           access: storedToken,
//           user: JSON.parse(storedUser),
//         },
//       });
//     }
//   }, []);

//   const login = async (credentials: LoginCredentials) => {
//     dispatch({ type: 'SET_LOADING', payload: true });
//     try {
//       const res = await authService.login(credentials);
//       localStorage.setItem('token', res.access);
//       localStorage.setItem('user', JSON.stringify(res.user));
//       dispatch({ type: 'LOGIN_SUCCESS', payload: res });
//       return { success: true, data: res };
//     } catch (error: any) {
//       dispatch({ type: 'AUTH_ERROR', payload: error });
//       return { success: false, error };
//     }
//   };

//   const register = async (data: RegisterData) => {
//     dispatch({ type: 'SET_LOADING', payload: true });
//     try {
//       await authService.register(data);
//       dispatch({ type: 'REGISTER_SUCCESS' });
//       return { success: true };
//     } catch (error: any) {
//       dispatch({ type: 'AUTH_ERROR', payload: error });
//       return { success: false, error };
//     }
//   };

//   const logout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     dispatch({ type: 'LOGOUT' });
//   };

//   const clearError = () => {
//     dispatch({ type: 'CLEAR_ERROR' });
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         ...state,
//         login,
//         register,
//         logout,
//         clearError,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = (): AuthContextType => {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };
