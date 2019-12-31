


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const dataToAppend = document.querySelector('#res')




weatherForm.addEventListener('submit' , (e)=>{
    e.preventDefault()

    const location = search.value
    dataToAppend.innerHTML = "<p>Loading...</p>"
    dataToAppend.innerHTML = ""
    fetch('/weather?address='+encodeURIComponent(location)).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            dataToAppend.innerHTML = data.error
        }else{

            dataToAppend.innerHTML+='<h2><b>'+data.location+'</b></h2>'
            Object.entries(data.forecastData).map(([key, value])=>{
                dataToAppend.innerHTML+=`<p><b>${key}</b> : ${value}</p>`
            })
        }
        
    })
})


})