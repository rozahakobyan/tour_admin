
import {useCallback, useState} from 'react';


const useChanges = (initialValues) => {
    const [values, setValues] = useState(initialValues);

    const handleChange = useCallback((key) => (event) => {
        const {value} = event.target;
        setValues((prevValues) => ({
            ...prevValues,
            [key]: value,
        }));
    }, []);

    return {
        values,
        handleChange,
        setValues
    };
};

export default useChanges;
