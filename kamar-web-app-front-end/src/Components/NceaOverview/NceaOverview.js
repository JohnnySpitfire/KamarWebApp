import React from 'react';
import StackedBarChart from '../StackedBarChart/StackedBarChart';
import PieChart from '../PieChart/PieChart';
import NceaDetailsButton from '../NceaDetailsButton/NceaDetailsButton';


class NceaOverview extends React.Component {

    constructor(props) {
        super(props);
        console.log(props)
        this.state = {
            level3Credits: this.props.userNCEAProfile.credits[0],
            level2Credits: this.props.userNCEAProfile.credits[1],
            level1Credits: this.props.userNCEAProfile.credits[2],
            creditGoals: this.props.userNCEAProfile.creditGoals,
            lastSubAssBGColour: '',
            activeGraph: 'currentYearTotalCredits'
            }
    }

    UpdateActiveGraph(newGraph) {
        this.setState({activeGraph: newGraph})
    }

    InitStackedBarGraphData(submittedCredits, creditGoals){
        const data = {
            labels: ['Excellence Credits', 'Merit Credits', 'Achieved Credits', 'Not Achieved Credits'],
            datasets: [
                {
                    label: 'Submitted Credits',
                    data: submittedCredits,
                    backgroundColor: 'rgba(255, 99, 132, 1)'
    
                },
                {
                    label: 'Credit Goals',
                    data: creditGoals,
                    backgroundColor: 'rgba(54, 162, 235, 0.5)'
                }
            ]
        }
        return data
    }

    InitPieGraphData(submittedCredits){

        const data = {
            labels: ['Excellence Credits', 'Merit Credits', 'Achieved Credits', 'Not Achieved Credits'],
            datasets: [
                {
                    label: 'Submitted Credits',
                    data: submittedCredits,
                    backgroundColor: ['rgba(255, 204, 51, 1)',
                                      'rgba(2, 117, 216, 1)',
                                      'rgba(0, 128, 0, 1)',
                                      'rgba(217, 83, 79, 1)'] 
                }
            ]
        }
        return data
    }

    getCreditTotals = () => {
        const {level3Credits, level2Credits, level1Credits} = this.state
        const totalCredits = []
        for (let i = 0; i < level3Credits.length; i++) {
            const totalGradeCredits = level3Credits[i] + level2Credits[i] + level1Credits[i]
            totalCredits.push(totalGradeCredits);
          }
        return totalCredits
    }

    SetLastSubmittedAssessmentBackgroundColor() {
        const grade = this.props.userNCEAProfile.lastsubmittedassessment[2]
        switch(grade){
            case 'E':
                this.setState({lastSubAssBGColour: '#FFCC33'})
                break
            case 'M':
                this.setState({lastSubAssBGColour: '#0275d8'})
                break
            case 'A':
                this.setState({lastSubAssBGColour: '#008000'})
                break
            case 'N':
                this.setState({lastSubAssBGColour: '#d9534f'})
                break
            default:
                this.setState({lastSubAssBGColour: 'Error'})
                break
        }
    }

    OnNceaDetailsClick = (history) => {
        fetch('http://localhost:3000/nceadetails', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              username: this.state.signInUsername,
              password: this.state.signInPassword
          })
        })
        .then(response => response.json())
        .then(user => {
            if (user[0].id){
              this.setState({ validUser: true});
              this.props.loadUser(user);
              history.push('NCEADetails');
            } else if (!user.id){
                this.setState({signInMessage: 'Incorrect Username/Password Combination'});
            }
        }).catch(err => console.log(err))
      }

    componentDidMount() {
        this.SetLastSubmittedAssessmentBackgroundColor();
    }

    render(){
        console.log('ncea overview state', this.state);
        const { lastsubmittedassessment } = this.props.userNCEAProfile;
        const { activeGraph, level3Credits, creditGoals, lastSubAssBGColour } = this.state;
        return(
                <div className='ncea-overview-wrapper'>
                    <h1 className='ncea-overview-heading'>NCEA Overview</h1>
                    {/* <p className='ncea-overview-nsn'>Your NSN is: {nsn}</p> */}
                    {activeGraph === 'creditGoals' ?<div className='graph-wrapper'>
                                                        <StackedBarChart graphTitle='Credit Goals' graphClassName={activeGraph} data={this.InitStackedBarGraphData(level3Credits, creditGoals)}/>
                                                        <div className = 'credit-goals-input'>
                                                            
                                                        </div>
                                                    </div>:
                     activeGraph === 'currentYearTotalCredits' ?<PieChart graphTitle="This Year's Total Credits" graphClassName={activeGraph} data={this.InitPieGraphData(level3Credits)}/>:
                     activeGraph === 'totalCredits' ?<PieChart graphTitle='Total Credits' graphClassName={activeGraph} data={this.InitPieGraphData(this.getCreditTotals())}/>:
                     <div></div>}
                    <div className='graph-controls'>
                         <button  onClick={() => this.UpdateActiveGraph('creditGoals')} className='ncea-overview-button'>Credit Goals</button>
                         <button  onClick={() => this.UpdateActiveGraph('currentYearTotalCredits')} className='ncea-overview-button'>Current Year Total Credits</button>
                         <button  onClick={() => this.UpdateActiveGraph('totalCredits')} className='ncea-overview-button'>Total Credits</button>
                         <button graphTitle='Subject Credits' onClick={() => this.UpdateActiveGraph('subjectCredits')} className='ncea-overview-button'>Subject Credits</button>
                    </div>
                    <div className='lastsubass' style={{background: lastSubAssBGColour}}>
                        <h3>Last Submitted Assesment: </h3>
                        <p>{lastsubmittedassessment[0]} : {lastsubmittedassessment[1]} | {lastsubmittedassessment[2]}</p>
                    </div>
                    <div className='ncea-details-button-wrapper'>
                        <NceaDetailsButton OnNceaDetailsClick={this.OnNceaDetailsClick}/>
                    </div>
                </div>
            )
        }
        
}


export default NceaOverview;