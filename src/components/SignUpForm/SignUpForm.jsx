import { Component } from 'react';
import { signUp } from '../../utilities/users-service'
export default class SignUpForm extends Component {
    state = {
        name: '',
        email: '',
        password: '',
        confirm: '',
        error: ''
    };
    //how to define class based component handler functions
    handleChange = (evt) => {
        this.setState({
            //watch again -> how to handle input and events
            //computed property syntax -> so we don't have to check what has been modified
            [evt.target.name]: evt.target.value,
            error: ''
        });
    };
    handleSubmit = async (evt) => {
        // prevent from being sent to the server
        evt.preventDefault();
        try {
            //most modern approach
            const {name, email, password} = this.state;
            const formData = {name, email, password}
            //another way: create copy then delete unwanted properties
            // const formData = {...this.state};
            // delete formData.error;
            // delete formData.confirm;
            //The promise returned by the signUp service
            // method will resolve to the user object included
            // in the payload of the JSON Web Token (JWT)(Pronounced JOT)
            const user = await signUp(formData);
            //get user data to set user on sign up
            //use setUser function passed in from authpage passed in from app to set
            this.props.setUser(user);

        } catch {
            //an error occurred
            //probably due to a duplicate email
            this.setState({error: 'Sign up Failed - Try Again'});
        }
    };

    

    render() {
        // using disable as validation to enable and disable sign up form
        const disable = this.state.password !== this.state.confirm;
        return (
          <div>
            <div className="form-container">
              <form autoComplete="off" onSubmit={this.handleSubmit}>
                <label>Name</label>
                <input type="text" name="name" value={this.state.name} onChange={this.handleChange} required />
                <label>Email</label>
                <input type="email" name="email" value={this.state.email} onChange={this.handleChange} required />
                <label>Password</label>
                <input type="password" name="password" value={this.state.password} onChange={this.handleChange} required />
                <label>Confirm</label>
                <input type="password" name="confirm" value={this.state.confirm} onChange={this.handleChange} required />
                <button type="submit" disabled={disable}>SIGN UP</button>
              </form>
            </div>
            <p className="error-message">&nbsp;{this.state.error}</p>
          </div>
        );
      }
}