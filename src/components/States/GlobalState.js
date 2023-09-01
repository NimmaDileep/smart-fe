import React, { createContext, useReducer } from 'react';

const initialState = {
    submissions: []
};

const GlobalContext = createContext(initialState);

const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_SUBMISSIONS':
            return {
                ...state,
                submissions: action.payload
            };
        case 'DELETE_SUBMISSION':
            return {
                ...state,
                submissions: state.submissions.filter(submission => submission.Id !== action.payload)
            };
        case 'UPDATE_SUBMISSION':
            return {
                ...state,
                submissions: state.submissions.map(submission =>
                    submission.Id === action.payload.Id ? action.payload : submission)
            };
        default:
            return state;
    }
};




const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const setSubmissions = (submissions) => {
        dispatch({ type: 'SET_SUBMISSIONS', payload: submissions });
    };

    const deleteSubmission = (submissionId) => {
        dispatch({ type: 'DELETE_SUBMISSION', payload: submissionId });
    };

    const updateSubmission = (updatedSubmission) => {
        dispatch({ type: 'UPDATE_SUBMISSION', payload: updatedSubmission });
    };


    return (
        <GlobalContext.Provider value={{
            submissions: state.submissions,
            setSubmissions,
            deleteSubmission,
            updateSubmission
        }}>
            {children}
        </GlobalContext.Provider>
    );
};

export { GlobalContext, GlobalProvider };
