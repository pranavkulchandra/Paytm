
export function InputBox({ type, label, placeHolder, onChange, onFocus, onBlur }) { 
    return <div>
        <div className="text-sm font-medium text-left py-2"
        >{label}</div>
        <input onBlur={onBlur} onFocus={onFocus} type={type} placeholder={placeHolder} onChange={onChange} className="px-2 w-full py-1 border rounded border-black"/>
    </div>
}