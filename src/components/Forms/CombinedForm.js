// import React from 'react';
// import './CombinedForm.css';
// import SignupBtn from "../Buttons/SignupBtn";
//
// const CombinedForm = ({ title, fields, onSubmit, className }) => {
//     return (
//         <div className={`combined-form-container ${className ? className : ''}`}>
//             <h2>{title}</h2>
//             <form onSubmit={onSubmit}>
//                 {fields.map((field, index) => {
//                     // if (index > 0 && !fields[index - 1].fullWidth) {
//                     //     return null; // Skip rendering for this iteration
//                     // }
//                         const renderInputGroup = () => {
//                         switch (field.type) {
//                             case 'text':
//                             case 'date':
//                             case 'password':
//                             case 'number':
//                             case 'file':
//                             case 'color':
//                             case 'email':
//                             case 'range':
//                             case 'hidden':
//                             case 'search':
//                                 return (
//                                     <div className={`input-group ${field.type}`} key={index}>
//                                         <label htmlFor={field.name}>{field.label}:</label>
//                                         <input type={field.type} id={field.name} name={field.name} required={field.required} placeholder={field.placeholder} />
//                                     </div>
//                                 );
//                             case 'textarea':
//                                 return (
//                                     <div className="input-group textarea" key={index}>
//                                         <label htmlFor={field.name}>{field.label}:</label>
//                                         <textarea id={field.name} name={field.name} required={field.required} placeholder={field.placeholder}></textarea>
//                                     </div>
//                                 );
//                             case 'select':
//                                 return (
//                                     <div className="input-group select" key={index}>
//                                         <label htmlFor={field.name}>{field.label}:</label>
//                                         <select id={field.name} name={field.name} required={field.required}>
//                                             {field.options.map(option => (
//                                                 <option key={option.value} value={option.value}>{option.label}</option>
//                                             ))}
//                                         </select>
//                                     </div>
//                                 );
//                             case 'checkbox':
//                                 return (
//                                     <div className="input-group checkbox" key={index}>
//                                         <label htmlFor={field.name}>
//                                             <input type="checkbox" id={field.name} name={field.name} checked={field.checked} />
//                                             {field.label}
//                                         </label>
//                                     </div>
//                                 );
//                             case 'radio':
//                                 return (
//                                     <div className="input-group radio" key={index}>
//                                         <span>{field.label}:</span>
//                                         {field.options.map(option => (
//                                             <label key={option.value}>
//                                                 <input type="radio" name={field.name} value={option.value} required={field.required} />
//                                                 {option.label}
//                                             </label>
//                                         ))}
//                                     </div>
//                                 );
//                             default:
//                                 return null;
//                         }
//                     };
//
//                     if (field.fullWidth) {
//                         return (
//                             <div className="input-group full-width" key={index}>
//                                 {renderInputGroup(field)}
//                             </div>
//                         );
//                     } else {
//                         return (
//                             <div className="row-container" key={index}>
//                                 <div className="input-group">
//                                     {renderInputGroup(field)}
//                                 </div>
//                                 {fields[index + 1] && !fields[index + 1].fullWidth && (
//                                     <div className="input-group">
//                                         {renderInputGroup(fields[index + 1])}
//                                     </div>
//                                 )}
//                             </div>
//                         );
//                     }
//                 })}
//
//                 <div className="button-container">
//                     <SignupBtn></SignupBtn>
//                 </div>
//             </form>
//         </div>
//     );
// }
//
// export default CombinedForm;
//
//

import React from 'react';
import './CombinedForm.css';
import SignupBtn from "../Buttons/SignupBtn";

const CombinedForm = ({ title, fields, onSubmit, className }) => {
    const renderInputGroup = (fieldItem, idx) => {
        switch (fieldItem.type) {
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
                    <div className={`input-group ${fieldItem.type}`} key={idx}>
                        <label htmlFor={fieldItem.name}>{fieldItem.label}:</label>
                        <input
                            type={fieldItem.type}
                            id={fieldItem.name}
                            name={fieldItem.name}
                            required={fieldItem.required}
                            placeholder={fieldItem.placeholder}
                        />
                    </div>
                );
            case 'textarea':
                return (
                    <div className="input-group textarea" key={idx}>
                        <label htmlFor={fieldItem.name}>{fieldItem.label}:</label>
                        <textarea
                            id={fieldItem.name}
                            name={fieldItem.name}
                            required={fieldItem.required}
                            placeholder={fieldItem.placeholder}>
                        </textarea>
                    </div>
                );
            case 'select':
                return (
                    <div className="input-group select" key={idx}>
                        <label htmlFor={fieldItem.name}>{fieldItem.label}:</label>
                        <select id={fieldItem.name} name={fieldItem.name} required={fieldItem.required}>
                            {fieldItem.options.map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                );
            case 'checkbox':
                return (
                    <div className="input-group checkbox" key={idx}>
                        <label htmlFor={fieldItem.name}>
                            <input type="checkbox" id={fieldItem.name} name={fieldItem.name} checked={fieldItem.checked} />
                            {fieldItem.label}
                        </label>
                    </div>
                );
            case 'radio':
                return (
                    <div className="input-group radio" key={idx}>
                        <span>{fieldItem.label}:</span>
                        {fieldItem.options.map(option => (
                            <label key={option.value}>
                                <input type="radio" name={fieldItem.name} value={option.value} required={fieldItem.required} />
                                {option.label}
                            </label>
                        ))}
                    </div>
                );
            default:
                return null;
        }
    };

    const renderedFields = [];

    for (let i = 0; i < fields.length; i++) {
        if (fields[i].fullWidth) {
            renderedFields.push(
                <div className="input-group full-width" key={i}>
                    {renderInputGroup(fields[i], i)}
                </div>
            );
        } else {
            const firstInput = renderInputGroup(fields[i], i);
            let secondInput = null;

            if (fields[i + 1] && !fields[i + 1].fullWidth) {
                secondInput = renderInputGroup(fields[i + 1], i + 1);
                i++;  // Increment to skip the next field since it's already rendered.
            }

            renderedFields.push(
                <div className="row-container" key={i}>
                    <div className="input-group">{firstInput}</div>
                    {secondInput && <div className="input-group">{secondInput}</div>}
                </div>
            );
        }
    }

    return (
        <div className={`combined-form-container ${className ? className : ''}`}>
            <h2>{title}</h2>
            <form onSubmit={onSubmit}>
                {renderedFields}
                <div className="button-container">
                    <SignupBtn></SignupBtn>
                </div>
            </form>
        </div>
    );
}

export default CombinedForm;
