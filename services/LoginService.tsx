import { Register } from "../types/UserTypes";
import { getLogging, logOut, postRegister } from "./RequestService";

const USER_IP_API = "http://192.168.1.34";
const USER_PORT_API = ":8888";
const USER_API = "/users/";
const USER_REGISTER_API = "register";
const USER_LOGIN_API = "login";
const USER_LOGOUT = "logout";


export const postRegisteredUser = async (registeredUser: Register) => {
  try {
    const response = await postRegister(`${USER_IP_API}${USER_PORT_API}${USER_API}${USER_REGISTER_API}`, registeredUser);

    if (response.status === 201) {
      return response.json();
    } else {
      console.error("Error en la respuesta del servidor:", response);
      return null;
    }
  } catch (error) {
    console.error("Error al realizar la solicitud de registro:", error);
    return null;
  }
};

export const getLoginUser = async (loginUser: Register) => {
  try {
    const response = await getLogging(`${USER_IP_API}${USER_PORT_API}${USER_API}${USER_LOGIN_API}`, loginUser);

    if (response.status === 200) {
      return response.json();
    } else {
      console.error("Error en la respuesta del servidor:", response);
      return null;
    }
  } catch (error) {
    console.error("Error al realizar la solicitud de login:", error);
    return null;
  }
};

export const getlogOut = async ()=>{
    try {
        const response = await logOut(`${USER_IP_API}${USER_PORT_API}${USER_API}${USER_LOGOUT}`);
    
        if (response.status === 200) {
          return response.json();
        } else {
          console.error("Error en la respuesta del servidor:", response);
          return null;
        }
      } catch (error) {
        console.error("Error al realizar la solicitud de login:", error);
        return null;
      }
}



