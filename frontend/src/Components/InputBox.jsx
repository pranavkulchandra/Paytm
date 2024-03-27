
export function InputBox({ type, label, placeHolder, onChange}) { 
    return <div>
        <div className="text-sm font-medium text-left py-2"
        >{label}</div>
        <input type={type} placeholder={placeHolder} onChange={onChange} className="w-full px-2 py-1 border rounded border-black"/>
    </div>
}