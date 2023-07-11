import { $, $create } from '/js/util/dom.js';
import { GET, POST, PATCH, DELETE } from '/js/util/user.js';

const $modalBg = $('.modalBg');
$modalBg.attachShadow({ mode: 'open' });

const $noteList = $('.notes-list');
const $createInput = $('#create-input');
const $noteAdd = $('#create');
const $noteSave = $('#save');
const $noteDelete = $('#delete');

const patchData = {
  target: String,
  noteType: String,
};

let deleteData;

const getNotes = async () => {
  const datas = await GET('/api/notes');
  return datas;
};

const render = async () => {
  const createModal = (text) => {
    const $modalStyle = $create('style');
    $modalStyle.textContent = `
    .modal{
      width: 300px;
      height: 300px;
      background-color: #FAFAFA;
      display:flex;
      flex-direction:column;
      align-items:center;
      justify-content:center;
      gap:50px;
      padding: 20px;
      text-align:center;
    }
    .modal > button{
      width:100px;
      height:30px;
      background-color:#282828;
      color:white;
      cursor:pointer;
    }
    `;

    const $modal = $create('div', 'modal');
    const $modalText = $create('div');
    $modal.append($modalText);
    const $modalBtn = $create('button');
    $modalBtn.textContent = '확인';
    $modal.append($modalBtn);

    $modalText.textContent = text;
    $modalBg.classList.add('modalBg-on');
    $modalBg.shadowRoot.append($modalStyle, $modal);
    $modalBtn.focus();
    $modalBtn.addEventListener('click', () => {
      $modalBg.classList.remove('modalBg-on');
      $modalBg.shadowRoot.replaceChildren();
    });
  };

  const saveHandler = async () => {
    if(patchData.noteType){
      const filter = [...$noteList.children].filter((node) => node.value === patchData.noteType);
      if (filter.length >= 2) {
        createModal('중복되는 노트가 있습니다');
      } else {
        PATCH('/api/notes', patchData);
        [...$noteList.children].forEach((node) => {
          node.classList.remove('note-select');
          node.readOnly = true;
          node.defaultValue = node.value;
          $noteSave.style.display = 'none';
        });
      }
    } else {
      createModal('수정할 값을 입력해주세요');
    }
    
  };

  const noteListUpdate = async () => {
    // console.dir($noteList.children);
    const { notes } = await getNotes();
    // console.log(notes);
    const $notes = notes.map(({ type, _id }) => {
      const $note = $create('input', 'note', {
        type: 'text',
        value: type,
        note_id: _id,
        defaultValue: type,
        readonly: true,
      });
      $note.addEventListener('click', () => {
        if ($note.classList.contains('note-select')) {
          $note.classList.remove('note-select');
          $note.readOnly = true;
          $noteSave.style.display = '';
          patchData.target = String;
          patchData.noteType = String;
          deleteData = undefined;
        } else {
          [...$noteList.children].forEach((node) => {
            node.classList.remove('note-select');
            node.readOnly = true;
            node.value = node.defaultValue;
          });
          $note.classList.add('note-select');
          $note.readOnly = false;
          $note.focus();
          $noteSave.style.display = 'inline-block';
          patchData.target = $note.attributes.note_id.value;
          patchData.noteType = $note.value;
          deleteData = $note.attributes.note_id.value;
        }
      });

      $note.addEventListener('keyup', (e) => {
        patchData.target = $note.attributes.note_id.value;
        patchData.noteType = $note.value;
        if (e.keyCode === 13) {
          saveHandler();
        }
      });

      return $note;
    });
    $noteList.replaceChildren();
    $noteList.append(...$notes);
  };

  noteListUpdate();

  const createHandler = async () => {
    if ($createInput.value) {
      const filter = [...$noteList.children].filter((node) => node.value === $createInput.value);
      if (filter.length === 0) {
        const createData = { noteType: $createInput.value };
        await POST('/api/notes', createData);
        $createInput.value = '';
        await noteListUpdate();
      } else {
        createModal('중복되는 노트가 있습니다');
      }
    } else {
      createModal('입력값을 넣어주세요');
    }
  };

  $noteAdd.addEventListener('click', createHandler);
  $createInput.addEventListener('keyup', (e) => {
    if (e.keyCode === 13) {
      createHandler();
    }
  });

  $noteSave.addEventListener('click', saveHandler);

  $noteDelete.addEventListener('click', async () => {
    // console.log(deleteData);
    if (deleteData) {
      await DELETE(`/api/notes/${deleteData}`);
      noteListUpdate();
    } else {
      // alert('삭제할 노트를 선택하세요');
      createModal('삭제할 노트를 선택하세요');
    }
  });
};

render();
