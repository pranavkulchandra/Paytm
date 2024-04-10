
export function InputBox({ type, label, placeHolder, onChange}) { 
    return <div>
        <div className="text-sm font-medium text-left py-2"
        >{label}</div>
        <input type={type} placeholder={placeHolder} onChange={onChange} className="px-2 w-full py-1 border rounded border-black"/>
    </div>
}