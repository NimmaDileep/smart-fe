import React from 'react';
import './GenericForm.css';
import SignupBtn from "../Buttons/SignupBtn";
import LoginBtn from "../Buttons/LoginBtn";

const GenericForm = ({ title, fields, onSubmit, className }) => {
    return (
        <div className={`form-container ${className ? className : ''}`}>
            <h2>{title}</h2>
            <form onSubmit={onSubmit}>
                {fields.map((field, index) => {
                    switch (field.type) {
                        case 'text':
                        case 'date':
                        case 'password':
                        case 'number':
                        case 'file':
                        case 'color':
                        case 'email':
                        case 'range':
                        case 'hidden':
                        case 'search':
                            return (
                                <div className={`input-group ${field.type}`} key={index}>
                                    <label htmlFor={field.name}>{field.label}:</label>
                                    <input type={field.type} id={field.name} name={field.name} required={field.required} placeholder={field.placeholder} />
                                </div>
                            );
                        case 'textarea':
                            return (
                                <div className="input-group textarea" key={index}>
                                    <label htmlFor={field.name}>{field.label}:</label>
                                    <textarea id={field.name} name={field.name} required={field.required} placeholder={field.placeholder}></textarea>
                                </div>
                            );
                        case 'select':
                            return (
                                <div className="input-group select" key={index}>
                                    <label htmlFor={field.name}>{field.label}:</label>
                                    <select id={field.name} name={field.name} required={field.required}>
                                        {field.options.map(option => (
                                            <option key={option.value} value={option.value}>{option.label}</option>
                                        ))}
                                    </select>
                                </div>
                            );
                        case 'checkbox':
                            return (
                                <div className="input-group checkbox" key={index}>
                                    <label htmlFor={field.name}>
                                        <input type="checkbox" id={field.name} name={field.name} checked={field.checked} />
                                        {field.label}
                                    </label>
                                </div>
                            );
                        case 'radio':
                            return (
                                <div className="input-group radio" key={index}>
                                    <span>{field.label}:</span>
                                    {field.options.map(option => (
                                        <label key={option.value}>
                                            <input type="radio" name={field.name} value={option.value} required={field.required} />
                                            {option.label}
                                        </label>
                                    ))}
                                </div>
                            );
                        default:
                            return null;
                    }
                })}
                { title && title == "SIGN UP" ? (<div className="button-container">
                    <SignupBtn></SignupBtn>
                </div>) : <div className="button-container">
                    <LoginBtn></LoginBtn>
                </div>}
            </form>
        </div>
    );
}

export default GenericForm;
