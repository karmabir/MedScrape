import React from 'react';
import './medicine-form.style.css';
import axios from 'axios'
import qs from 'qs'


class AddForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }
    async handleSubmit(event) {
        event.preventDefault();
        await axios({
            method: 'post',
            url: 'http://localhost:8000/formsubmit/',
            data: qs.stringify(this.state),
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
            }
        })
    }


    render() {
        return (

            <div className="wrapper" id="app" >
                <div className="card-form">
                    <div className="card-list">
                        <div className="card-item">
                            <div className="card-item__cover">
                            </div>
                        </div>
                    </div>
                    <form onSubmit={this.handleSubmit} >
                        <div className="card-form__inner">
                            <div className="card-input">
                                <label for="MedicineName" class="card-input__label" >Medicine Name</label>
                                <input type="text" name="MedicineName" className="card-input__input" onChange={this.handleChange} />
                            </div>
                            <div class="card-input">
                                <label for="Introduction" class="card-input__label">Introduction</label>
                                <textarea className="card-input__input2" cols="30" rows="5" name="Introduction" onChange={this.handleChange} ></textarea>
                            </div>
                            <div class="card-input">
                                <label for="WhenToTake" class="card-input__label">WhenToTake</label>
                                <textarea className="card-input__input2" cols="30" rows="5" name="WhenToTake" onChange={this.handleChange} ></textarea>
                            </div>
                            <div class="card-input">
                                <label for="SideEffects" class="card-input__label">Side Effect</label>
                                <textarea className="card-input__input2" cols="30" rows="5" name="SideEffects" onChange={this.handleChange} ></textarea>
                            </div>
                            <input type="submit" value="Submit" className="card-form__button" />
                        </div>
                    </form>
                </div>
            </div>
        )
    }

}

export default AddForm;