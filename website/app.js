/* Global Variables */
const urlAddress = 'http://api.openweathermap.org/data/2.5/weather?zip=';
// Personal API Key for OpenWeatherMap API
const apiKey = '&appid=bc2175d76504a51019e6637eea609afc';


// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click',action);


/* Function to GET Web API Data*/
const weatherInfo = async (urlAddress, zipCode, apiKey)=>{
	const res = await fetch(urlAddress+zipCode+apiKey)
	try{
		const data = await res.json();
		return data;
	}catch(err){
		console.log(err)
	}
}

/* Function called by event listener */
function action(e){
	const zipCode = document.getElementById('zip').value;
	const feelings = document.getElementById('feelings').value;

	let d = new Date();
	let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

	weatherInfo(urlAddress, zipCode, apiKey)
	.then(function(data){
		console.log(data);
		postData('/',{temperature: data.main.temp, date: newDate, content: feelings })
	})
	.then(function(){
        updateUI();
    });
};


const updateUI = async () => {
    const request = await fetch('/add');
    try {
        const NewData = await request.json();
        console.log(NewData);
        document.getElementById('date').innerHTML = `Date: `+ NewData.date;
        document.getElementById('temp').innerHTML = `Temperature: `+ NewData.temperature;
        document.getElementById('content').innerHTML = `Feelings: `+ NewData.content;
    } catch(err) {
        console.log(err);
    };
};


/* Function to POST data */
const postData = async ( url = '', data = {})=>{
    const response = await fetch(url, {
        method: 'POST', 
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },     
        body: JSON.stringify(data), 
    });
    try {
        const newData = await response.json();
        return newData;
    }catch(err){
        console.log(err);
    }
};