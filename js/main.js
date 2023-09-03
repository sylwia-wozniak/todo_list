document.addEventListener("DOMContentLoaded", function () {
    const noteContainer = document.querySelector('.js-note-container');
    const addTask = document.querySelector('.js-button');
    const inputContainer = document.getElementById('js-task');
    const options = {
        check: 'note--checked',
        color: 'note--color',
        close: 'note--close'
    };

    if (addTask) {
        addTask.addEventListener('click', () => note('createNote'));
    }

    if (inputContainer) {
        bindCheckInput();
    }

    function note(create) {
        const taskContainer = document.querySelector('.task__container');
        const taskContainerClasses = taskContainer.classList;

        if (inputContainer.value.length > 0 && inputContainer.value.length < 70) {
            taskContainerClasses.remove('task__container--empty');
            taskContainerClasses.remove('task__container--full');
            if (create === 'createNote') {
                createNote();
            }
        } else if (inputContainer.value.length >= 70) {
            taskContainerClasses.add('task__container--full');
        } else {
            taskContainerClasses.add('task__container--empty');
        }
    }

    function createNote() {
        const noteTemplateHtml = document.getElementById('js-note-template').innerHTML;
        const newNote = document.createElement('div');
        newNote.classList.add('note');
        newNote.innerHTML = noteTemplateHtml;
        const noteTextContainer = newNote.querySelector('#js-note-text');
        noteTextContainer.innerText = inputContainer.value;

        const checkButton = newNote.querySelector('.js-check');
        const starButton = newNote.querySelector('.js-star');
        const closeButton = newNote.querySelector('.js-close');

        newNote.appendChild(checkButton);
        newNote.appendChild(starButton);
        newNote.appendChild(closeButton);
        noteContainer.appendChild(newNote);

        checkButton.addEventListener('click', check);
        starButton.addEventListener('click', color);
        closeButton.addEventListener('click', close);

        inputContainer.value = "";
    }

    function bindCheckInput() {
        inputContainer.addEventListener('keyup', function (e) {
            if (e.key === 'Enter') {
                note('createNote');
            } else {
                note();
            }
        });
    }

    function mark(note, type) {
        const className = options[type];
        const noteClasses = note.classList;
        if (noteClasses.contains(className)) {
            noteClasses.remove(className);
        } else {
            noteClasses.add(className);
        }
    }

    function check() {
        const note = this.parentNode;
        mark(note, 'check');
    }

    function color() {
        const note = this.parentNode;
        mark(note, 'color');
    }

    function close() {
        const note = this.parentNode;
        mark(note, 'close');
    }
});
