const  btn  = document.querySelector("#btn");
console.log(btn);
const input = document.querySelector("#inp")
console.log(input);
const list = document.querySelector('#list')
const date = document.querySelector('#date')
const time = document.querySelector('#time')

//when task complted the task must be removed
const updateTheTask = ()=>{
    
}








const setReminder = (taskDate, title) => {
    const currentTime = new Date();
    const timeUntilReminder = taskDate - currentTime - 1 * 60 * 1000; // 1 minute in milliseconds

  
    if (timeUntilReminder > 0) {
        setTimeout(() => {
            // Show browser notification if permission is granted
            if (Notification.permission === "granted") {
                new Notification(`Reminder: ${title}`, {
                    body: "It's time for your task!",
                    icon: "notification-icon.png" // Replace with the path to your notification icon
                });
            } else if (Notification.permission !== "denied") {
                // Request notification permission if not granted or denied
                Notification.requestPermission().then(permission => {
                    if (permission === "granted") {
                        console.log("Notification permission granted.");
                    }
                });
            }
               

            // Create the audio element
            const reminderAudio = document.createElement("audio");
            reminderAudio.id = "aud";
            reminderAudio.controls = true;
            reminderAudio.autoplay = true;

            // Create source element for the audio
            const audioSource = document.createElement("source");
            audioSource.src = "music.wav";
            audioSource.type = "audio/wav";

            // Append the source element to the audio element
            reminderAudio.appendChild(audioSource);

            const reminderModal = document.getElementById("reminderModal");
            const reminderTitle = document.getElementById('yourTask');
            reminderModal.style.display = "block";
            reminderTitle.textContent = title;

            // Append the audio element to the modal content
            reminderModal.querySelector(".modal-content").appendChild(reminderAudio);

            const closeModal = reminderModal.querySelector(".close");
            closeModal.onclick = () => {
                reminderModal.style.display = "none";
                // Pause and remove the audio element when modal is closed
                reminderAudio.pause();
                reminderAudio.remove();
            };
        }, timeUntilReminder);
    }
};





const reminder = (id) => {
    let datas;
    if (localStorage.getItem("datas") === null) {
        datas = [];
    } else {
        datas = JSON.parse(localStorage.getItem("datas"));
    }

    const task = datas.find((i) => i.id === +id);
    if (task) {
        const taskDate = new Date(task.date + ' ' + task.time);
        console.log('Task Date:', taskDate);
        console.log('Current Time:', new Date());

        setReminder(id, taskDate, task.title);
    }
};







//lets edit the data
const editData = (id) =>{
  //lets go the data
let datas;
if(localStorage.getItem("datas")===null)
{
    datas=[];
}
else{
    datas = JSON.parse(localStorage.getItem("datas"));
}
//let find the  the id and then update the data
const taskId = datas.findIndex((i)=>i.id===+id)

if(taskId!==-1)
{
  const newtitle =   prompt("Update the Data");
//   const date = prompt("Enter the Date");
//   const time = prompt("Enter the update time");

if(newtitle){
    //let update the array
    datas[taskId].title = newtitle;
    localStorage.setItem("datas",JSON.stringify(datas));
    getTask();
}
}
}
editData();

//let delete the id 

const deleteData = (id) =>{
let datas;

if(localStorage.getItem("datas") === null)
{
    datas=[];
}
else{
    datas = JSON.parse(localStorage.getItem("datas",datas));
}
 datas = datas.filter(i => {
    return i.id !== +id;
  });
 localStorage.setItem("datas",JSON.stringify(datas));
getTask();
}




//let Display the data

const getTask= () => {
let datas;
    if(localStorage.getItem("datas") === null)
    {
        datas = [];

    }
    else{
        //now let get the data 
        datas = JSON.parse(localStorage.getItem("datas"));
        

        }
        //let show it

        const alldatas = datas.map((i)=>{
            return `
            <li>
            <span>${i.title}</span>
            <span>${i.date} ${i.time}</span>
            
            <button onclick="editData('${i.id}')">X</button>
            <button onclick="deleteData('${i.id}')">Delete</button>
            <button onclick="reminder('${i.id}')">Reminder</button>
            
            <label for="html">completed</label><br>
  <input type="radio" id="comp" name="comp" value="comp">

<label for="html">Incomplete</label><br>
  <input type="radio" id="incomp" name="incomp" value="incomp">
            </li>
            `;
        })
        list.innerHTML = alldatas.join("");
    
    }
    getTask();



//lets getData from the input field
const getData = (e) => {
    e.preventDefault();

    if (input.value === '') {
        alert("Please enter a value");
        return;
    }

    const data = input.value;
    const selectedDate = date.value;
    const selectedTime = time.value;
    const taskDate = new Date(`${selectedDate}T${selectedTime}`);
    
    // Call the setReminder function when adding a task
    setReminder(taskDate, data);

    let datas;

    if (localStorage.getItem("datas") === '' || localStorage.getItem("datas") === null) {
        datas = [];
    } else {
        datas = JSON.parse(localStorage.getItem("datas"));
    }

    datas.unshift({
        id: Date.now(),
        title: data,
        date: selectedDate,
        time: selectedTime
    });

    localStorage.setItem("datas", JSON.stringify(datas));
    getTask();
};

btn.addEventListener('click', getData);