import React from 'react';
import Header from '../Header/Header';
import { withRouter } from 'react-router';
import './contact.css'

class Contact extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            subject: '',
            body: '',
            formMessage: ''
        }

        this.emailRef = React.createRef();
        this.subjectRef = React.createRef();
        this.bodyRef = React.createRef();
    }

    onEmailChange = (event) => {
        this.setState({email: event.target.value})
    }

    onSubjectChange =(event) => {
        this.setState({subject: event.target.value})
    }

    onBodyChange = (event) => {
        this.setState({body: event.target.value})
    }

    validateInputField = (label, className, event) => {
        if (event.value === ''){
            event.className = `${className}-invalid`
            event.previousSibling.className = 'contact-label-invalid'
            event.previousSibling.textContent = `${label} *This field cannot be left blank`
            return false;
        }
        
        if(event.id === 'contact-email-input' && !this.validateEmail(event.value)){
            event.className = `${className}-invalid`
            event.previousSibling.className = 'contact-label-invalid'
            event.previousSibling.textContent = `${label} *Please enter a valid email address`
            return false;
        }

        event.className = 'contact-input'
        event.previousSibling.className =  'contact-label'
        event.previousSibling.textContent = label
        return true;
    }
    
    validateEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email.toLowerCase());
    }


    submitResponse = () => {

        const fieldsIsValid = this.checkAllFields()

        const { email, subject, body } = this.state
        if (fieldsIsValid){
            fetch('http://localhost:3000/postcontactresponse', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                    email,
                    subject,
                    body
                 })
            }).then(res => {
                console.log(res)
                if(res.status === 200){
                    this.clearFields()
                    this.setState({formMessage: 'Your message was successfully sent!'})
                } else {
                    this.setState({formMessage: 'an error has occoured please try again'})
                }
            })
        }
    }

    checkAllFields = () =>{
        
        const subjectIsValid = this.validateInputField('Subject', 'contact-input', this.subjectRef.current)
        const bodyIsValid = this.validateInputField('Message', 'contact-textarea', this.bodyRef.current)
        let emailIsValid = true

        if(!this.props.isSignedIn){
            emailIsValid = this.validateInputField('Email', 'contact-input', this.emailRef.current)
        }

        if(subjectIsValid && bodyIsValid && emailIsValid){
            return true
        } else {
            return false
        }
    }

    clearFields = () => {
        if(!this.props.isSignedIn){
            this.emailRef.current.value = ''
        }
        this.subjectRef.current.value = ''
        this.bodyRef.current.value = ''
    }

    componentDidMount(){
        if(this.props.isSignedIn){
            this.setState({email: this.props.username+'@trinityschools.nz'})
        }
    }

    componentWillMount(){
        console.log('loading')
    }

    render() {
        return(
        <React.Fragment>
            <Header isSignedIn={this.props.isSignedIn} signOut={this.props.signOut}/>
            <div className='contact-wrapper'>
                <h1>Contact Us</h1>
                <div className='contact-form'>
                    {!this.props.isSignedIn?
                    <React.Fragment>
                        <label className='contact-label' htmlFor="contact-email-input">Email</label>
                        <input onBlur={(event) => this.validateInputField('Email', 'contact-input', event.target)} onChange={this.onEmailChange} ref={this.emailRef} className='contact-input' type="text" id="contact-email-input" name="username-input"/>
                    </React.Fragment>:
                    <React.Fragment></React.Fragment>
                    }
                    <label className='contact-label' htmlFor="subject-input">Subject</label>
                    <input onBlur={(event) => this.validateInputField('Subject', 'contact-input', event.target)} onChange={this.onSubjectChange} ref={this.subjectRef} className='contact-input' type="text" id="subject-input" name="subject-input"/>
                    <label className='contact-label' htmlFor="body-input">Message</label>
                    <textarea onBlur={(event) => this.validateInputField('Message', 'contact-textarea', event.target)} onChange={this.onBodyChange} ref={this.bodyRef} rows="5" className='contact-textarea' type="text" id="body-input" name="body-input"/>
                    <input onClick={this.submitResponse} className='contact-input' id='contact-submit-button' type='button' value='Submit'/>
                    <p>{this.state.formMessage}</p>
                </div>
            </div>
        </React.Fragment>
        )
    }
}

export default withRouter(Contact)