var subbtn=document.getElementById("subbtn");
var inputName=document.getElementById("inputName");
var inputUrl=document.getElementById("inputUrl");
var tbody=document.getElementById("tbody");
var deletebtn=document.getElementById("delete");
var visitbtn=document.getElementById("visit")
var overlay=document.querySelector(".overlay")
var closebtn=document.querySelector(".close-icon")

var bookmark=[];
subbtn.addEventListener("click",add)
if(localStorage.getItem("bookmark") !=null){
    bookmark=JSON.parse(localStorage.getItem("bookmark"))
    display();
}
function add(){
    if(valid() && validurl()){
        var book={
            name:inputName.value,
            url:inputUrl.value,
        }
        bookmark.push(book)
        localStorage.setItem("bookmark",JSON.stringify(bookmark))
        display()
        inputName.value="";
        inputUrl.value="";
    }
    else{
        inputName.style.color="red"
        inputUrl.style.color="red"
        inputName.style.borderColor="red"
        inputName.style.borderWidth="2px"
        inputUrl.style.borderColor="red"
        inputUrl.style.borderWidth="2px"
        overlay.classList.add("appear")
        
    }
}
function clear(){
    inputName.value=""
    inputUrl.value=""
}
function display(){
    var box=``
    for(var i=0;i<bookmark.length;i++){
        box+=`
        <tr>
        <th>${i+1}</th>
        <th>${bookmark[i].name}</th>
        <th><button type="button" class="btn btn-success" id="visit" onclick="visititem(${i})">
        <i class=" fa-solid fa-eye"></i>
        visit</button></th>
        <th><button type="button" class=" btn btn-danger " id="delete" onclick="deleteitem(${i})">
        <i class="fa-solid fa-trash-can"</i>
        Delete</button></th>
        `
    }
    tbody.innerHTML=box;
}
function deleteitem(index){
    bookmark.splice(index,1)
    localStorage.setItem("bookmark",JSON.stringify(bookmark));
    display()
    clear()
}
function visititem(index){
    window.open(bookmark[index].url)
}
function valid(){
    var nameregex= /^[\d\w\s;\:\(\)]+$/;
    var testing=nameregex.test(inputName.value)
    if (testing===true) {
        inputName.style.color="green"
        inputName.style.borderColor="green"
        inputName.style.borderWidth="2px"
        return true
        
    }
    else{
        return false
    }
}
function  validurl(){
    var urlregex=/^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/
    var test=urlregex.test(inputUrl.value)
    if(test===true){
        inputUrl.style.color="green"
        inputUrl.style.borderColor="green"
        inputUrl.style.borderWidth="2px"
        return true
        
    }
    else{
        return false
    }
}
function checking(){
    overlay.classList.remove("appear")
    overlay.classList.add("clear")
}
subbtn.addEventListener("click",valid)
subbtn.addEventListener("click",validurl)
closebtn.addEventListener("click",checking)