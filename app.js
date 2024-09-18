const itemBox=document.querySelector('#item')
const toDoList=document.querySelector("#to-do-list")





itemBox.addEventListener('keyup',function(event){
if(event.key==='Enter'){
    addToBox(this.value)
    this.value=''
}
})
const addToBox=(item)=>{
    const listItem=document.createElement('li')
    listItem.innerHTML=` ${item} 
            <i class="fas fa-times"></i>
    `;
    listItem.addEventListener('click',function(){
         this.classList.toggle('done')
    })
    listItem.querySelector('i').addEventListener('click',function(){
        listItem.remove()
    })
    toDoList.appendChild(listItem)
}