let todoArray=[]
//add to do
const saveBtn=document.getElementsByClassName('save-todo')
const inputElement =document.getElementById('todo-item-descr')

inputElement.addEventListener('keyup',function(){
    if(inputElement.value.length==0){
        // console.log('input value if',inputElement.value)
        if(saveBtn[0].classList.contains('disabled')) return;
        saveBtn[0].classList.add('disabled')
        // inputElement.value=''
    }else{
        // if(saveBtn.classList)
        // console.log('input value else',inputElement.value)
    saveBtn[0].classList.remove('disabled');
    }
})
function updatedList(arrOfRows){
    document.getElementById('tbody').innerHTML=''
    //  console.log(document.getElementById('tbody').innerHTML,"kkk")
     arrOfRows.map((item,index)=>{
        const tableBodyElement=document.getElementById('tbody')
        const noOfRows=tableBodyElement.rows.length;
        const newRow=tableBodyElement.insertRow(noOfRows)
        const cell1=newRow.insertCell(0)
        const cell2=newRow.insertCell(1)
        const cell3=newRow.insertCell(2)
        const cell4=newRow.insertCell(3)
        cell4.className='d-flex gap-3'
        cell1.innerHTML=noOfRows+1
        const pElement=document.createElement('span')
        pElement.innerHTML=item.rowDescr
        pElement.className=item.style.textStyle
        cell2.appendChild(pElement)
        const itemsDescrInput=document.createElement('input')
        itemsDescrInput.value=item.rowDescr
        itemsDescrInput.className=item.style.inputBoxStyle   //"form-control d-none"
        itemsDescrInput.onchange=(e)=>{item.rowDescr=e.target.value}
        cell2.appendChild(itemsDescrInput)
        cell3.innerHTML=item.status   //"In Progress"
        const deleteBtnElement=document.createElement('button')
    deleteBtnElement.innerHTML='DELETE'
    deleteBtnElement.className='btn btn-danger px-4 col'
    const finishedBtnElement=document.createElement('button')
    finishedBtnElement.innerHTML=item.status=="In Progress"?'FINISHED':'UNDO'
    finishedBtnElement.className='btn btn-success px-4 col'
    const editBtnElement=document.createElement('button')
    editBtnElement.innerHTML='EDIT'
    editBtnElement.className='btn btn-warning px-4 col'
    cell4.appendChild(deleteBtnElement)
    cell4.appendChild(finishedBtnElement)
    cell4.appendChild(editBtnElement)
    inputElement.value=''
    saveBtn[0].classList.add('disabled')

    //DELETE todo onclick
    deleteBtnElement.onclick=()=>{deletefn(index)}
     //FINISHED todo onclick
     finishedBtnElement.onclick=()=>{finishedfn(item)}
     //EDIT todo onclick
     editBtnElement.onclick=()=>{editfn(item)}
     })
    
    
}
function saveBtnClick() {
    if(!inputElement.value){return;}
    else{
     todoArray.push({rowDescr:inputElement.value,status:"In Progress",style:{
        textStyle:'',
        inputBoxStyle:'form-control d-none'
     }}) 
     console.log('save list ',todoArray)
      updatedList(todoArray)   
}
}

//delete function
function deletefn(index){
    todoArray.splice(index,1)
     updatedList(todoArray)
}

//finished function
function finishedfn(item){
    item.status=="In Progress" ? item.status="Complete" : item.status="In Progress"
     updatedList(todoArray)
}

//edit function
function editfn(item){
    if(item.style.inputBoxStyle=='form-control d-none'){
       item.style.textStyle='d-none'
       item.style.inputBoxStyle='form-control d-block'
    }else{
       item.style.inputBoxStyle='form-control d-none'
       item.style.textStyle='d-block' 
    }
      updatedList(todoArray)
}

//get pending tasks
function pendingBtnClick(){
    pendingList= todoArray.filter((item)=>{return item.status=="In Progress"})
   updatedList(pendingList)
}
