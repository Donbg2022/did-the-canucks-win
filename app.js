//api fetch to get game boxscore 
  let nucksGoals = 0
  let other = 0
  const mainImg = document.querySelector('#mainimg')
  const winOrLossText = document.querySelector('#weWL')


  //function to determine the winner of most previous game





const gameIdLocater = axios.get('https://statsapi.web.nhl.com/api/v1/teams/23?expand=team.schedule.previous')
.then((res) =>{
  //getting the game id and using a template literal to insert into a new api get request which will get the last game played 
  let id = res.data.teams[0].previousGameSchedule.dates[0].games[0].gamePk
  let nhlGameId = `https://statsapi.web.nhl.com/api/v1/game/${id}/boxscore`;
  const nhlStats = axios.get(nhlGameId)
  .then(({data})=> {
    console.log(data)
    if (data.teams.away.team.name === 'Vancouver Canucks' && data.teams.home.teamStats.teamSkaterStats.goals < data.teams.away.teamStats.teamSkaterStats.goals){
      let other = data.teams.home.team.name
      winOrLossText.innerText = `We beat the ${other} `
      console.log('winnners')
      //make this a happy photo
      // mainImg.src = 'lumberjack.png'
    }else if (data.teams.home.team.name === 'Vancouver Canucks' && data.teams.away.teamStats.teamSkaterStats.goals < data.teams.home.teamStats.teamSkaterStats.goals){
      let other = data.teams.away.team.name
      winOrLossText.innerText = `We beat the ${other} `
      console.log('winnners')
      //make this a happy photo
      // mainImg.src = 'lumberjack.png'
    }
    else if (data.teams.away.team.name === 'Vancouver Canucks' && data.teams.home.teamStats.teamSkaterStats.goals > data.teams.away.teamStats.teamSkaterStats.goals){
      let other = data.teams.home.team.name
      winOrLossText.innerText = `We lost to the ${other}`
      console.log('losers')
      //change image here
     }
     else if (data.teams.home.team.name === 'Vancouver Canucks' && data.teams.away.teamStats.teamSkaterStats.goals > data.teams.home.teamStats.teamSkaterStats.goals) {
      let other = data.teams.away.team.name
      winOrLossText.innerText = `We lost to the ${other}`
      console.log('losers')
      //change image here
     }

  })})

const roster = axios.get('https://statsapi.web.nhl.com/api/v1/teams/23/roster')


//adding reacctivity to the navbar
const burger = document.querySelector('#burger')

let click = 1
//add event listener to make a drop down menu of options
burger.addEventListener('click', function(){
  //adds 1 to click variable and uses if statement to open and close the links 
  click++
  if (click % 2 !== 0){
    return document.querySelector('#reactivelinks').style.display = 'none'
  }else{
    return document.querySelector('#reactivelinks').style.display = 'block'
  }

})

const btn = document.querySelector('#winorlosebtn');
const record = document.querySelector('#record')
btn.addEventListener('click', function(){
  mainImg.style.display = 'block'
  btn.style.display = 'none'
  record.style.display = 'block'
  winOrLossText.style.display = 'block'
})