import React from 'react';
import StackedBarChart from '../StackedBarChart/StackedBarChart';
import PieChart from '../PieChart/PieChart';

class NceaOverview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lastSubAssBGColour: '',
            activeGraph: 'currentYearTotalCredits',
            creditGoals: this.props.userNCEAProfile.creditGoals
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
                    label: 'Credit Goals',
                    data: creditGoals,
                    backgroundColor: 'rgba(54, 162, 235, 1)'
                },
                {
                    label: 'Submitted Credits',
                    data: submittedCredits,
                    backgroundColor: 'rgba(255, 99, 132, 1)'
    
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
    //get the sum of credits from the credits from users_nceaoverview table
    getCreditTotals = () => {
        const totalCredits = []
        for (let i = 0; i < this.props.userNCEAProfile.credits[0].length; i++) {
            const totalGradeCredits = this.props.userNCEAProfile.credits[0][i] + this.props.userNCEAProfile.credits[1][i] + this.props.userNCEAProfile.credits[2][i]
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
                throw new console.error('invalid grade');
        }
    }

    
    updateCreditGoals = (event, arrayPos) => {
        const creditGoalsClone = this.state.creditGoals.slice();
        creditGoalsClone[arrayPos] = event.target.value;
        this.setState({creditGoals: creditGoalsClone});
    }

    setBlankGoalInputToZero = (event, arrayPos) =>{
        if (event.target.value === ''){
            event.target.value = 0;
        }
        this.updateCreditGoals(event, arrayPos)
    }

    postCreditGoals = () => {
        fetch('http://localhost:3000/updateusercreditgoals', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                nsn: this.props.userNCEAProfile.nsn,
                creditGoals: this.state.creditGoals
            })
        })
        this.props.updateCreditGoals(this.state.creditGoals)
    }

    componentDidMount() {
        this.SetLastSubmittedAssessmentBackgroundColor();
    }

    componentWillUnmount(){
        this.postCreditGoals()
    }

    render() {
        const { lastsubmittedassessment } = this.props.userNCEAProfile; 
        const { activeGraph, creditGoals, lastSubAssBGColour } = this.state;
        return(
                <div className='ncea-overview-wrapper'>
                    <h1 className='ncea-overview-heading'>NCEA Overview</h1>
                    {activeGraph === 'creditGoals' ?
                    <div className='graph-wrapper credit-goals-wrapper'>
                        <form className = 'credit-goals-input'>
                            <h3>Please select your credit goals</h3>
                            <label className='credit-goal-input-field' htmlFor="excellence-credits-goal-input">Excellence Credits
                                <input onBlur={(event) => this.setBlankGoalInputToZero(event, 0)} onChange={(event) => this.updateCreditGoals(event, 0)} type="number" name="excellenceCreditsGoalsInput" id="excellence-credits-goal-input" value={creditGoals[0]} />
                            </label>
                            <label className='credit-goal-input-field' htmlFor="merit-credits-goal-input">Merit Credits
                                <input onBlur={(event) => this.setBlankGoalInputToZero(event, 1)} onChange={(event) => this.updateCreditGoals(event, 1)} type="number" name="meritCreditsGoalsInput" id="merit-credits-goal-input" value={creditGoals[1]}/>
                            </label>
                            <label className='credit-goal-input-field' htmlFor="achieved-credits-goal-input">Achieved Credits
                                <input onBlur={(event) => this.setBlankGoalInputToZero(event, 2)} onChange={(event) => this.updateCreditGoals(event, 2)} type="number" name="achievedCreditsGoalsInput" id="achieved-credits-goal-input" value={creditGoals[2]}/>
                            </label>
                            <input onClick={this.postCreditGoals} type='button' id='credit-goals-update-button' value='Update'/>
                        </form>
                        <StackedBarChart graphTitle='Credit Goals' graphClassName={activeGraph} data={this.InitStackedBarGraphData(this.props.userNCEAProfile.credits[0], creditGoals)}/>
                    </div>:
                     activeGraph === 'currentYearTotalCredits' ?
                     <div className='graph-wrapper'>
                        <PieChart graphTitle="This Year's Total Credits" graphClassName={activeGraph} data={this.InitPieGraphData(this.props.userNCEAProfile.credits[0])}/>
                     </div>:
                     activeGraph === 'totalCredits' ?
                     <div className='graph-wrapper'>
                        <PieChart graphTitle='Total Credits' graphClassName={activeGraph} data={this.InitPieGraphData(this.getCreditTotals())}/>
                     </div>:
                     <React.Fragment></React.Fragment>}
                    <div className='graph-controls'>
                         <button  onClick={() => this.UpdateActiveGraph('creditGoals')} className='ncea-overview-button'>Credit Goals</button>
                         <button  onClick={() => this.UpdateActiveGraph('currentYearTotalCredits')} className='ncea-overview-button'>Current Year Total Credits</button>
                         <button  onClick={() => this.UpdateActiveGraph('totalCredits')} className='ncea-overview-button'>Total Credits</button>
                    </div>
                    <div className='lastsubass' style={{background: lastSubAssBGColour}}>
                        <h3>Last Submitted Assesment: </h3>
                        <p>{lastsubmittedassessment[0]} : {lastsubmittedassessment[1]} | {lastsubmittedassessment[2]}</p>
                    </div>
                </div>
            )
        }
        
}


export default NceaOverview;