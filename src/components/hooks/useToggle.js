import React, {useCallback, useState} from 'react';

const useToggle = (argument) => {
    const [state, setState] = useState(argument);

    const handleToggle = useCallback(() => {
        setState(!state)
    }, [state])

    return [
        state,
        handleToggle,
        setState,
    ]
};

export default useToggle;
