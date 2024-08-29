type ServiceResponseErrorType = 'DOUBLE_REPORT' | 'MEASURE_NOT_FOUND' | 'INTERNAL_SERVER_ERROR' 

export type ServiceResponseSuccess<T> = {
    success: true;
    data: T;
    };

export type ServiceResponseError = {
    success: false;
    data: {
        error_code: ServiceResponseErrorType;
        error_description: string;
    };
}

export type ServiceResponse<T> = ServiceResponseSuccess<T> | ServiceResponseError;

