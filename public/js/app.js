console.log('loaded')



const weatherForm = document.querySelector('form')

const temperatuerOutput = document.getElementById('temperature')
const locationOutput = document.getElementById('location')


weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()

    const data = document.getElementById('location')
    
    fetch('http://localhost:3000/weather?addres='+data.value).then((res)=>{
    res.json().then((data)=>{
        
        temperatuerOutput.innerHTML = data.temperature +'</br> location = '+data.location
        locationOutput.innerHTML = data.location

    })
})
})