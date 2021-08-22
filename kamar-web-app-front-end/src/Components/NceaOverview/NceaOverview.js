import React from 'react';
import StackedBarChart from '../StackedBarChart/StackedBarChart';
import NceaOverviewButton from '../NceaOverviewButton/NceaOverciewButton';


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
            lastSubAssBGColour: ''
            }
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

    componentDidMount() {
        this.SetLastSubmittedAssessmentBackgroundColor();
    }

    render(){
        console.log('ncea overview state', this.state);
        const {userNCEAProfile } = this.props;
        return(
                <div className='ncea-overview-wrapper'>
                    <h1 className='ncea-overview-heading'>NCEA Overview</h1>
                    <p>{userNCEAProfile.nsn}</p>
                    <StackedBarChart data={this.InitStackedBarGraphData(this.state)}/>
                    <div className='controls'>
                        <NceaOverviewButton text={'Credit Goals'}/><br/>
                        <NceaOverviewButton text={'Total Credits'}/><br/>
                        <NceaOverviewButton text={'Subject Credits'}/><br/>
                    </div>
                    <div className='lastsubass' style={{background: this.state.lastSubAssBGColour}}>
                        <h3>Last Submitted Assesment: </h3>
                        <p>{userNCEAProfile.lastsubmittedassessment[0]} : {userNCEAProfile.lastsubmittedassessment[1]} | {userNCEAProfile.lastsubmittedassessment[2]}</p>
                    </div>
                </div>
            )
        }
        
}


export default NceaOverview;