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
    onSubmit: (values: T) => void;
};

const Form = <T extends FormValues>({ initialValues, fieldConfig, onSubmit }: FormProps<T>) => {
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
                className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
                Submit
            </button>
        </form>
    );
};

export default Form;
