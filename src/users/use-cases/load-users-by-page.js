import { localhostUserToModel } from "../mappers/localhost-user.mapper.js";
import { User } from "../models/User.js";


/**
 * 
 * @param {Number} page 
 * @returns {Promise<User[]>}
 
export const loadUsersByPage = async (page = 1) => {
    const url = `${import.meta.env.VITE_BASE_URL}/users?_page=${page}`;
    const res = await fetch(url);
    const { data, last } = await res.json(); //Destructura. Ultima version de json-server agrega cosas adicionales

    const users = data.map(localhostUserToModel); // lo mismo que data.map(userLike => localhostUserToModel(userLike));

    if (page > last) { //En el nuevo json-server agrega valores adicionales. Si se pone un page mayor devuelve siempre el ultimo.Con esto se evita
        return [];
    }

    return users;
};
*/

/**
 * 
 * @param {Number} page 
 * @returns { Promise<User[]> }
 */
export const loadUsersByPage = async (page = 1) => {

    const url = `${import.meta.env.VITE_BASE_URL}/users?_page=${page}`;
    const res = await fetch(url);
    const data = await res.json();

    const users = data.map(localhostUserToModel);

    return users;
}