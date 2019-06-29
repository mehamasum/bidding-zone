export const getApiCallError = error => {
    console.log('getApiCallError', error);
    if (!error.data) return 'Unknown error occured';
    if (error.status > 400) return error.data.detail;
    if (error.status === 400 && error.data.non_field_errors)
        return error.data.non_field_errors[0];
    return null;
};

export const getFieldValidationErrors = error => {
    console.log('getFieldValidationErrors', error);
    if (error.data && !getApiCallError(error)) {
        return error.data;
    }
    return {};
};
