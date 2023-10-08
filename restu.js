const myForm = document.querySelector('#my-form');
const userList1 = document.querySelector('#users1');
const userList2 = document.querySelector('#users2');


async function displayOnScreen(){
    try{
        const res=await axios
        .get('https://crudcrud.com/api/cd4129ef77e34b09808232387b496214/practice');
        console.log(res);
        userList1.innerHTML='';
        userList2.innerHTML='';
        
        
        res.data.forEach((item) => {
            const li = document.createElement("li");
            li.appendChild(document.createTextNode(`Order Price: ${item.price}, Description: ${item.dish}, Table:${item.table}`));


            var delbtn = document.createElement('button');
            delbtn.className = 'btn btn-outline-danger btn-sm';
            delbtn.appendChild(document.createTextNode("Delete"));
            li.appendChild(delbtn);
            // userList.appendChild(li);
            li.dataset.id = item._id;
            delbtn.addEventListener('click', () => del(item._id, li));



            if(item.table=='Table1')
            {
                userList1.appendChild(li);  

            }else {
                userList2.appendChild(li);  

            }

        });
    } catch(err){
        console.log(err);
    }
}
myForm.addEventListener('submit', onSubmit);

async function onSubmit(e){
    e.preventDefault();

    const price = e.target.price.value;
    const dish = e.target.dish.value;
    const table = e.target.table.value;

    
    let data={
        price,
        dish,
        table
    }
    console.log(data)
    e.target.price.value='';
    e.target.dish.value='';
    e.target.table.value='';

    try {
        const res = await axios
        .post(`https://crudcrud.com/api/cd4129ef77e34b09808232387b496214/practice`,data);
        id = res.data._id;
        console.log(res);
        displayOnScreen();
    } catch (err) {
        document.body.innerHTML=document.body.innerHTML+ "<h4>'Something went wrong'</h4>";
        console.log(err);
    }
}
async function del(id,li){
    li.remove();
    
    try {
        const response = await axios
        .delete(`https://crudcrud.com/api/cd4129ef77e34b09808232387b496214/practice/${id}`);
        console.log(response);
    } catch (err) {
        console.log(err);
    }
}

displayOnScreen();

