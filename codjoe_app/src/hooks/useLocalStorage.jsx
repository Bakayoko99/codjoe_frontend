import { useState } from "react";
import { jwtDecode } from 'jwt-decode'

export const useLocalStorage = (keyName, defaultValue) => {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const value = window.localStorage.getItem(keyName);
            const decodedToken = jwtDecode(value)
            const currentDate = new Date()
            if (value) {
                if (decodedToken.exp * 1000 < currentDate.getTime()) {
                    window.localStorage.clear()
                }

                return JSON.parse(value);
            } else {
                window.localStorage.setItem(keyName, JSON.stringify(defaultValue));
                return defaultValue;
            }
        } catch (err) {
            return defaultValue;
        }
    });
    const setValue = (newValue) => {
        try {
            window.localStorage.setItem(keyName, JSON.stringify(newValue));
        } catch (err) {
            console.log(err);
        }
        setStoredValue(newValue);
    };
    return [storedValue, setValue];
};