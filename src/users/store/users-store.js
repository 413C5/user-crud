import { loadUsersByPage } from '../use-cases/load-users-by-page';

//Punto inicial. No se exporta para que nadie lo manipule
const state = {
    currentPage: 0,
    users: [],
}

const loadNextPage = async () => {
    const users = await loadUsersByPage(state.currentPage + 1);

    //Si la longitud es 0 no hay pagina correspondiente
    if (users.length === 0) {
        return;
    }

    state.currentPage += 1;
    state.users = users;
    //console.log(state);
}

const loadPreviousPage = async () => {
    if (state.currentPage === 1) { //Se pone 1 porque no hay pagina 0
        return;
    }

    const users = await loadUsersByPage(state.currentPage - 1);
    state.users = users;
    state.currentPage -= 1;


}

/**
 * 
 * @param {User} updatedUser
 */
const onUserChanged = (updatedUser) => {
    let wasFound = false;
    //Actualizar el objeto de user
    state.users = state.users.map(user => {
        if (user.id === updatedUser.id) {
            wasFound = true;
            return updatedUser;
        }
        return user;
    });

    //Puede ser que no exista el usuario , se hayan borrado todos o se tengan menos de 10
    //se hace una inserción
    //Se usa cuando se graba o se actualiza un usuario , para poder insertar
    if (state.users.length < 10 && !wasFound) {
        state.users.push(updatedUser);
    }
}

const reloadPage = async () => {
    const users = await loadUsersByPage(state.currentPage);
    if (users.length === 0 && state.currentPage !==1) { //Si se elimina el último elemento de la página
        await loadPreviousPage();
        return;
    }

    state.users = users;
}

export default {
    loadNextPage,
    loadPreviousPage,
    onUserChanged,
    reloadPage,
    /**
     * 
     * @returns {User[]}
     */
    getUsers: () => [...state.users],
    /**
     * 
     * @returns {Number}
     */
    getCurrentPage: () => state.currentPage,
};