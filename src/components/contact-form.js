// import React from 'react';
// import {reduxForm, Field, SubmissionError, focus} from 'redux-form';
// import Input from './input';
// import {required, nonEmpty, email} from '../validators';

// export class ContactForm extends React.Component {
//     onSubmit(values) {
//         return fetch('/api/messages', {
//             method: 'POST',
//             body: JSON.stringify(values),
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         })
//             .then(res => {
//                 if (!res.ok) {
//                     if (
//                         res.headers.has('content-type') &&
//                         res.headers
//                             .get('content-type')
//                             .startsWith('application/json')
//                     ) {
//                         // It's a nice JSON error returned by us, so decode it
//                         return res.json().then(err => Promise.reject(err));
//                     }
//                     // It's a less informative error returned by express
//                     return Promise.reject({
//                         code: res.status,
//                         message: res.statusText
//                     });
//                 }
//                 return;
//             })
//             .then(() => console.log('Submitted with values', values))
//             .catch(err => {
//                 const {reason, message, location} = err;
//                 if (reason === 'ValidationError') {
//                     // Convert ValidationErrors into SubmissionErrors for Redux Form
//                     return Promise.reject(
//                         new SubmissionError({
//                             [location]: message
//                         })
//                     );
//                 }
//                 return Promise.reject(
//                     new SubmissionError({
//                         _error: 'Error submitting message'
//                     })
//                 );
//             });
//     }

//     render() {
//         let successMessage;
//         if (this.props.submitSucceeded) {
//             successMessage = (
//                 <div className="message message-success">
//                     Message submitted successfully
//                 </div>
//             );
//         }

//         let errorMessage;
//         if (this.props.error) {
//             errorMessage = (
//                 <div className="message message-error">{this.props.error}</div>
//             );
//         }

//         return (
//             <form
//                 onSubmit={this.props.handleSubmit(values =>
//                     this.onSubmit(values)
//                 )}>
//                 {successMessage}
//                 {errorMessage}
//                 <Field
//                     name="name"
//                     type="text"
//                     component={Input}
//                     label="Name"
//                     validate={[required, nonEmpty]}
//                 />
//                 <Field
//                     name="email"
//                     type="email"
//                     component={Input}
//                     label="Email address"
//                     validate={[required, nonEmpty, email]}
//                 />
//                 <Field
//                     name="message"
//                     element="textarea"
//                     component={Input}
//                     label="Message"
//                     validate={[required, nonEmpty]}
//                 />
//                 <Field
//                     name="magicWord"
//                     type="text"
//                     component={Input}
//                     label="What's the magic word?"
//                     validate={[required, nonEmpty]}
//                 />
//                 <button
//                     type="submit"
//                     disabled={this.props.pristine || this.props.submitting}>
//                     Send message
//                 </button>
//             </form>
//         );
//     }
// }

// export default reduxForm({
//     form: 'contact',
//     onSubmitFail: (errors, dispatch) =>
//         dispatch(focus('contact', Object.keys(errors)[0]))
// })(ContactForm);


// import React from 'react';
// import {reduxForm, Field} from 'redux-form';

// export class ContactForm extends React.Component {
//     onSubmit(values) {
//         console.log(values);
//     }
//     render() {
//         return (
//             <form
//                 onSubmit={this.props.handleSubmit(values =>
//                     this.onSubmit(values)
//                 )}>
//                 <div class="form-input">
//                     <label htmlFor="trackingNumber">Tracking Number</label>
//                     <Field name="trackingNumber" id="trackingNumber" type="text" component="input" />
//                 </div>

//                 <div class="form-input">
//                     <label htmlFor="issue">What is your issue?</label>
//                     <Field name="issue" id="issue" component="select" />
                    
//                 </div>

//                 <div class="form-input">
//                     <label htmlFor="message">Message</label>
//                     <Field name="message" id="message" component="textarea" />
//                 </div>

//                 <label htmlFor="magicWord">What's the magic word?</label>
//                 <Field
//                     name="magicWord"
//                     id="magicWord"
//                     type="text"
//                     component="input"
//                 />
//                 <button type="submit">Send message</button>
//             </form>
//         );
//     }
// }

// export default reduxForm({
//     form: 'contact'
// })(ContactForm);


import React from 'react';
import {reduxForm, Field} from 'redux-form';
import Input from './input';
export class ContactForm extends React.Component {
    onSubmit(values) {
        console.log(values);
    }
    render() {
        return (
            
            <form
                onSubmit={this.props.handleSubmit(values =>
                    this.onSubmit(values)
                )}>
                <div className="form-input">
                <label htmlFor="name">Tracking number</label>
                <Field name="name" id="name" type="text" component="input" />
                </div>
                <div className="form-input">
                <label htmlFor="issue">What is your issue?</label>
                <Field name="issue" id="issue" component="select">
                    <option value="one">My delivery hasn't arrived</option>
                    <option value="two">The wrong item was delivered</option>
                    <option value="three">Part of my order was missing</option>
                    <option value="four">Some of my order arrived damaged</option>
                    <option value="five">Other (give details below)</option>
                </Field>
                </div>
                <div className="form-input">
                <label htmlFor="message">Give more details (optional)</label>
                <Field name="message" id="message" component="textarea" />
                </div>
                <button type="submit">submit</button>
            </form>
        );
    }
}
export default reduxForm({
    form: 'contact'
})(ContactForm);
