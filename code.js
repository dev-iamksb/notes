const NewNote = document.querySelector("#header #add-note");
const MainArea = document.querySelector("#main");
var NoteHTML = `<i class="fa-regular fa-trash-can"></i><input type="text" id="note-title" placeholder="Title here"><textarea id="note-content" placeholder="Add Notes here"></textarea>`;
function localupdate() {
  var NoteDataTitle = MainArea.querySelectorAll("#note-title");
  var NoteDataContent = MainArea.querySelectorAll("#note-content");
  var TitleDataAR = [];
  var ContentDataAR = [];
  NoteDataTitle.forEach(function (item) {
    TitleDataAR.push(item.value);
  });
  NoteDataContent.forEach(function (item) {
    ContentDataAR.push(item.value);
  });
  localStorage.setItem("Notes Title", JSON.stringify(TitleDataAR));
  localStorage.setItem("Notes Content", JSON.stringify(ContentDataAR));
  
}
function AddingNote() {
  const note = document.createElement("div");
  note.classList = "note";
  MainArea.appendChild(note);
  note.insertAdjacentHTML("afterbegin", NoteHTML);
  function NoteExpand() {
    note.style.height = "30vh";
  }
  function NoteContract() {
    note.style.height = "6vh";
  }
  const NoteTitle = note.querySelector("#note-title");
  const NoteContent = note.querySelector("#note-content");
  NoteTitle.addEventListener("focus", NoteExpand);
  NoteTitle.addEventListener("focusout", NoteContract);
  NoteContent.addEventListener("focus", NoteExpand);
  NoteContent.addEventListener("focusout", NoteContract);
  note.querySelector(".fa-trash-can").addEventListener("click", function () {
    note.remove();
    localupdate();
  });
  
  setInterval(() => {
    localupdate();
  }, 100);
}
function GetLocalData() {
  var GetTitle = [];
  var GetContent = [];
  var GetBgClr = [];
  var GetTxtClr = [];
  JSON.parse(localStorage.getItem("Notes Title")).forEach(function (name) {
    GetTitle.push(name);
  });
  JSON.parse(localStorage.getItem("Notes Content")).forEach(function (name) {
    GetContent.push(name);
  });
  for (let index = 0; index < GetTitle.length; index++) {
    console.log(GetTxtClr[index]);
    NoteHTML = `<i class="fa-regular fa-trash-can"></i><input type="text" id="note-title" placeholder="Title here" value='${GetTitle[index]}' style="color:${GetTxtClr[index]}"><textarea id="note-content" placeholder="Add Notes here" >${GetContent[index]}</textarea>`;
    AddingNote();
    console.log(index + 1 + " " + "Notes Fetched");
  }
}
if (localStorage.length > 0) {
  GetLocalData();
}
// NoteHTML = `<i class="fa-regular fa-trash-can"></i><input type="text" id="note-title" placeholder="Title here"><textarea id="note-content" placeholder="Add Notes here"></textarea>`;
NewNote.addEventListener("click", AddingNote);