import { ChangeEvent, FormEvent, useState } from 'react';

export type FieldConfig<T> = {
    [key in keyof T]: FieldConfigOptions;
};

type FieldConfigOptions = {
    type: 'input' | 'select' | 'textarea';
    label?: string;
    placeholder?: string;
    required?: boolean;
    inline?: boolean;
    options?: string[];
};

type FormValues = {
    [key: string]: string;
};

type FormProps<T> = {
    initialValues: T;
    fieldConfig: FieldConfig<T>;
    isLoading: boolean;
    onSubmit: (values: T) => void;
};

const Form = <T extends FormValues>({ initialValues, fieldConfig, isLoading, onSubmit }: FormProps<T>) => {
    const [formValues, setFormValues] = useState<T>(initialValues);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormValues((prevFormValues) => ({
            ...prevFormValues,
            [name]: value,
        }));
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(formValues);
        setFormValues(initialValues);
    };

    const renderField = (fieldName: keyof T) => {
        const field = fieldConfig[fieldName];
        const { type, placeholder, options, required = false } = field;

        switch (type) {
            case 'input':
                return (
                    <input
                        required={required}
                        id={fieldName as string}
                        name={fieldName as string}
                        placeholder={placeholder}
                        type='text'
                        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                        value={formValues[fieldName]}
                        onChange={handleChange}
                    />
                );
            case 'select':
                return (
                    <select
                        id={fieldName as string}
                        name={fieldName as string}
                        placeholder={placeholder}
                        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                        value={formValues[fieldName]}
                        onChange={handleChange}>
                        {options?.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                );
            case 'textarea':
                return (
                    <textarea
                        id={fieldName as string}
                        name={fieldName as string}
                        rows={4}
                        placeholder={placeholder}
                        className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                        value={formValues[fieldName]}
                        onChange={handleChange}></textarea>
                );
            default:
                return null;
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {Object.keys(formValues).map((fieldName) => {
                const { label, inline } = fieldConfig[fieldName];
                const inlineClass = `mb-6 ${inline ? 'inline-block w-[49%] [&:nth-child(1)]:mr-[2%]' : 'block w-full'}`;

                return (
                    <div key={fieldName} className={inlineClass}>
                        <label
                            htmlFor={fieldName}
                            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                            {label}
                        </label>
                        {renderField(fieldName as keyof T)}
                    </div>
                );
            })}
            <button
                type='submit'
                disabled={isLoading}
                className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center'>
                {isLoading ? (
                    <>
                        <svg
                            aria-hidden='true'
                            role='status'
                            className='inline w-4 h-4 mr-3 text-white animate-spin'
                            viewBox='0 0 100 101'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'>
                            <path
                                d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                                fill='#E5E7EB'
                            />
                            <path
                                d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                                fill='currentColor'
                            />
                        </svg>
                        Submitting...
                    </>
                ) : (
                    'Submit'
                )}
            </button>
        </form>
    );
};

export default Form;
