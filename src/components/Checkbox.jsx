import { useRef } from "react"

export const Checkbox = ({ children, id }) => {

    const checkboxRef = useRef(null)
    //const checked = localStorage.getItem(id, false)

    const handleChange = () => {
        // If the checkbox is checked, display the output text
        if (checkboxRef.current.checked === true) {
            //localStorage.setItem(id, true);

        } else {
            //localStorage.setItem(id, false);
        }
    }

    return (
        <div className="checkbox align-middle">
            <input
                type="checkbox"
                ref={checkboxRef}
                id={id}
            onChange={handleChange}
            className="mr-4 w-5 h-5 rounded-none"
            />
            <label htmlFor={id} className="align-middle">
                {children}
            </label>
        </div>
    )
}
