import React from 'react';
import StackedBarChart from '../StackedBarChart/StackedBarChart';
import PieChart from '../PieChart/PieChart';
import NceaDetailsButton from '../NceaDetailsButton/NceaDetailsButton';


class NceaOverview extends React.Component {

    constructor(props) {
        super(props);
        console.log(props)
        this.state = {
            CreditCount:[
                         this.props.userNCEAProfile.excellencecredits,
                         this.props.userNCEAProfile.meritcredits,
                         this.props.userNCEAProfile.achievedcredits,
                         this.props.userNCEAProfile.notachievedcredits
                        ],
            CreditCountGoal:
                        [
                        this.props.userNCEAProfile.excellencecreditsgoal,
                        this.props.userNCEAProfile.meritcreditsgoal,
                        this.props.userNCEAProfile.achievedcreditsgoal,
                        0
                        ],
            lastSubAssBGColour: '',
            activeGraph: 'totalCredits'
            }
    }

    UpdateActiveGraph(newGraph) {
        this.setState({activeGraph: newGraph})
    }

    InitStackedBarGraphData(state){
        const data = {
            labels: ['Excellence Credits', 'Merit Credits', 'Achieved Credits', 'Not Achieved Credits'],
            datasets: [
                {
                    label: 'Submitted Credits',
                    data: state.CreditCount,
                    backgroundColor: 'rgba(255, 99, 132, 1)'
    
                },
                {
                    label: 'Credits Goal',
                    data: state.CreditCountGoal,
                    backgroundColor: 'rgba(54, 162, 235, 0.5)'
                }
            ]
        }
        return data
    }

    InitPieGraphData(state){
        const data = {
            labels: ['Excellence Credits', 'Merit Credits', 'Achieved Credits', 'Not Achieved Credits'],
            datasets: [
                {
                    label: 'Submitted Credits',
                    data: state.CreditCount,
                    backgroundColor: ['rgba(255, 204, 51, 1)',
                                      'rgba(2, 117, 216, 1)',
                                      'rgba(0, 128, 0, 1)',
                                      'rgba(217, 83, 79, 1)'] 
                }
            ]
        }
        return data
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
        const { userNCEAProfile } = this.props;
        return(
                <div className='ncea-overview-wrapper'>
                    <h1 className='ncea-overview-heading'>NCEA Overview</h1>
                    <p>{userNCEAProfile.nsn}</p>
                    {this.state.activeGraph === 'creditGoals' ?<StackedBarChart graphClassName={this.state.activeGraph} data={this.InitStackedBarGraphData(this.state)}/>:
                     this.state.activeGraph === 'totalCredits' ?<PieChart graphClassName={this.state.activeGraph} data={this.InitPieGraphData(this.state)}/>:
                     <div></div>}
                    <div className='graph-controls'>
                         <button onClick={() => this.UpdateActiveGraph('creditGoals')} className='ncea-overview-button'>Credit Goals</button>
                         <button onClick={() => this.UpdateActiveGraph('totalCredits')} className='ncea-overview-button'>Total Credits</button>
                         <button onClick={() => this.UpdateActiveGraph('subjectCredits')} className='ncea-overview-button'>Subject Credits</button>
                    </div>
                    <div className='lastsubass' style={{background: this.state.lastSubAssBGColour}}>
                        <h3>Last Submitted Assesment: </h3>
                        <p>{userNCEAProfile.lastsubmittedassessment[0]} : {userNCEAProfile.lastsubmittedassessment[1]} | {userNCEAProfile.lastsubmittedassessment[2]}</p>
                    </div>
                    <div className='ncea-details-button-wrapper'>
                        <NceaDetailsButton OnNceaDetailsClick={this.OnNceaDetailsClick}/>
                    </div>
                </div>
            )
        }
        
}


export default NceaOverview;