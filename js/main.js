(function(){
    var noteContainer = document.getElementsByClassName('js-note-container')[0];
    var addTask = document.getElementsByClassName('js-button')[0];
    var inputContainer = document.getElementById('js-task');
    var options = {
        check: 'note--checked',
        color: 'note--color',
        close: 'note--close'
    };

    if(addTask){
        addTask.addEventListener('click', function(){note('createNote')});
    }

    if(inputContainer){
        bindCheckInput()
    }

    function note(create){
        var taskContainer = document.getElementsByClassName('task__container')[0];
        var taskContainerClasses = taskContainer.classList;

        if(inputContainer.value.length>0 && inputContainer.value.length<70){
            taskContainerClasses.remove('task__container--empty');
            taskContainerClasses.remove('task__container--full');
            if(create ==='createNote'){
                createNote();
            }
        }else if(inputContainer.value.length>=70){
            taskContainerClasses.add('task__container--full');
        }else{
            taskContainerClasses.add('task__container--empty');
        }
    }

    function createNote(){
        var noteTemplateHtml = document.getElementById('js-note-template').innerHTML;
        var newNote = document.createElement('div');
        newNote.classList.add('note');
        newNote.innerHTML = noteTemplateHtml;
        var noteTextContainer = newNote.querySelector('#js-note-text');
        noteTextContainer.innerText = inputContainer.value;

        var checkButton = newNote.querySelector('.js-check');
        var starButton = newNote.querySelector('.js-star');
        var closeButton = newNote.querySelector('.js-close');

        checkButton = newNote.appendChild(checkButton);
        starButton = newNote.appendChild(starButton);
        closeButton = newNote.appendChild(closeButton);
        noteContainer.appendChild(newNote);

        checkButton.addEventListener('click', check);
        starButton.addEventListener('click', color);
        closeButton.addEventListener('click', close);

        inputContainer.value = "";
    }

    function bindCheckInput() {
        inputContainer.addEventListener('keyup',function(e){
            if(e.keyCode === 13){
                note('createNote');
            }else{
                note();
            }
        });
    }

    function mark(note,type) {
        var className = options[type];
        var noteClasses = note.classList;
        if (noteClasses.contains(className)){
            noteClasses.remove(className);
        }else{
            note.classList.add(className);
        }
    }

    function check(){
        var note = this.parentNode;
        mark(note,'check');
    }

    function color() {
        var note = this.parentNode;
        mark(note,'color');
    }

    function close() {
        var note = this.parentNode;
        mark(note,'close');
    }

})();

