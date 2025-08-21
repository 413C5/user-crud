import { showModal } from '../render-modal/render-modal';
import './render-add-button.css';

/**
 * 
 * @param {HTMLDivElement} element
 */
export const renderAddButton = (element) => { //Para botones reutilizables lo normal es pasarles un callback como argumento y darles un eventListener
    const fabButton = document.createElement('button');
    fabButton.innerText = '+';
    fabButton.classList.add('fab-button'); //similar que fabButton.className = 'fab.button'; Pero classname es mas moderno

    element.append(fabButton);

    fabButton.addEventListener('click', () => {
        /*
        if (!callback) {
            return;
        }
            */
        showModal();
    });
}