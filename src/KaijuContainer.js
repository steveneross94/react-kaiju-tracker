//React
import React from 'react'
// Components
import KaijuCard from './KaijuCard'
import CreateKaijuForm from './CreateKaijuForm'
import TickerContainer from './TickerContainer'
//Fetch Requests
import * as requests from './requests'
// Read the README for how to fetch

class KaijuContainer extends React.Component {

  state = {
    kaijus: [],
    sightings: []
  }

componentDidMount(){
  requests.fetchKaijus()
  .then(data => this.setState({ kaijus: data }))
  requests.fetchSightings()
  .then(data => this.setState({ sightings: data }))
}

editKaiju = (kaijuObj) => {
  let kaijus = [...this.state.kaijus]
  const kaijuIdx = kaijus.findIndex((kaiju => kaiju.id === kaijuObj.id))
  kaijus[kaijuIdx] = kaijuObj
  this.setState({ kaijus })
}

  render() {
    console.log(this.state);
    return (
      <>

        <CreateKaijuForm />

        <div id='kaiju-container'>

          {this.state.kaijus.map(kaiju => {
            return (
              <KaijuCard 
              key={kaiju.id} 
              id={kaiju.id}
              name={kaiju.name}
              power={kaiju.power}
              image={kaiju.image}
              editKaiju={this.editKaiju}
              />  
            )}
          )}

        </div>


        {/* Just pass kaijus to TickerContainer and it'll create a news ticker at the bottom */}
        <TickerContainer kaijus={this.state.kaijus} />
        {/* You won't have to modify TickerContainer but it's a fun preview for some other react features */}

      </>
    )

  }
}

export default KaijuContainer

