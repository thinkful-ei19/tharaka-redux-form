import React from 'react';
import {reduxForm, Field, SubmissionError} from 'redux-form';
import Input from './input';
import {required, nonEmpty, exactlyFive, isNumber} from '../validators';
export class ContactForm extends React.Component {
    onSubmit(values) {
        if(!values.issue) {
            values.issue = 'not-delivered';
        }
        return fetch('https://us-central1-delivery-form-api.cloudfunctions.net/api/report', {
            method: 'POST',
            body: JSON.stringify(values),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                if (!res.ok) {
                    if (
                        res.headers.has('content-type') &&
                        res.headers
                            .get('content-type')
                            .startsWith('application/json')
                    ) {
                        // It's a nice JSON error returned by us, so decode it
                        return res.json().then(err => Promise.reject(err));
                    }
                    // It's a less informative error returned by express
                    return Promise.reject({
                        code: res.status,
                        message: res.statusText
                    });
                }
                return;
            })
            .then(() => console.log('Submitted with values', values))
            .catch(err => {
                const {reason, message, location} = err;
                if (reason === 'ValidationError') {
                    // Convert ValidationErrors into SubmissionErrors for Redux Form
                    return Promise.reject(
                        new SubmissionError({
                            [location]: message
                        })
                    );
                }
                return Promise.reject(
                    new SubmissionError({
                        _error: 'Error submitting message'
                    })
                );
            });
    }
    render() {
        const errorMessage = (
            <div className="message-error">
                {this.props.error}
            </div>  
        )

        let successMessage
        if (this.props.submitSucceeded) {
            successMessage = (
                <div className="message message-success">
                    Message submitted successfully
                </div>
            );
        }
        return (
            <form
                onSubmit={this.props.handleSubmit(values =>
                    this.onSubmit(values)
                )}>
                {errorMessage}
                {successMessage}
                <div className="form-input">
    
                    <Field
                        name="trackingNumber"
                        type="text"
                        component={Input}
                        label="Tracking Number"
                        validate={[required, nonEmpty, exactlyFive, isNumber]}
                    />
                </div>
                <div className="form-input">

                    <Field name="issue" id="issue" component={Input} element="select" label="What is your issue?" value="wrong-item" >
                        <option value="not-delivered">My delivery hasn't arrived</option>
                        <option value="wrong-item">The wrong item was delivered</option>
                        <option value="missing-part">Part of my order was missing</option>
                        <option value="damaged">Some of my order arrived damaged</option>
                        <option value="other">Other (give details below)</option>
                    </Field>
                </div>
                
                <div className="form-input">
                    <Field
                        name="details"
                        component={Input}
                        label="Give more details"
                        validate={[required, nonEmpty]}
                    />
                </div>
                <button type="submit">submit</button>
            </form>
        );
    }
}
export default reduxForm({
    form: 'contact'
})(ContactForm);