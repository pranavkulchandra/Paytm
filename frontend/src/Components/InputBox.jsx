
export function InputBox({ label, placeHolder, onChange}) { 
    return <div>
        <div className="text-sm font-medium text-left py-2"
        >{label}</div>
        <input placeholder={placeHolder} onChange={onChange} className="w-full px-2 py-1 border rounded border-black"/>
    </div>
}