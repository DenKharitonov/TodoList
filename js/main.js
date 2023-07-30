'use strict';

const todoList = [];
const todos = document.querySelector('.todos');
const inputField = document.querySelector('.content__form');
const palette = document.querySelectorAll('.colors__item');
const counter = document.querySelector('.content__todo-counter');


function colorSelection() {
  palette.forEach(item => {
    item.addEventListener('click', (e) => {
      palette.forEach(el => {
        el.classList.remove('colors__item--selected');
      });
      item.classList.add('colors__item--selected');
    })
  })
}

colorSelection();

function colorChoice() {
  const header = document.querySelector('.content__header');
  const content = document.querySelector('.content');
  const inputFocus = document.querySelector('.content__form');
    palette.forEach(function(item, i) {
      item.addEventListener('click', (e) => {
        if (i === 1) {
          header.style.color = '#ffb3b3';
          content.style.borderColor = '#ffb3b3';
          inputFocus.addEventListener('focusin', () => {
            inputFocus.style.borderColor = '#ffb3b3';
          });
          inputFocus.addEventListener('focusout', () => {
            inputFocus.style.borderColor = 'lightgrey';
          });
        } else if (i === 2) {
          header.style.color = '#94b8b8';
          content.style.borderColor = '#94b8b8';
          inputFocus.addEventListener('focusin', () => {
            inputFocus.style.borderColor = '#94b8b8';
          });
          inputFocus.addEventListener('focusout', () => {
            inputFocus.style.borderColor = 'lightgrey';
          });
        } else {
          header.style.color = '#b3b3ff';
          content.style.borderColor = '#b3b3ff';
          inputFocus.addEventListener('focusin', () => {
            inputFocus.style.borderColor = '#b3b3ff';
          });
          inputFocus.addEventListener('focusout', () => {
            inputFocus.style.borderColor = 'lightgrey';
          });
        }
      });
    });
}

colorChoice()

inputField.addEventListener('keypress', function(e) {
  if (e.keyCode !== 13) {
    return;
  } else {
    const value = inputField.value;
    const todo = {
      value,
    };
    todoList.push(todo);
    const li = document.createElement('li');
    li.classList.add('todos__item');

    const inputCheckbox = document.createElement('input');
    inputCheckbox.classList.add('todos__item-checkbox');
    inputCheckbox.setAttribute('type', 'checkbox');
    inputCheckbox.name = 'todoitem';
    inputCheckbox.addEventListener('click', () => {
      if (inputCheckbox.checked) {
        inputText.classList.add('todos__item--checked');
      } else {
        inputText.classList.remove('todos__item--checked');
      }
    } )

    const inputCheckboxLabel = document.createElement('label');
    inputCheckboxLabel.classList.add('todos__item-label');
    inputCheckboxLabel.setAttribute('for', 'todoitem');
     

    const inputText = document.createElement('input');
    inputText.classList.add('todos__item-text', 'content__form--text');
    inputText.setAttribute('readonly', 'readonly');
    inputText.setAttribute('type', 'text');
    inputText.addEventListener('keydown', function(e) {
      if (e.keyCode === 13) {
        inputText.setAttribute('readonly', 'readonly');
        inputText.blur();
      }
    })


    const buttonUp = document.createElement('button');
    buttonUp.classList.add('button', 'button--up');
    buttonUp.addEventListener('click', (e) => {
      let currentLi = e.target.parentNode;
      let prevLi = li.previousElementSibling;
      if (prevLi) {
        todos.insertBefore(currentLi, prevLi);
      }
    })

    const buttonDown = document.createElement('button');
    buttonDown.classList.add('button', 'button--down');
    buttonDown.addEventListener('click', (e) => {
      let currentLi = e.target.parentNode;
      let nextLi = li.nextElementSibling;
      if (nextLi) {
        todos.insertBefore(currentLi, nextLi.nextSibling);
      }
    })

    const buttonEdit = document.createElement('button');
    buttonEdit.classList.add('button', 'button--edit');
    buttonEdit.addEventListener('click', () => {
      inputText.removeAttribute('readonly', 'readonly');
      inputText.focus();
    })


    const buttonDelete = document.createElement('button');
    buttonDelete.classList.add('button', 'button--delete');
    buttonDelete.addEventListener('click', () => {
      li.remove();
      counter.innerText = `You have: ${todos.children.length} left`;
    });

    inputText.value = inputField.value;

    li.append(inputCheckbox, inputCheckboxLabel, inputText, buttonUp, buttonDown, buttonEdit, buttonDelete);

    inputField.value = '';

    counter.innerText = `You have: ${todos.children.length + 1} left`;

    let liAttr = Math.floor(Math.random() * 1000);
    li.setAttribute('id', liAttr);
    todos.append(li);
  }        
});   

